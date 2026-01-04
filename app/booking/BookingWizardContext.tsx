"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import {
  bookingWizardReducer,
  initialState,
  BookingWizardState,
  BookingWizardAction,
} from "@/lib/booking";
import { STORAGE_KEYS } from "@/lib/constants";

const BookingWizardContext = createContext<{
  state: BookingWizardState;
  dispatch: React.Dispatch<BookingWizardAction>;
} | null>(null);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    bookingWizardReducer,
    initialState,
    (init) => {
      if (typeof window === "undefined") return init;
      const saved = sessionStorage.getItem(STORAGE_KEYS.WIZARD_STATE);
      return saved ? JSON.parse(saved) : init;
    }
  );

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.WIZARD_STATE, JSON.stringify(state));
  }, [state]);

  return (
    <BookingWizardContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingWizardContext.Provider>
  );
}

export function useBookingWizard() {
  const ctx = useContext(BookingWizardContext);
  if (!ctx)
    throw new Error(
      "useBookingWizard must be used within BookingWizardProvider"
    );
  return ctx;
}
