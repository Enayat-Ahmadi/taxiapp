"use client";

import { useState } from "react";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import { VehicleType } from "@/lib/constant";
import BookingStep3, { Booking } from "./BookingStep3";

type FormFields = {
  pickupLocation: string;
  destination: string;
  phoneNumber: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
};
interface StepData {
  step1?: FormFields;
  step2?: {
    vehicleType: VehicleType;
    estimatedPrice: number;
  };
}
export default function BookingContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState<Partial<StepData>>({});

  const handleStep1Submit = (formData: FormFields) => {
    setStepData((prev) => ({
      ...prev,
      step1: formData,
    }));
    setCurrentStep(2);
  };

  const handleStep2Submit = (
    vehicleType: VehicleType,
    estimatedPrice: number,
  ) => {
    setStepData((prev) => ({
      ...prev,
      step2: {
        vehicleType,
        estimatedPrice,
      },
    }));
    setCurrentStep(3);
  };
  const handleStep3Submit = () => {
    if (!stepData.step1 || !stepData.step2) return;
    const bookingData: Booking = {
      ...stepData.step1,
      vehicleType: stepData.step2.vehicleType,
      estimatedPrice: stepData.step2.estimatedPrice,
      status: "pending",
    };
    console.log("finalsubmit", bookingData);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="min-h-screen py-8 md:px-4">
      <div className="max-w-2xl mx-auto">
        {currentStep === 1 && (
          <BookingStep1
            onNext={handleStep1Submit}
            initialData={stepData.step1}
          />
        )}
        {currentStep === 2 && (
          <BookingStep2
            pickupLocation={stepData.step1?.pickupLocation}
            destination={stepData.step1?.destination}
            onNext={handleStep2Submit}
            onPrevious={handlePrevious}
            initialVehicleType={stepData.step2?.vehicleType}
          />
        )}
        {currentStep === 3 && stepData.step1 && stepData.step2 && (
          <BookingStep3
            booking={{
              pickupLocation: stepData.step1.pickupLocation,
              destination: stepData.step1.destination,
              date: stepData.step1.date,
              time: stepData.step1.time,
              passengers: stepData.step1.passengers,
              luggage: stepData.step1.luggage,
              phoneNumber: stepData.step1.phoneNumber,
              vehicleType: stepData.step2.vehicleType,
              estimatedPrice: stepData.step2.estimatedPrice,
              status: "pending",
            }}
            onConfirm={handleStep3Submit}
            onPrevious={handlePrevious}
          />
        )}
      </div>
    </div>
  );
}
