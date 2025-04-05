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

interface CheckoutModalProps {
  cart: SportImage[];
  totalPrice: number;
  onClose: () => void;
  onCheckoutComplete: () => void;
}

export function CheckoutModal({
  cart,
  totalPrice,
  onClose,
  onCheckoutComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">(
    "shipping"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
  };

  const handleConfirmOrder = () => {
    // In a real app, this would process the payment and send the order
    onCheckoutComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Checkout</h2>
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

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            <div
              className={`flex flex-col items-center ${
                step === "shipping"
                  ? "text-blue-500"
                  : step === "payment" || step === "confirmation"
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step === "shipping"
                    ? "bg-blue-500"
                    : step === "payment" || step === "confirmation"
                    ? "bg-green-500"
                    : "bg-gray-700"
                }`}
              >
                {step === "payment" || step === "confirmation" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span>1</span>
                )}
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            <div
              className={`flex flex-col items-center ${
                step === "payment"
                  ? "text-blue-500"
                  : step === "confirmation"
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step === "payment"
                    ? "bg-blue-500"
                    : step === "confirmation"
                    ? "bg-green-500"
                    : "bg-gray-700"
                }`}
              >
                {step === "confirmation" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span>2</span>
                )}
              </div>
              <span className="text-sm">Payment</span>
            </div>
            <div
              className={`flex flex-col items-center ${
                step === "confirmation" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step === "confirmation" ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                <span>3</span>
              </div>
              <span className="text-sm">Confirm</span>
            </div>
          </div>

          {/* Shipping Form */}
          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {/* Payment Form */}
          {step === "payment" && (
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="text-gray-400 hover:text-white"
                >
                  Back to Shipping
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                >
                  Review Order
                </button>
              </div>
            </form>
          )}

          {/* Order Confirmation */}
          {step === "confirmation" && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
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
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">
                    Shipping Address
                  </h4>
                  <p className="text-gray-300">
                    {formData.firstName} {formData.lastName}
                    <br />
                    {formData.address}
                    <br />
                    {formData.city}, {formData.state} {formData.zipCode}
                    <br />
                    {formData.country}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep("payment")}
                  className="text-gray-400 hover:text-white"
                >
                  Back to Payment
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
