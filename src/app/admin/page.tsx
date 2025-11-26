"use client";

import { DashboardCard } from "@/components/admin/DashboardCard";
import { ShoppingCart, CheckCircle, DollarSign, Store } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Boutique', sales: 24000 },
];

const pieData = [
  { name: 'Boutique', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          System overview and analytics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Orders"
          value="4"
          icon={ShoppingCart}
        />
        <DashboardCard
          title="Completed"
          value="1"
          icon={CheckCircle}
        />
        <DashboardCard
          title="Total Sales"
          value="Rs. 24000.00"
          icon={DollarSign}
        />
        <DashboardCard
          title="Sellers"
          value="1"
          icon={Store}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col gap-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight">Sales by Seller</h3>
          </div>
          <div className="p-6 pt-0 pl-2">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col gap-y-1.5">
            <h3 className="font-semibold leading-none tracking-tight">Sales Distribution</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
