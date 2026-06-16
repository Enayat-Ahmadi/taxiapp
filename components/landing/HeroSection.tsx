"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  } as const;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 relative overflow-hidden">
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block mb-6 px-4 py-2 bg-sky/10 border border-sky/30 rounded-full"
        >
          <span className="text-sm font-semibold text-">
            ✨ Premium Taxi Service
          </span>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight"
        >
          Your Ride,{" "}
          <span className="bg-brand bg-clip-text text-transparent">
            Our Priority
          </span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto"
        >
          Premium taxi service for the discerning traveler. Professional
          drivers, luxury vehicles, and seamless booking experience.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            onClick={() => router.push("/booking")}
            className="w-full bg-teal text-black hover:shadow-teal-active"
          >
            Book a Ride
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-ink-dark rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-ink-dark rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
