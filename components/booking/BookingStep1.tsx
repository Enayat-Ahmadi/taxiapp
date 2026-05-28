"use client";
import { motion } from "framer-motion";
import { Card, Input, Button, Select } from "../ui";
import { getTimeSlots } from "@/lib/utils";

export default function BookingStep1() {
  const timeSlots = getTimeSlots();
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Trip Details</h2>
        <p className="mb-6">Tell us where you're going and when</p>
        <form className="space-y-4">
          <div className="space-y-4">
            <Input label="Pickup Location" placeholder="Enter pickup address" />
            <Input label="Destination" placeholder="Where to?" />
          </div>
          <div>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+49 (123) 123-4567"
            />
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            <Input type="date" label="Date" className="" />
            <Select
              label="Time"
              options={timeSlots.map((slot) => ({
                value: slot,
                label: slot,
              }))}
            />
          </div>
          <Button type="submit" size="lg" className="w-full bg-teal text-white">
          Vehicle Selection
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
