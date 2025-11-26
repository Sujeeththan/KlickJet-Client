import { SellerSidebar } from "@/components/auth/SellerSidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar />
      <main className="flex-1 overflow-y-auto flex items-center justify-center p-8">
        {children}
      </main>
    </div>
  );
}
