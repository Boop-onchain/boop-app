"use client";

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

interface ImageDetailModalProps {
  image: SportImage;
  onClose: () => void;
  onAddToCart: (image: SportImage) => void;
}

export function ImageDetailModal({
  image,
  onClose,
  onAddToCart,
}: ImageDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("standard");

  const sizes = [
    { id: "standard", name: "Standard (1920x1080)", priceMultiplier: 1 },
    { id: "large", name: "Large (3840x2160)", priceMultiplier: 1.5 },
    { id: "premium", name: "Premium (Original)", priceMultiplier: 2 },
  ];

  const basePrice = image.price;
  const totalPrice =
    basePrice *
    quantity *
    sizes.find((s) => s.id === selectedSize)!.priceMultiplier;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <Image
              src={image.imageUrl}
              alt={image.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{image.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-gray-300 mb-6">{image.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="space-y-2">
                {sizes.map((size) => (
                  <div
                    key={size.id}
                    className={`p-3 border rounded-md cursor-pointer ${
                      selectedSize === size.id
                        ? "border-blue-500 bg-blue-900 bg-opacity-20"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedSize(size.id)}
                  >
                    <div className="flex justify-between">
                      <span>{size.name}</span>
                      <span>
                        ${(basePrice * size.priceMultiplier).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-700 text-white w-10 h-10 rounded-l-md flex items-center justify-center"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="bg-gray-700 text-white w-16 h-10 text-center border-y border-gray-600"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-700 text-white w-10 h-10 rounded-r-md flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between mb-4">
                <span className="text-lg">Total:</span>
                <span className="text-xl font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onAddToCart(image)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md"
                >
                  Add to Cart
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
