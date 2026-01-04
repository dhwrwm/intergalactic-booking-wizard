"use client";

import { useState, useCallback, useMemo } from "react";
import { Traveler } from "@/types/booking";
import { useFocusManagement } from "@/hooks/useA11yAnnounce";
import TravelerCard from "@/components/molecules/TravelerCard";
import { Button } from "@/components/ui/button";
import { MAX_TRAVELERS, MIN_AGE, MAX_AGE } from "@/lib/constants";
import { useBookingWizard } from "@/app/booking/BookingWizardContext";

interface TravelersStepProps {
  onNext: () => void;
  onBack: () => void;
}

interface TravelerErrors {
  fullName?: string;
  age?: string;
}

export default function TravelersStep({ onNext, onBack }: TravelersStepProps) {
  const { state, dispatch } = useBookingWizard();
  const [errors, setErrors] = useState<{ [key: number]: TravelerErrors }>({});
  const [generalError, setGeneralError] = useState<string>("");
  const { focusFirstError } = useFocusManagement();

  const addTraveler = useCallback(() => {
    dispatch({ type: "ADD_TRAVELER" });
  }, [dispatch]);

  const removeTraveler = useCallback(
    (index: number) => {
      dispatch({ type: "REMOVE_TRAVELER", index });
      // Clear errors for this traveler
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    },
    [dispatch]
  );

  const updateTraveler = useCallback(
    (index: number, field: keyof Traveler, value: string | number) => {
      dispatch({ type: "UPDATE_TRAVELER", index, field, value });

      // Clear error for this field
      setErrors((prev) => {
        if (prev[index]?.[field]) {
          return {
            ...prev,
            [index]: { ...prev[index], [field]: undefined },
          };
        }
        return prev;
      });
    },
    [dispatch]
  );

  const validate = useCallback((): boolean => {
    const newErrors: { [key: number]: TravelerErrors } = {};
    let hasGeneralError = false;

    if (state.travelers.length === 0) {
      setGeneralError("At least one traveler is required");
      hasGeneralError = true;
    } else {
      setGeneralError("");
    }

    state.travelers.forEach((traveler, index) => {
      const travelerErrors: TravelerErrors = {};

      if (!traveler.fullName.trim()) {
        travelerErrors.fullName = "Full name is required";
      }

      if (!traveler.age || traveler.age < MIN_AGE) {
        travelerErrors.age = "Valid age is required";
      } else if (traveler.age > MAX_AGE) {
        travelerErrors.age = `Age must be between ${MIN_AGE} and ${MAX_AGE}`;
      }

      if (Object.keys(travelerErrors).length > 0) {
        newErrors[index] = travelerErrors;
      }
    });

    setErrors(newErrors);
    return !hasGeneralError && Object.keys(newErrors).length === 0;
  }, [state.travelers]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        onNext();
      } else {
        // Focus the first error field for better accessibility
        setTimeout(() => {
          focusFirstError();
        }, 100);
      }
    },
    [validate, onNext, focusFirstError]
  );

  const canAddMoreTravelers = useMemo(
    () => state.travelers.length < MAX_TRAVELERS,
    [state.travelers.length]
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-white mb-6">Add Travelers</h2>

      {generalError && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
          <p className="text-red-400">{generalError}</p>
        </div>
      )}

      {/* Travelers List */}
      <div className="space-y-4 mb-6">
        {state.travelers.map((traveler, index) => (
          <TravelerCard
            key={index}
            traveler={traveler}
            index={index}
            onUpdate={(field, value) => updateTraveler(index, field, value)}
            onRemove={() => removeTraveler(index)}
            errors={errors[index]}
          />
        ))}
      </div>

      {/* Add Traveler Button */}
      {canAddMoreTravelers && (
        <Button
          type="button"
          variant="outline"
          onClick={addTraveler}
          className="w-full mb-6 border-2 border-dashed border-purple-500 text-purple-300 hover:bg-purple-900/30"
        >
          + Add Traveler ({state.travelers.length}/{MAX_TRAVELERS})
        </Button>
      )}

      {!canAddMoreTravelers && (
        <p className="text-purple-300 text-sm mb-6 text-center">
          Maximum of {MAX_TRAVELERS} travelers reached
        </p>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <Button type="button" variant="secondary" size="lg" onClick={onBack}>
          ← Back
        </Button>
        <Button type="submit" variant="default" size="lg">
          Next<span className="hidden md:inline">: Review Booking</span> →
        </Button>
      </div>
    </form>
  );
}
