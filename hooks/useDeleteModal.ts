import { useState } from "react";

type DeleteAction<Tid extends string> = (id: Tid) => Promise<void>;

type useDeleteModalResult<Tid extends string> = {
  isOpen: boolean;
  isDeleting: boolean;
  selectedId: Tid | null;
  requestDelete: (id: Tid) => void;
  cancelDelete: () => void;
  confirmDelete: () => Promise<void>;
};

export default function useDeleteModal<Tid extends string>(
  onDelete: DeleteAction<Tid>,
): useDeleteModalResult<Tid> {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedId, setSelectedId] = useState<Tid | null>(null);

  const requestDelete = (id: Tid) => {
    setSelectedId(id);
    setIsOpen(true);
  };
  const cancelDelete = () => {
    setIsOpen(false);
    setSelectedId(null);
  };
  const confirmDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      await onDelete(selectedId);
      setIsOpen(false);
      setSelectedId(null);
    } finally {
      setIsDeleting(false);
    }
  };
  return {
    isOpen,
    isDeleting,
    selectedId,
    requestDelete,
    cancelDelete,
    confirmDelete,
  };
}
