import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <h1 className="text-center font-semibold text-4xl">Taxi app</h1>
      </main>
    </div>
  );
}
