"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Seller {
  _id: string;
  user_id: string;
  shopName: string;
  email: string;
  phone_no: string;
  address: string;
  approval_status: string;
}

interface Deliverer {
  _id: string;
  user_id: string;
  name: string;
  email: string;
  phone_no: string;
  vehicle_type?: string;
  vehicle_no?: string;
  approval_status: string;
}

export default function UsersPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<"sellers" | "deliverers">("sellers");
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [deliverers, setDeliverers] = useState<Deliverer[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, activeTab]);

  const fetchData = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      if (activeTab === "sellers") {
        const response = await adminApi.getAllSellers(token);
        setSellers(response.sellers || []);
      } else {
        const response = await adminApi.getAllDeliverers(token);
        setDeliverers(response.deliverers || []);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, type: "seller" | "deliverer") => {
    if (!token) return;
    
    setActionLoading(id);
    try {
      if (type === "seller") {
        await adminApi.approveSeller(token, id);
        toast.success("Seller approved successfully");
      } else {
        await adminApi.approveDeliverer(token, id);
        toast.success("Deliverer approved successfully");
      }
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to approve");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string, type: "seller" | "deliverer") => {
    if (!token) return;
    
    setActionLoading(id);
    try {
      if (type === "seller") {
        await adminApi.rejectSeller(token, id);
        toast.success("Seller rejected successfully");
      } else {
        await adminApi.rejectDeliverer(token, id);
        toast.success("Deliverer rejected successfully");
      }
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to reject");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId: string, type: "seller" | "deliverer") => {
    if (!token) return;
    
    if (!confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }
    
    setActionLoading(userId);
    try {
      await adminApi.deleteUser(token, userId);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
          <p className="text-muted-foreground">
            Manage sellers and deliverers
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("sellers")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "sellers"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sellers
        </button>
        <button
          onClick={() => setActiveTab("deliverers")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "deliverers"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Deliverers
        </button>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === "sellers" ? "Sellers" : "Deliverers"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {activeTab === "sellers" ? (
                      <>
                        <TableHead>Shop Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Vehicle Type</TableHead>
                        <TableHead>Vehicle No</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeTab === "sellers" ? (
                    sellers.length > 0 ? (
                      sellers.map((seller) => (
                        <TableRow key={seller._id}>
                          <TableCell className="font-medium">{seller.shopName}</TableCell>
                          <TableCell>{seller.email}</TableCell>
                          <TableCell>{seller.phone_no}</TableCell>
                          <TableCell>{seller.address}</TableCell>
                          <TableCell>{getStatusBadge(seller.approval_status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {seller.approval_status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleApprove(seller._id, "seller")}
                                    disabled={actionLoading === seller._id}
                                  >
                                    {actionLoading === seller._id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleReject(seller._id, "seller")}
                                    disabled={actionLoading === seller._id}
                                  >
                                    {actionLoading === seller._id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(seller.user_id, "seller")}
                                disabled={actionLoading === seller.user_id}
                              >
                                {actionLoading === seller.user_id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No sellers found
                        </TableCell>
                      </TableRow>
                    )
                  ) : (
                    deliverers.length > 0 ? (
                      deliverers.map((deliverer) => (
                        <TableRow key={deliverer._id}>
                          <TableCell className="font-medium">{deliverer.name}</TableCell>
                          <TableCell>{deliverer.email}</TableCell>
                          <TableCell>{deliverer.phone_no}</TableCell>
                          <TableCell>{deliverer.vehicle_type || "N/A"}</TableCell>
                          <TableCell>{deliverer.vehicle_no || "N/A"}</TableCell>
                          <TableCell>{getStatusBadge(deliverer.approval_status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {deliverer.approval_status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleApprove(deliverer._id, "deliverer")}
                                    disabled={actionLoading === deliverer._id}
                                  >
                                    {actionLoading === deliverer._id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleReject(deliverer._id, "deliverer")}
                                    disabled={actionLoading === deliverer._id}
                                  >
                                    {actionLoading === deliverer._id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(deliverer.user_id, "deliverer")}
                                disabled={actionLoading === deliverer.user_id}
                              >
                                {actionLoading === deliverer.user_id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No deliverers found
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
