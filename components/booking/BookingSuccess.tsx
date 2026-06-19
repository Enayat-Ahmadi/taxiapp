import { Button } from "../ui";
import { useRouter } from "next/navigation";

export default function BookingSuccess() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col gap-4  items-center justify-center py-8 md:px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Booking Created Successfully!
        </h1>
        <p className="mt-4 text-gray-600">Your booking has been confirmed.</p>
      </div>
      <Button
        variant="outline"
        onClick={() => router.push("/")}
        className="text-cloud-light bg-teal"
      >
        Back to Home
      </Button>
    </div>
  );
}
