"use client";

import { CheckoutModal } from "@/components/sports-gallery/CheckoutModal";
import { ImageDetailModal } from "@/components/sports-gallery/ImageDetailModal";
import { Navigation } from "@/components/sports-gallery/Navigation";
import Image from "next/image";
import { useState } from "react";

interface SportImage {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const sportsImages: SportImage[] = [
  {
    id: "1",
    title: "Basketball Slam Dunk",
    description: "High-flying action shot of a player performing a slam dunk",
    price: 29.99,
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000",
    category: "Basketball",
  },
  {
    id: "2",
    title: "Soccer Goal Celebration",
    description: "Player celebrating after scoring a goal",
    price: 24.99,
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000",
    category: "Soccer",
  },
  {
    id: "3",
    title: "Tennis Serve",
    description: "Professional tennis player serving the ball",
    price: 19.99,
    imageUrl:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000",
    category: "Tennis",
  },
  {
    id: "4",
    title: "Football Tackle",
    description: "Defensive player making a tackle",
    price: 34.99,
    imageUrl:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000",
    category: "Football",
  },
  {
    id: "5",
    title: "Baseball Pitch",
    description: "Pitcher throwing a fastball",
    price: 27.99,
    imageUrl:
      "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000",
    category: "Baseball",
  },
  {
    id: "6",
    title: "Swimming Race",
    description: "Swimmer competing in a freestyle race",
    price: 22.99,
    imageUrl:
      "https://images.unsplash.com/photo-1576495199011-ebf36b9d3c30?q=80&w=1000",
    category: "Swimming",
  },
];

export default function SportsGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<SportImage[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<SportImage | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  const categories = [
    "All",
    ...new Set(sportsImages.map((img) => img.category)),
  ];

  const filteredImages =
    selectedCategory === "All"
      ? sportsImages
      : sportsImages.filter((img) => img.category === selectedCategory);

  const addToCart = (image: SportImage) => {
    setCart([...cart, image]);
    setIsCartOpen(true);
    setSelectedImage(null);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false);
    setCart([]);
    setOrderComplete(true);

    setTimeout(() => {
      setOrderComplete(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
      <div className="max-w-7xl mx-auto">
        <Navigation />

        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sports Image Gallery</h1>
          <p className="text-gray-400">
            Purchase high-quality sports photography
          </p>
        </header>

        {orderComplete && (
          <div className="bg-green-800 text-white p-4 rounded-lg mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Your order has been successfully placed! Thank you for your
                purchase.
              </span>
            </div>
            <button
              onClick={() => setOrderComplete(false)}
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                >
                  <div
                    className="relative h-64 w-full cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">
                      {image.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {image.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">
                        ${image.price.toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(image);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`w-full md:w-1/4 ${
              isCartOpen ? "block" : "hidden md:block"
            }`}
          >
            <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="md:hidden text-gray-400 hover:text-white"
                >
                  {isCartOpen ? "Close" : "Open"}
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-400">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-400">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }}
                          className="text-red-500 hover:text-red-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Total:</span>
                      <span className="font-bold">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImageDetailModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onAddToCart={addToCart}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          totalPrice={totalPrice}
          onClose={() => setIsCheckoutOpen(false)}
          onCheckoutComplete={handleCheckoutComplete}
        />
      )}
    </div>
  );
}
