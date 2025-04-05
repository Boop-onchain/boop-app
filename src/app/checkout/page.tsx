"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, StarHalf } from "lucide-react";

interface ProductDetails {
  name: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  reviewCount: number;
}

// This would typically come from your data source
const product: ProductDetails = {
  name: "Premium Headphones",
  description:
    "High-quality wireless headphones with noise cancellation. Features include 40-hour battery life, premium sound quality, and comfortable ear cushions.",
  price: 299.99,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    "https://images.pexels.com/photos/1476055/pexels-photo-1476055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  ],
  rating: 4.5,
  reviewCount: 2547,
};

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    } else {
      stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
    }
  }

  return <div className="flex gap-0.5">{stars}</div>;
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] ">
      <div className="">
        <Card className="bg-[#000000] border border-[#2f3336]">
          <CardContent className="space-y-6">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-[#212121] border-[#1a1a1a] text-gray-400 hover:text-white" />
              <CarouselNext className="bg-[#212121] border-[#1a1a1a] text-gray-400 " />
            </Carousel>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                {product.name}
              </h2>

              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} />
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                  {product.reviewCount.toLocaleString()} ratings
                </span>
              </div>

              <div className="border-t border-[#2f3336] pt-4">
                <p className="text-gray-400">{product.description}</p>
              </div>

              <div className="rounded-lg p-4 border border-[#2f3336]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-400">Price:</span>
                    <span className="text-2xl text-white font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-semibold"
                    size="lg"
                    onClick={() => {
                      console.log("Processing checkout...");
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="text-center grid place-content-center text-gray-100 text-sm">
            Powered by ⚡ Boop
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
