"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  children?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  children,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="mt-2 text-sm text-gray-600">
          {description}
        </p>

        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
            variant="outline"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant="teal"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Loading..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}