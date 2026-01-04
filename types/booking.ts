/**
 * Type-safe destination identifiers
 */
export type DestinationId = "mars" | "europa" | "titan" | "luna";

/**
 * ISO 8601 date string (YYYY-MM-DD format)
 * @example "2147-03-15"
 */
export type ISODateString = string;

/**
 * Represents a space travel destination
 */
export interface Destination {
  /** Unique identifier for the destination */
  id: DestinationId;
  /** Display name of the destination */
  name: string;
  /** Distance from Earth (e.g., "225M km") */
  distance: string;
  /** Estimated travel time (e.g., "7 months") */
  travelTime: string;
}

/**
 * Represents a traveler on a booking
 * @see {@link BookingFormData}
 */
export interface Traveler {
  /** Full legal name of the traveler */
  fullName: string;
  /** Age in years (must be between 1-150) */
  age: number;
}

/**
 * Booking form data submitted by the user
 */
export interface BookingFormData {
  /** Selected destination ID */
  destinationId: DestinationId;
  /** Departure date in ISO format */
  departureDate: ISODateString;
  /** Return date in ISO format */
  returnDate: ISODateString;
  /** List of travelers (1-5 travelers) */
  travelers: Traveler[];
}

/**
 * API response for booking submission
 * Uses discriminated union for type safety
 */
export type BookingResponse =
  | {
      success: true;
      bookingId: string;
    }
  | {
      success: false;
      error: string;
    };

/**
 * Confirmed booking with full details
 */
export interface BookingConfirmation {
  /** Unique booking identifier */
  bookingId: string;
  /** Selected destination */
  destination: Destination;
  /** Departure date */
  departureDate: ISODateString;
  /** Return date */
  returnDate: ISODateString;
  /** List of travelers */
  travelers: Traveler[];
  /** Booking creation timestamp */
  createdAt: ISODateString;
  /** Current booking status */
  status: "confirmed" | "pending" | "cancelled";
}
