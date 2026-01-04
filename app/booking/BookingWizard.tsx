"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { isStateValidForStep } from "@/lib/booking";
import { useA11yAnnounce } from "@/hooks/useA11yAnnounce";
import DestinationStep from "@/components/booking/DestinationStep";
import TravelersStep from "@/components/booking/TravelersStep";
import ReviewStep from "@/components/booking/ReviewStep";
import ConfirmationStep from "@/components/booking/ConfirmationStep";
import StepProgressIndicator from "./StepProgressIndicator";
import { useBookingWizard } from "./BookingWizardContext";

type Props = {
  step: string;
};

const STEP_TITLES = {
  destination: "Step 1: Select Destination and Dates",
  travelers: "Step 2: Add Traveler Information",
  review: "Step 3: Review and Confirm Booking",
};

export default function BookingWizard({ step }: Props) {
  const router = useRouter();
  const { state, dispatch } = useBookingWizard();
  const [bookingId, setBookingId] = useState<string | null>(null);
  const { announce } = useA11yAnnounce();
  const mainContentRef = useRef<HTMLDivElement>(null);
  const previousStepRef = useRef<string>(step);

  const go = (s: string) => router.push(`/booking?step=${s}`);

  // Validate state and redirect if invalid for current step
  useEffect(() => {
    if (!isStateValidForStep(state, step)) {
      router.replace("/booking?step=destination");
    }
  }, [state, step, router]);

  // Announce step changes to screen readers and manage focus
  useEffect(() => {
    if (previousStepRef.current !== step) {
      const stepTitle = STEP_TITLES[step as keyof typeof STEP_TITLES];
      if (stepTitle) {
        announce(stepTitle);

        // Focus the main content area after step change
        setTimeout(() => {
          if (mainContentRef.current) {
            const heading = mainContentRef.current.querySelector("h2");
            if (heading) {
              heading.setAttribute("tabindex", "-1");
              heading.focus();
            }
          }
        }, 100);
      }
      previousStepRef.current = step;
    }
  }, [step, announce]);

  const handleBookingComplete = (id: string) => {
    setBookingId(id);
    dispatch({ type: "RESET" });
    announce("Booking confirmed successfully!");
  };

  if (bookingId) {
    return <ConfirmationStep bookingId={bookingId} />;
  }

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <StepProgressIndicator step={step} />

      {/* Step Content */}
      <div
        id="main-content"
        ref={mainContentRef}
        className="bg-slate-800 rounded-lg shadow-xl p-8"
        role="main"
        aria-label="Booking wizard content"
      >
        {step === "destination" && (
          <DestinationStep onNext={() => go("travelers")} />
        )}
        {step === "travelers" && (
          <TravelersStep
            onNext={() => go("review")}
            onBack={() => go("destination")}
          />
        )}
        {step === "review" && (
          <ReviewStep
            onBack={() => go("travelers")}
            onComplete={handleBookingComplete}
          />
        )}
      </div>
    </>
  );
}
