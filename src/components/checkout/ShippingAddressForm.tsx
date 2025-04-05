"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

const shippingFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

type ShippingFormValues = z.infer<typeof shippingFormSchema>;

interface ShippingAddressFormProps {
  onSubmit: (data: ShippingFormValues) => void;
}

export function ShippingAddressForm({ onSubmit }: ShippingAddressFormProps) {
  const [orderNow, setOrderNow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      fullName: "Alex Chen",
      email: "alex.chen@example.com",
      address: "456 Market Street, Suite 789",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
    },
  });

  const handleSubmit = (data: ShippingFormValues) => {
    onSubmit(data);
    setIsSubmitted(true);
  };

  if (!orderNow) {
    return (
      <Button
        onClick={() => setOrderNow(true)}
        className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-semibold"
      >
        Purchase
      </Button>
    );
  }

  return (
    <Card className="bg-[#000000] border-[#2f3336]">
      <CardContent className="pt-2">
        <h3 className="text-gray-300 text-lg font-semibold mb-4">
          Shipping Address
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="bg-[#212121] border-[#2f3336] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                      className="bg-[#212121] border-[#2f3336] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    Street Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St"
                      {...field}
                      className="bg-[#212121] border-[#2f3336] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New York"
                        {...field}
                        className="bg-[#212121] border-[#2f3336] text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">State</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="NY"
                        {...field}
                        className="bg-[#212121] border-[#2f3336] text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">ZIP Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="10001"
                        {...field}
                        className="bg-[#212121] border-[#2f3336] text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="United States"
                        {...field}
                        className="bg-[#212121] border-[#2f3336] text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-semibold"
            >
              Continue to payment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
