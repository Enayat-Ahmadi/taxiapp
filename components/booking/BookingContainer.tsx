"use client";

import { useState } from "react";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import { VehicleType } from "@/lib/constant";

type FormFields = {
  pickupLocation: string;
  destination: string;
  phoneNumber: string;
  date: string;
  time: string;
  passenger: number;
  luggage: number;
};
interface StepData {
  step1?: FormFields;
  step2?: {
    vehicleType: string;
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
          />
        )}
      </div>
    </div>
  );
}
