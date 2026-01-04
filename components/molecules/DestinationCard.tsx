import React from "react";
import { Destination } from "@/types/booking";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";

export interface DestinationCardProps {
  destination: Destination;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function DestinationCard({
  destination,
  selected,
  onSelect,
}: DestinationCardProps) {
  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-label={`${destination.name}, Distance: ${destination.distance}, Travel Time: ${destination.travelTime}`}
      tabIndex={0}
      onClick={() => onSelect(destination.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(destination.id);
        }
      }}
      className={`h-auto p-4 rounded-lg border-2 text-left transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
        selected
          ? "border-purple-500 bg-purple-900/50"
          : "border-slate-600 bg-slate-700/50 hover:border-purple-400"
      }`}
    >
      <div className="w-full">
        <Heading level="h3" className="mb-2">
          {destination.name}
          {selected && (
            <span className="ml-2 text-purple-400" aria-hidden="true">
              ✓
            </span>
          )}
        </Heading>
        <Text variant="caption" size="sm">
          Distance: {destination.distance}
        </Text>
        <Text variant="caption" size="sm">
          Travel Time: {destination.travelTime}
        </Text>
      </div>
    </div>
  );
}
