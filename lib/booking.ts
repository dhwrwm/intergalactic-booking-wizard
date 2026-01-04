export const BOOKING_STEPS = ["destination", "travelers", "review"] as const;

export type BookingStep = (typeof BOOKING_STEPS)[number];

export const DEFAULT_STEP: BookingStep = "destination";

import { Traveler, DestinationId, ISODateString } from "@/types/booking";
import { MAX_TRAVELERS, MIN_AGE, MAX_AGE } from "./constants";

/**
 * Wizard state that persists across steps
 */
export interface BookingWizardState {
  destinationId?: DestinationId;
  departureDate?: ISODateString;
  returnDate?: ISODateString;
  travelers: Traveler[];
}

/**
 * All possible actions for the booking wizard reducer
 */
export type BookingWizardAction =
  | { type: "SET_DESTINATION"; destinationId: DestinationId }
  | { type: "SET_START_DATE"; departureDate: ISODateString }
  | { type: "SET_END_DATE"; returnDate: ISODateString }
  | {
      type: "SET_DATES";
      departureDate: ISODateString;
      returnDate: ISODateString;
    }
  | { type: "SET_TRAVELERS"; travelers: Traveler[] }
  | { type: "ADD_TRAVELER" }
  | { type: "REMOVE_TRAVELER"; index: number }
  | {
      type: "UPDATE_TRAVELER";
      index: number;
      field: keyof Traveler;
      value: string | number;
    }
  | { type: "RESET" };

export const initialState: BookingWizardState = {
  travelers: [],
};

export function bookingWizardReducer(
  state: BookingWizardState,
  action: BookingWizardAction
): BookingWizardState {
  switch (action.type) {
    case "SET_DESTINATION":
      return { ...state, destinationId: action.destinationId };
    case "SET_START_DATE":
      return {
        ...state,
        departureDate: action.departureDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        returnDate: action.returnDate,
      };
    case "SET_DATES":
      return {
        ...state,
        departureDate: action.departureDate,
        returnDate: action.returnDate,
      };
    case "SET_TRAVELERS":
      return { ...state, travelers: action.travelers };
    case "ADD_TRAVELER":
      if (state.travelers.length >= MAX_TRAVELERS) return state;
      return {
        ...state,
        travelers: [...state.travelers, { fullName: "", age: 0 }],
      };
    case "REMOVE_TRAVELER":
      return {
        ...state,
        travelers: state.travelers.filter((_, i) => i !== action.index),
      };
    case "UPDATE_TRAVELER":
      const newTravelers = [...state.travelers];
      newTravelers[action.index] = {
        ...newTravelers[action.index],
        [action.field]: action.value,
      };
      return { ...state, travelers: newTravelers };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

/**
 * Validates if a traveler has valid name and age
 */
function isTravelerValid(traveler: Traveler): boolean {
  return !!(
    traveler.fullName &&
    traveler.fullName.trim().length > 0 &&
    traveler.age >= MIN_AGE &&
    traveler.age <= MAX_AGE
  );
}

/**
 * Validates if the wizard state has the required data for a given step
 */
export function isStateValidForStep(
  state: BookingWizardState,
  step: string
): boolean {
  switch (step) {
    case "destination":
      // Destination step is always accessible
      return true;

    case "travelers":
      // Travelers step requires destination and dates
      return !!(
        state.destinationId &&
        state.departureDate &&
        state.returnDate &&
        new Date(state.returnDate) > new Date(state.departureDate)
      );

    case "review":
      // Review step requires destination, dates, and at least one valid traveler
      return !!(
        state.destinationId &&
        state.departureDate &&
        state.returnDate &&
        new Date(state.returnDate) > new Date(state.departureDate) &&
        state.travelers.length > 0 &&
        state.travelers.every(isTravelerValid)
      );

    default:
      return false;
  }
}
