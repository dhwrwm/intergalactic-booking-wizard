"use client";

import { useState, useMemo } from "react";
import { useDestinations } from "@/hooks/useDestinations";
import { Button } from "@/components/ui/button";
import { useBookingWizard } from "@/app/booking/BookingWizardContext";

interface ReviewStepProps {
  onBack: () => void;
  onComplete: (bookingId: string) => void;
}

export default function ReviewStep({ onBack, onComplete }: ReviewStepProps) {
  const { state } = useBookingWizard();
  const { destinations } = useDestinations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const destination = useMemo(() => {
    return destinations.find((d) => d.id === state.destinationId) || null;
  }, [destinations, state.destinationId]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Build booking data from wizard state
    const bookingData = {
      destinationId: state.destinationId || "",
      departureDate: state.departureDate || "",
      returnDate: state.returnDate || "",
      travelers: state.travelers,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (data.success && data.bookingId) {
        onComplete(data.bookingId);
      } else {
        setError(data.error || "Booking failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        Review Your Booking
      </h2>

      {error && (
        <div
          className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Destination Details */}
      <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
        <h3 className="text-lg font-semibold text-purple-200 mb-3">
          Destination
        </h3>
        {destination ? (
          <div className="space-y-2">
            <p className="text-white">
              <span className="text-purple-300">Planet:</span>{" "}
              {destination.name}
            </p>
            <p className="text-white">
              <span className="text-purple-300">Distance:</span>{" "}
              {destination.distance}
            </p>
            <p className="text-white">
              <span className="text-purple-300">Travel Time:</span>{" "}
              {destination.travelTime}
            </p>
          </div>
        ) : (
          <p className="text-slate-400">Loading destination...</p>
        )}
      </div>

      {/* Travel Dates */}
      <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
        <h3 className="text-lg font-semibold text-purple-200 mb-3">
          Travel Dates
        </h3>
        <div className="space-y-2">
          <p className="text-white">
            <span className="text-purple-300">Departure:</span>{" "}
            {formatDate(state.departureDate || "")}
          </p>
          <p className="text-white">
            <span className="text-purple-300">Return:</span>{" "}
            {formatDate(state.returnDate || "")}
          </p>
        </div>
      </div>

      {/* Travelers */}
      <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
        <h3 className="text-lg font-semibold text-purple-200 mb-3">
          Travelers ({state.travelers.length})
        </h3>
        <div className="space-y-3">
          {state.travelers.map((traveler, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-slate-800/50 rounded"
            >
              <span className="text-white font-medium">
                {traveler.fullName}
              </span>
              <span className="text-purple-300">{traveler.age} years old</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onBack}
          disabled={loading}
        >
          ← Back
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? (
            <>
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            "✓ Confirm Booking"
          )}
        </Button>
      </div>
    </div>
  );
}
