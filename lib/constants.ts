/**
 * Application-wide constants
 */

// Traveler constraints
export const MAX_TRAVELERS = 5;
export const MIN_TRAVELERS = 1;
export const MIN_AGE = 1;
export const MAX_AGE = 150;

// API endpoints
export const API_ENDPOINTS = {
  DESTINATIONS: "/api/destinations",
  BOOKINGS: "/api/bookings",
} as const;

// Booking steps
export const BOOKING_STEPS = {
  DESTINATION: "destination",
  TRAVELERS: "travelers",
  REVIEW: "review",
} as const;

// Session storage keys
export const STORAGE_KEYS = {
  WIZARD_STATE: "wizard-state",
} as const;

// API delays (for simulation)
export const API_DELAYS = {
  BOOKING_SUBMISSION: 1500,
} as const;

// Date constraints
export const DATE_CONSTRAINTS = {
  MIN_YEAR: 2147,
  MIN_DATE: "2147-01-01",
} as const;
