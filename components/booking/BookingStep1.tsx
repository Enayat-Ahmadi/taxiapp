"use client";
import { motion } from "framer-motion";
import { Card, Input, Button, Select } from "../ui";
import { getTimeSlots, PASSENGER_OPTIONS, LUGGAGE_OPTIONS } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { FormFields } from "@/types";

interface Step1Props {
  onNext: (data: FormFields) => void;
  isLoading?: boolean;
  initialData?: Partial<FormFields>;
}

export default function BookingStep1({
  onNext,
  isLoading,
  initialData,
}: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: initialData,
  });
  const timeSlots = useMemo(() => getTimeSlots(), []);

  const timeOptions = useMemo(
    () => timeSlots.map((slot) => ({ value: slot, label: slot })),
    [timeSlots],
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Trip Details</h2>
        <p className="mb-6">Tell us where you&apos;re going and when</p>

        <form
          onSubmit={handleSubmit(onNext)}
          className="space-y-4"
          suppressHydrationWarning
        >
          <div className="space-y-4">
            <Input
              {...register("pickupLocation", {
                required: "pickup location is required",
              })}
              label="Pickup Location"
              placeholder="Enter pickup address"
              error={errors.pickupLocation?.message}
            />
            <Input
              {...register("destination", {
                required: "destination is required",
              })}
              label="Destination"
              placeholder="Where to?"
              error={errors.destination?.message}
            />
            <Input
              {...register("phoneNumber", {
                required: "phone number is required",
                pattern: {
                  value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                  message: "Invalid phone number format",
                },
              })}
              label="Phone Number"
              type="tel"
              placeholder="+49 (123) 123-4567"
              error={errors.phoneNumber?.message}
            />
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            <Input
              {...register("date", {
                required: "Date is required",
                validate: (value) => {
                  const selected = new Date(value).setHours(0, 0, 0, 0);
                  const today = new Date().setHours(0, 0, 0, 0);
                  return selected >= today || "Date cannot be in the past";
                },
              })}
              type="date"
              label="Date"
              error={errors.date?.message}
            />
            <Select
              {...register("time", {
                required: "Time slot is required",
              })}
              label="Time"
              options={timeOptions}
              error={errors.time?.message}
            />
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            <Select
              {...register("passengers", {
                required: "At least 1 passenger is required",
                valueAsNumber: true,
              })}
              label="Passengers"
              options={PASSENGER_OPTIONS}
              error={errors.passengers?.message}
            />
            <Select
              {...register("luggage", {
                required: "Please select an option",
                valueAsNumber: true,
              })}
              label="Luggage"
              options={LUGGAGE_OPTIONS}
              error={errors.luggage?.message}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full bg-teal text-white"
          >
            Vehicle Selection
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
