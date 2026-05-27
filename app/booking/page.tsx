import BookingContainer from "@/components/booking/BookingContainer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Book Your Ride | TaxiClick",
  description: "Fast and easy booking in 3 simple steps",
};
export default function BookingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <BookingContainer />
      </main>
    </div>
  );
}
