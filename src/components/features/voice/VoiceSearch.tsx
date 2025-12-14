"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Search, ShoppingCart, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// --- Types ---

export interface VoiceCommand {
  action: "add" | "search" | "unknown";
  productName: string;
  quantity: number;
  unit: string;
  originalText: string;
  language: string;
}

interface VoiceSearchProps {
  onCommand: (command: VoiceCommand) => void;
  className?: string;
}

// --- Web Speech API Type Definition (Basic) ---
// Extending Window explicitly to avoid TS errors
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// --- Language Configurations ---
const LANGUAGES = [
  { code: "en-US", name: "English (US)", label: "English" },
  { code: "ta-IN", name: "Tamil (India)", label: "தமிழ்" },
  { code: "si-LK", name: "Sinhala (Sri Lanka)", label: "සිංහල" },
];

export function VoiceSearch({ onCommand, className }: VoiceSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "success" | "error">("idle");
  
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = selectedLanguage;

        recognition.onstart = () => {
          setIsListening(true);
          setStatus("listening");
          setTranscript("");
        };

        recognition.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
           
          // If we have a final result, process it
          if (finalTranscript) {
            setTranscript(finalTranscript);
            handleCommandProcessing(finalTranscript);
          } else {
            setTranscript(interimTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setStatus("error");
          setIsListening(false);
          if (event.error === 'not-allowed') {
            toast.error("Microphone access denied. Please allow microphone access.");
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          // If status is still listening, it means it stopped naturally without a command?
          // We'll leave it as is or reset if valid.
          if (status === "listening") {
             setStatus("idle");
          }
        };

        recognitionRef.current = recognition;
      } else {
        console.error("Web Speech API is not supported in this browser.");
      }
    }
  }, [selectedLanguage]);

  // Update language when selected
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLanguage;
    }
  }, [selectedLanguage]);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Error starting recognition:", e);
        // Sometimes it throws if already started
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 100);
      }
    } else {
      toast.error("Voice search is not supported in this browser.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleCommandProcessing = (text: string) => {
    setStatus("processing");
    const LowerText = text.toLowerCase();
    
    // Default values
    let action: VoiceCommand["action"] = "search"; // Default to search
    let quantity = 1;
    let unit = "pcs";
    let productName = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim(); // Clean punctuation

    // --- Parsing Logic based on Language ---
    
    // English Parsing
    if (selectedLanguage.startsWith("en")) {
      // Regex for "Add [qty] [unit] [product]"
      // Examples: "Add 2 kg rice", "Add 5 packets of milk", "Add apples"
      const addMatch = LowerText.match(/^(?:add|buy|get|want)\s+(?:(\d+)\s*(kg|g|gm|pcs|pc|pack|packets?|box|boxes?|liters?|ml)?\s+(?:of\s+)?)?(.+)/i);
      
      if (addMatch) {
         action = "add";
         // group 1: quantity (optional)
         if (addMatch[1]) quantity = parseInt(addMatch[1]);
         // group 2: unit (optional)
         if (addMatch[2]) unit = normalizeUnit(addMatch[2]);
         // group 3: product name
         if (addMatch[3]) productName = addMatch[3].trim();
      } else if (LowerText.startsWith("search")) {
        action = "search";
        productName = LowerText.replace(/^search\s+for\s+|search\s+/, "").trim();
      }
    }
    
    // Tamil Parsing (Basic Heuristics)
    // "Thakkali 2 kilo add" or "Add 2 kilo Thakkali"
    else if (selectedLanguage.startsWith("ta")) {
        // Looking for "add" equivalents or English mix
        // Keywords: 'serkavum' (add), 'vendum' (want)
        
        // Simple heuristic: extract numbers as quantity
        const numbers = text.match(/\d+/);
        if (numbers) {
            quantity = parseInt(numbers[0]);
            action = "add"; // If number is present, assume intent to add specific qty
        }
        
        // Check for units
        if (text.includes("kg") || text.includes("kilo")) unit = "kg";
        else if (text.includes("g") || text.includes("gram")) unit = "g";
        else if (text.includes("packet") || text.includes("pkt")) unit = "pack";

        // Remove numbers and keywords to get product name
        // This is rough but effective for demo
        productName = text
          .replace(/\d+/g, "")
          .replace(/(add|kilo|kg|gram|gm|packet|pkt|serkavum|vendum)/gi, "")
          .trim();
          
        if (text.toLowerCase().includes("add") || text.toLowerCase().includes("serka")) {
            action = "add";
        }
    }

    // Sinhala Parsing (Basic Heuristics)
    else if (selectedLanguage.startsWith("si")) {
        // Similar strategy
         const numbers = text.match(/\d+/);
        if (numbers) {
            quantity = parseInt(numbers[0]);
             action = "add";
        }
        
        if (text.includes("kilo") || text.includes("kg")) unit = "kg";
        else if (text.includes("g") || text.includes("gram")) unit = "g";
        
        productName = text
          .replace(/\d+/g, "")
          .replace(/(add|kilo|kg|gram|gm|packet|oni|danna)/gi, "")
          .trim();
          
        if (text.toLowerCase().includes("add") || text.toLowerCase().includes("danna")) {
            action = "add";
        }
    }

    const command: VoiceCommand = {
      action,
      productName,
      quantity,
      unit,
      originalText: text,
      language: selectedLanguage
    };

    console.log("Parsed Command:", command);
    
    // Small delay to show processing state
    setTimeout(() => {
      setStatus("success");
      onCommand(command);
      
      // Auto close after success?
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 1500);
    }, 500);
  };

  const normalizeUnit = (u: string): string => {
    u = u.toLowerCase();
    if (u === "gm" || u === "grams") return "g";
    if (u === "kilo" || u === "kilos" || u === "kgs") return "kg";
    if (u === "packet" || u === "packets" || u === "pkg") return "pack";
    if (u === "pc" || u === "piece" || u === "pieces") return "pcs";
    return u; // default
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("rounded-full h-10 w-10 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all shadow-sm", className)}
          title="Voice Search"
        >
          <Mic className="h-5 w-5 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Voice Assistant
          </DialogTitle>
          <DialogDescription>
            Speak to search or add items (e.g., "Add 2 kg rice")
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          
          {/* Language Selector */}
          <div className="w-full px-4">
             <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.label} ({lang.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Main Microphone Interaction Area */}
          <div className="relative">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="lg"
              className={cn(
                "h-20 w-20 rounded-full transition-all duration-300 shadow-lg",
                isListening ? "animate-pulse ring-4 ring-red-200" : "hover:scale-105"
              )}
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
            {isListening && (
              <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-sm font-medium text-red-500 animate-bounce">
                Listening...
              </span>
            )}
          </div>

          {/* Transcript Display */}
          <div className="w-full space-y-2 text-center min-h-[60px]">
            {transcript ? (
               <p className="text-lg font-medium text-gray-800 leading-relaxed">
                 "{transcript}"
               </p>
            ) : (
              <p className="text-gray-400 italic">
                {isListening ? "Say something..." : "Tap the mic to start"}
              </p>
            )}
            
            {status === "processing" && (
                <div className="flex items-center justify-center gap-2 text-sm text-blue-600 mt-2">
                    <Loader2 className="h-3 w-3 animate-spin" /> Processing...
                </div>
            )}
            
            {status === "success" && (
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 mt-2 font-medium">
                    Success!
                </div>
            )}
             {status === "error" && (
                <div className="flex items-center justify-center gap-2 text-sm text-red-600 mt-2 font-medium">
                    Try again
                </div>
            )}
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
             <div className="text-xs text-gray-400 w-full text-center">
                Try saying: "Add 500g sugar" or "Search for Biscuits"
             </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
