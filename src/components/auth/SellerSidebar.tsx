"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function SellerSidebar() {
  const { logout, user } = useAuth();

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold">Online Store</h1>
      </div>
      
      <div className="flex-1">
        {/* Empty for now as per design, or add relevant links if needed */}
      </div>

      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="mb-4 px-2">
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        )}
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
