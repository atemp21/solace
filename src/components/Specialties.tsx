"use client";
import { useState } from "react";

interface SpecialtiesProps {
  specialties: string[];
  advocateId: number;
}

export default function Specialties({ specialties, advocateId }: SpecialtiesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleSpecialties = specialties
    .sort((a, b) => a.localeCompare(b))
    .slice(0, isExpanded ? specialties.length : 3);

  return (
    <div className="flex flex-wrap gap-2">
      {visibleSpecialties.map((specialty, index) => (
        <span
          key={index}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isExpanded
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {specialty}
        </span>
      ))}
      {specialties.length > 3 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          {isExpanded
            ? `- ${specialties.length - 3} less`
            : `+ ${specialties.length - 3} more`}
        </button>
      )}
    </div>
  );
}
