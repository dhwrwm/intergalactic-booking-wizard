export interface Destination {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
}

export interface Traveler {
  fullName: string;
  age: number;
}

export interface BookingFormData {
  destinationId: string;
  departureDate: string;
  returnDate: string;
  travelers: Traveler[];
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  error?: string;
}
