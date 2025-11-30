"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

// Mock data for products (same as in products page)
const products = [
  {
    id: 1,
    title: "Milo",
    description: "Energy drink",
    price: 150.00,
    seller: "Sujee grocery",
    category: "beverages",
  },
  {
    id: 2,
    title: "Clear shampoo",
    description: "A gentle shampoo that cleans and nourishes your hair for a soft, fresh feel",
    price: 450.00,
    seller: "Sujee grocery",
    category: "personal-care",
  },
  {
    id: 3,
    title: "Soap",
    description: "A refreshing soap that gently cleans your skin and leaves it soft and smooth",
    price: 160.00,
    seller: "Sujee grocery",
    category: "personal-care",
  },
  {
    id: 4,
    title: "Soda",
    description: "Drink",
    price: 450.00,
    seller: "Sujee grocery",
    category: "beverages",
  },
  {
    id:5,
    title: "Milk",
    description: "Drink",
    price: 150.00,
    seller: "Sujee grocery",
    category: "beverages",
  },
  {
    id:6,
    title: "Apple Juice",
    description: "Fresh Drink",
    price: 120.00,
    seller: "Sujee grocery",
    category: "beverages",
  },
  {
    id: 7,
    title: "Rice 5kg",
    description: "White raw rice",
    price: 450.00,
    seller: "Sujee grocery",
    category: "groceries",
  },
  {
    id: 8,
    title: "Sugar 1kg",
    description: "Refined sugar",
    price: 120.00,
    seller: "Sujee grocery",
    category: "groceries",
  },
  {
    id: 9,
    title: "Sunflower Oil 1L",
    description: "Cooking oil",
    price: 190.00,
    seller: "Sujee grocery",
    category: "groceries",
  },
  {
    id: 10,
    title: "Salt 1kg",
    description: "Iodized salt",
    price: 25.00,
    seller: "Sujee grocery",
    category: "groceries",
  },
  {
    id: 11,
    title: "Tea Powder 250g",
    description: "Premium tea blend",
    price: 150.00,
    seller: "Sujee grocery",
    category: "beverages",
  },
  {
    id: 12,
    title: "Bread",
    description: "Fresh bakery bread",
    price: 50.00,
    seller: "Sujee grocery",
    category: "groceries",
  },
  {
    id: 13,
    title: "Eggs (6 pcs)",
    description: "Farm eggs",
    price: 60.00,
    seller: "Sujee grocery",
    category: "groceries",
  }
];

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const productId = parseInt(params.id as string);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-gray-500 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <Link href="/products">
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/products">
          <Button variant="ghost" className="mb-6 -ml-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square relative bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <Package className="h-32 w-32 text-gray-400" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full capitalize">
                {product.category.replace("-", " ")}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {product.title}
            </h1>
            
            <p className="text-gray-600 mb-6 text-lg">
              {product.description}
            </p>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Sold by</p>
              <p className="text-lg font-semibold">{product.seller}</p>
            </div>

            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-2">Price</p>
              <p className="text-4xl font-bold text-gray-900">
                Rs. {product.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  className="h-10 w-10"
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-10 w-10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white hover:bg-gray-800 h-12 text-lg font-semibold"
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <span className="mr-2">✓</span> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              
              <p className="text-sm text-gray-500 text-center">
                Total: Rs. {(product.price * quantity).toFixed(2)}
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Product ID:</span>
                  <span className="font-medium">#{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium capitalize">
                    {product.category.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <span className="font-medium text-green-600">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
