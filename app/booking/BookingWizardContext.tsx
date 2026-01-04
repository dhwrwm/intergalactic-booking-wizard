"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import {
  bookingWizardReducer,
  initialState,
  BookingWizardState,
  BookingWizardAction,
} from "@/lib/booking";

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
      const saved = sessionStorage.getItem("wizard");
      return saved ? JSON.parse(saved) : init;
    }
  );

  useEffect(() => {
    sessionStorage.setItem("wizard", JSON.stringify(state));
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
