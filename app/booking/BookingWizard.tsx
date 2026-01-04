"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { isStateValidForStep } from "@/lib/booking";
import { useFocusManagement } from "@/hooks/useA11yAnnounce";
import DestinationStep from "@/components/booking/DestinationStep";
import TravelersStep from "@/components/booking/TravelersStep";
import ReviewStep from "@/components/booking/ReviewStep";
import ConfirmationStep from "@/components/booking/ConfirmationStep";
import StepProgressIndicator from "./StepProgressIndicator";
import { useBookingWizard } from "./BookingWizardContext";

type Props = {
  step: string;
};

export default function BookingWizard({ step }: Props) {
  const router = useRouter();
  const { state, dispatch } = useBookingWizard();
  const [bookingId, setBookingId] = useState<string | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const previousStepRef = useRef<string>(step);
  const { focusElement } = useFocusManagement();

  const go = (s: string) => router.push(`/booking?step=${s}`);

  // Validate state and redirect if invalid for current step
  useEffect(() => {
    if (!isStateValidForStep(state, step)) {
      router.replace("/booking?step=destination");
    }
  }, [state, step, router]);

  // Manage focus on step changes using the accessibility hook
  useEffect(() => {
    if (previousStepRef.current !== step) {
      // Focus the main content area after step change
      setTimeout(() => {
        if (mainContentRef.current) {
          const heading = mainContentRef.current.querySelector("h2");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            (heading as HTMLElement).focus();
          }
        } else {
          // Fallback to using the hook's focus method
          focusElement("h2");
        }
      }, 100);
      previousStepRef.current = step;
    }
  }, [step, focusElement]);

  const handleBookingComplete = (id: string) => {
    setBookingId(id);
    dispatch({ type: "RESET" });
  };

  if (bookingId) {
    return <ConfirmationStep bookingId={bookingId} />;
  }

  return (
    <>
      <StepProgressIndicator step={step} />

      {/* Step Content */}
      <div
        id="main-content"
        ref={mainContentRef}
        className="bg-slate-800 rounded-lg shadow-xl p-8"
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
