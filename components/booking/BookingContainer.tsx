"use client";

import { useCallback, useState } from "react";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import { FormFields, IBooking, StepData, VehicleType } from "@/types";
import { createBookingAction } from "@/actions/booking";

export default function BookingContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState<Partial<StepData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStep1Submit = useCallback((formData: FormFields) => {
    setStepData((prev) => ({
      ...prev,
      step1: formData,
    }));
    setCurrentStep(2);
  }, []);

  const handleStep2Submit = useCallback(
    (vehicleType: VehicleType, estimatedPrice: number) => {
      setStepData((prev) => ({
        ...prev,
        step2: {
          vehicleType,
          estimatedPrice,
        },
      }));
      setCurrentStep(3);
    },
    [],
  );

  const handleStep3Submit = async () => {
    if (!stepData.step1 || !stepData.step2) return;
    setIsLoading(true);
    setErrorMessage(null);
    const bookingData: IBooking = {
      ...stepData.step1,
      vehicleType: stepData.step2.vehicleType,
      estimatedPrice: stepData.step2.estimatedPrice,
    };

    try {
      const res = await createBookingAction(bookingData);
      if (res.success) {
        setSuccessMessage(true);
      } else {
        setErrorMessage(
          res.error || "Failed to create booking. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);
  
  if (successMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 md:px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-green-600">
            Booking Created Successfully!
          </h1>
          <p className="mt-4 text-gray-600">Your booking has been confirmed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:px-4">
      <div className="max-w-2xl mx-auto">
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{errorMessage}</p>
          </div>
        )}
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
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
