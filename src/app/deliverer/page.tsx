"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["deliverer"]}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Deliverer Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {user?.name}!</p>
            </div>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-base">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-base">{user?.phone_no || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vehicle Type</p>
                  <p className="text-base">{user?.vehicle_type || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vehicle Number</p>
                  <p className="text-base">{user?.vehicle_no || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="text-base capitalize">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user?.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      user?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {user?.status}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Deliveries</CardTitle>
                <CardDescription>Active and completed deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No deliveries assigned yet</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  View Pending Deliveries
                </Button>
                <Button className="w-full" variant="outline">
                  Delivery History
                </Button>
                <Button className="w-full" variant="outline">
                  Update Availability
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}