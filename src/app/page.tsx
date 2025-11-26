"use client";

import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for products
const products = [
  {
    id: 1,
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse",
    price: 9000.00,
    seller: "Tech Store",
  },
  {
    id: 2,
    title: "Smartphone",
    description: "Latest smartphone with advanced features",
    price: 210000.00,
    seller: "Tech Store",
  },
  {
    id: 3,
    title: "Laptop",
    description: "High-performance laptop for work and gaming",
    price: 300000.00,
    seller: "Tech Store",
  },
  {
    id: 4,
    title: "T-Shirt",
    description: "Cotton t-shirt, comfortable and stylish",
    price: 6000.00,
    seller: "Fashion Boutique",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Online Store</h1>
          <p className="text-gray-500">Discover amazing products from trusted sellers</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 w-full"
            />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="home">Home & Living</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              seller={product.seller}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
