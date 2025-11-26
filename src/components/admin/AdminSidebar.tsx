"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Truck, 
  Layers, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Store, label: "Sellers", href: "/admin/sellers" },
  { icon: Truck, label: "Deliverers", href: "/admin/deliverers" },
  { icon: Layers, label: "Categories", href: "/admin/categories" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold">Online Store</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="mb-4 px-2">
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
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
