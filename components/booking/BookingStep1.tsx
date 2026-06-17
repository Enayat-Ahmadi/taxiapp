"use client";
import { motion } from "framer-motion";
import { Card, Input, Button, Select } from "../ui";
import { getTimeSlots, PASSENGER_OPTIONS, LUGGAGE_OPTIONS } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { TripDetailsSchema, TripDetailsInput } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";

interface Step1Props {
  onNext: (data: TripDetailsInput) => void;
  isLoading?: boolean;
  initialData?: Partial<TripDetailsInput>;
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
  } = useForm<TripDetailsInput>({
    resolver: zodResolver(TripDetailsSchema),
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
              {...register("pickupLocation")}
              label="Pickup Location"
              placeholder="Enter pickup address"
              error={errors.pickupLocation?.message}
            />
            <Input
              {...register("destination")}
              label="Destination"
              placeholder="Where to?"
              error={errors.destination?.message}
            />
            <Input
              {...register("phoneNumber")}
              label="Phone Number"
              type="tel"
              placeholder="+49 (123) 123-4567"
              error={errors.phoneNumber?.message}
            />
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            <Input
              {...register("date")}
              type="date"
              label="Date"
              error={errors.date?.message}
            />
            <Select
              {...register("time")}
              label="Time"
              options={timeOptions}
              error={errors.time?.message}
            />
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            <Select
              {...register("passengers", { valueAsNumber: true })}
              label="Passengers"
              options={PASSENGER_OPTIONS}
              error={errors.passengers?.message}
            />
            <Select
              {...register("luggage", { valueAsNumber: true })}
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
