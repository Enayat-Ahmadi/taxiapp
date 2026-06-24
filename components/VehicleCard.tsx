import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card } from "./ui";
import { cn, formatPrice } from "@/lib/utils";
import { VehicleType, Vehicle } from "@/types/vehicle";
import { memo } from "react";

interface VehicleCardProps {
  vehicleKey: string;
  vehicle: Vehicle;
  isSelected: boolean;
  estimatedPrice: number;
  disabled: boolean;
  onSelect: (key: VehicleType) => void;
}

const VehicelCard = memo(function VehicelCard({
  vehicleKey,
  vehicle,
  isSelected,
  estimatedPrice,
  disabled,
  onSelect,
}: VehicleCardProps) {
  return (
    <motion.button
      key={vehicleKey}
      onClick={() => onSelect(vehicleKey as VehicleType)}
      className="w-full text-left"
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 overflow-hidden",
          isSelected
            ? "border-info/50 bg-success/30 shadow-info"
            : "hover:border-warning/50",
        )}
      >
        <div className="flex flex-col gap-4">
          {/* Vehicle Image */}

          <div className="relative w-full rounded-lg overflow-hidden">
            <Image
              src={vehicle.image}
              alt={vehicle.type}
              width={600}
              height={100}
              className="object-cover"
            />
          </div>

          {/* vekicle info */}
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ink capitalize">
                {vehicle.type}
              </h3>
              <div className="flex gap-4 text-xs text-ink">
                <span>👥 {vehicle.seats} seats</span>
                <span>🎒 {vehicle.luggage} bags</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-ink-dark">Estimated fare</p>
              <p className="text-2xl font-bold text-ink">
                {formatPrice(estimatedPrice)}
              </p>
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-block mt-1"
                  >
                    <div className="w-6 h-6 bg-info rounded-full flex items-center justify-center text-cloud-light">
                      ✓
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Card>
    </motion.button>
  );
});
export default VehicelCard;
