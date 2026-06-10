"use client";

import { useState } from "react";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";

type FormFields = {
  pickupLocation: string;
  destination: string;
  phoneNumber: string;
  date: string;
  time: string;
  passenger: number;
  luggage: number;
};

export default function BookingContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const handleStep1Submit = async (formData: FormFields) => {
    setCurrentStep(2);
    console.log(formData);
  };
  const handleStep2Submit = (VehicleType: string, estimatedPrice: number) => {
    console.log(VehicleType, estimatedPrice);
  };

  return (
    <div className="min-h-screen py-8 md:px-4">
      <div className="max-w-2xl mx-auto">
        {currentStep === 1 && <BookingStep1 onNext={handleStep1Submit} />}
        {currentStep === 2 && <BookingStep2 onNext={handleStep2Submit} />}
      </div>
    </div>
  );
}
