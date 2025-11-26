"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Image
            src="/logo.png"
            alt="KlickJet Logo"
            width={140}
            height={45}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="flex items-center gap-6">
          <Link 
            href="/auth/seller/register" 
            className="text-sm font-medium text-gray-700 hover:text-600 transition-colors"
          >
            Become a Seller
          </Link>
          <Link 
            href="/auth/deliverer/register" 
            className="text-sm font-medium text-gray-700 hover:text-600 transition-colors"
          >
            Join as Deliverer
          </Link>
          <div className="flex items-center gap-3 ml-2">
            <Button variant="outline" asChild className="shadow-sm hover:shadow-md transition-shadow">
              <Link href="/auth/register">Signup</Link>
            </Button>
            <Button asChild className="shadow-sm hover:shadow-md transition-shadow">
              <Link href="/auth/login">Signin</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
