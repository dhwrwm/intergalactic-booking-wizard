import React from "react";
import { Traveler } from "@/types/booking";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";

export interface TravelerCardProps {
  traveler: Traveler;
  index: number;
  onUpdate: (field: keyof Traveler, value: string | number) => void;
  onRemove: () => void;
  errors?: {
    fullName?: string;
    age?: string;
  };
}

export default function TravelerCard({
  traveler,
  index,
  onUpdate,
  onRemove,
  errors = {},
}: TravelerCardProps) {
  return (
    <Card variant="default" padding="md">
      <div className="flex justify-between items-center mb-3">
        <Heading level="h4">Traveler {index + 1}</Heading>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Full Name"
          value={traveler.fullName}
          onChange={(e) => onUpdate("fullName", e.target.value)}
          placeholder="John Doe"
          error={errors.fullName}
        />

        <FormField
          label="Age"
          type="number"
          value={traveler.age || ""}
          onChange={(e) => onUpdate("age", parseInt(e.target.value) || 0)}
          placeholder="25"
          min="1"
          max="150"
          error={errors.age}
        />
      </div>
    </Card>
  );
}
