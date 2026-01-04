"use client";

import { useCallback, useMemo, useState } from "react";
import { useDestinations } from "@/hooks/useDestinations";
import Card from "@/components/atoms/Card";
import DestinationCard from "@/components/molecules/DestinationCard";
import Label from "../atoms/Label";
import { DatePicker } from "../ui/date-picker";
import ErrorMessage from "../atoms/ErrorMessage";
import { Button } from "@/components/ui/button";
import {
  isValid,
  differenceInDays,
  format,
  parseISO,
  addDays,
  isAfter,
} from "date-fns";
import { useBookingWizard } from "@/app/booking/BookingWizardContext";

interface DestinationStepProps {
  onNext: () => void;
}

export default function DestinationStep({ onNext }: DestinationStepProps) {
  const { destinations, loading, error } = useDestinations();
  const { state, dispatch } = useBookingWizard();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!state.destinationId) {
      newErrors.destination = "Please select a destination";
    }
    if (!state.departureDate) {
      newErrors.departureDate = "Please select a departure date";
    }
    if (!state.returnDate) {
      newErrors.returnDate = "Please select a return date";
    }
    if (state.departureDate && state.returnDate) {
      if (new Date(state.returnDate) <= new Date(state.departureDate)) {
        newErrors.returnDate = "Return date must be after departure date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Focus first error field
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const errorElement = document.querySelector(`[aria-invalid="true"]`);
        if (errorElement) {
          (errorElement as HTMLElement).focus();
        }
      }
      return;
    }
    onNext();
  };

  // Calculate duration
  const duration = useMemo(() => {
    if (!state.departureDate || !state.returnDate) return null;
    const numberOfDays = differenceInDays(
      parseISO(state.returnDate),
      parseISO(state.departureDate)
    );
    if (numberOfDays === 1) return "1 day";
    return `${numberOfDays} days`;
  }, [state.departureDate, state.returnDate]);

  const handleDestinationSelect = (destinationId: string) => {
    dispatch({ type: "SET_DESTINATION", destinationId });
    setErrors({ ...errors, destination: "" });
  };

  const handleStartDateChange = useCallback(
    (date?: Date) => {
      if (date) {
        if (state.returnDate && isAfter(date, new Date(state.returnDate))) {
          dispatch({
            type: "SET_DATES",
            departureDate: format(date, "yyyy-MM-dd"),
            returnDate: "",
          });
        } else {
          dispatch({
            type: "SET_START_DATE",
            departureDate: format(date, "yyyy-MM-dd"),
          });
        }
      }
    },
    [dispatch, state.returnDate]
  );

  const handleEndDateChange = useCallback(
    (date?: Date) => {
      if (date) {
        dispatch({
          type: "SET_END_DATE",
          returnDate: format(date, "yyyy-MM-dd"),
        });
      }
    },
    [dispatch]
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        <p className="text-purple-200 mt-4">Loading destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card variant="default" padding="lg">
        <div className="text-center py-12">
          <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-400">Failed to load destinations: {error}</p>
          </div>
          <Button
            variant="default"
            size="lg"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Destination and dates selection">
      <h2 className="text-2xl font-bold text-white mb-6">
        Choose Your Destination
      </h2>

      {/* Destinations Grid */}
      <div className="mb-6">
        <fieldset>
          <legend className="text-md font-semibold text-purple-200 mb-3">
            Available Destinations
          </legend>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            role="radiogroup"
            aria-label="Select destination"
            aria-required="true"
            aria-invalid={!!errors.destination}
            aria-describedby={
              errors.destination ? "destination-error" : undefined
            }
          >
            {destinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                selected={state.destinationId === dest.id}
                onSelect={handleDestinationSelect}
              />
            ))}
          </div>
          {errors.destination && (
            <ErrorMessage message={errors.destination} id="destination-error" />
          )}
        </fieldset>
      </div>

      {/* Date Selection */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div className="date-picker-wrapper">
          <Label htmlFor="start-date" required size="sm">
            Departure Date
          </Label>
          <DatePicker
            date={
              state.departureDate && isValid(new Date(state.departureDate))
                ? new Date(state.departureDate)
                : undefined
            }
            onDateChange={handleStartDateChange}
            placeholder="Select Start Date"
            fromDate={new Date("2147-01-01")}
            error={!!errors.startDate}
            className="w-full"
          />
          <ErrorMessage message={errors.startDate} />
        </div>

        {/* End Date */}
        <div className="date-picker-wrapper">
          <Label htmlFor="end-date" required size="sm">
            Return Date
          </Label>
          <DatePicker
            date={
              state.returnDate && isValid(new Date(state.returnDate))
                ? new Date(state.returnDate)
                : undefined
            }
            onDateChange={handleEndDateChange}
            placeholder="Select End Date"
            fromDate={
              state.departureDate && isValid(new Date(state.departureDate))
                ? addDays(new Date(state.departureDate), 1)
                : undefined
            }
            disablePicker={!state.departureDate}
            error={!!errors.endDate}
            className="w-full"
          />
          <ErrorMessage message={errors.endDate} />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-900/30 border border-purple-500/30 rounded-lg">
          <svg
            className="w-4 h-4 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-purple-200 font-medium">
            Trip Duration: <span className="text-white">{duration}</span>
          </span>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button type="submit" variant="default" size="lg">
          Next: Add Travelers →
        </Button>
      </div>
    </form>
  );
}
