import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";

export default function DeleteZone() {
  const { setNodeRef, isOver } = useDroppable({
    id: "delete-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-24 aspect-square border-2 ${
        isOver ? "border-red-500" : "border-slate-700"
      } flex items-center justify-center rounded-lg border-dashed transition duration-300 ease-in-out`}
    >
      <Trash2 size={50} className={`transition duration-300 ${isOver ? 'scale-125 text-red-500' : 'scale-100 text-gray-600'}`} />
    </div>
  );
}
