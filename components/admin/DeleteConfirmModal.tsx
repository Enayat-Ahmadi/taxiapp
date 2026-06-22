"use client";

import { Button } from "@/components/ui";
import React from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  bookingId: string;
  pickupLocation?: string;
  destination?: string;
  isLoading?: boolean;
  onConfirm: (bookingId: string) => Promise<void>;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  bookingId,
  pickupLocation,
  destination,
  isLoading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  const handleConfirm = async () => {
    await onConfirm(bookingId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full mx-4 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Delete Booking?</h2>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this booking?
        </p>

        {pickupLocation && destination && (
          <div className="bg-gray-50 rounded p-3 text-sm">
            <p className="text-gray-700">
              <span className="font-medium">From:</span> {pickupLocation}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">To:</span> {destination}
            </p>
          </div>
        )}

        <p className="text-xs text-gray-500">This action cannot be undone.</p>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-gray-200 text-gray-900 hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-600 text-white hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
