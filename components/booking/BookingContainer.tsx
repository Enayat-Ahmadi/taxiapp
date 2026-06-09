"use client";

import BookingStep1 from "./BookingStep1";

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
  const handleStep1Submit = async (formData: FormFields) => {
    console.log(formData);
  };
  return (
    <div className="min-h-screen py-8 md:px-4">
      <div className="max-w-2xl mx-auto">
        <BookingStep1 onNext={handleStep1Submit} />
      </div>
    </div>
  );
}
