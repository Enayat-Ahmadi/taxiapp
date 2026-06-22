"use client";

import { useCallback, useMemo, useState } from "react";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import {
  BookingStatus,
  FormFields,
  IBooking,
  StepData,
  VehicleType,
} from "@/types";
import { createBookingAction } from "@/actions/booking";
import BookingSuccess from "./BookingSuccess";

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

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const step3Data = useMemo(() => {
    if (!stepData.step1 || !stepData.step2) return null;
    return {
      ...stepData.step1,
      vehicleType: stepData.step2.vehicleType,
      estimatedPrice: stepData.step2.estimatedPrice,
      status: "pending" as BookingStatus,
    };
  }, [stepData]);

  const handleStep3Submit = useCallback(async () => {
    if (!step3Data) return;

    setIsLoading(true);
    setErrorMessage(null);

    const res = await createBookingAction(step3Data as IBooking);
    if (res.success) {
      setSuccessMessage(true);
    } else {
      setErrorMessage(
        res.error || "Failed to create booking. Please try again.",
      );
    }

    setIsLoading(false);
  }, [step3Data]);

  if (successMessage) return <BookingSuccess />;

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
        {currentStep === 3 && step3Data && (
          <BookingStep3
            booking={step3Data as IBooking}
            onConfirm={handleStep3Submit}
            onPrevious={handlePrevious}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
