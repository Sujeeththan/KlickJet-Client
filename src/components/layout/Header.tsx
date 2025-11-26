"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Online Store
        </Link>

        <nav className="flex items-center gap-4">
          <Link 
            href="/auth/seller/register" 
            className="text-sm font-medium hover:underline"
          >
            Become a Seller
          </Link>
          <Link 
            href="/auth/deliverer/register" 
            className="text-sm font-medium hover:underline"
          >
            Join as Deliverer
          </Link>
          <div className="flex items-center gap-2 ml-4">
            <Button variant="outline" asChild>
              <Link href="/auth/register">Signup</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/login">Signin</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
