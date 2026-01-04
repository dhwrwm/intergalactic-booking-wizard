import { NextResponse } from "next/server";
import { MAX_TRAVELERS, MIN_TRAVELERS, API_DELAYS } from "@/lib/constants";
import { logError, trackEvent } from "@/lib/monitoring";

export interface Traveler {
  fullName: string;
  age: number;
}

export interface BookingRequest {
  destinationId: string;
  departureDate: string;
  returnDate: string;
  travelers: Traveler[];
}

export interface BookingResponse {
  success: boolean;
  bookingId: string;
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();

    // Validate the booking data
    if (
      !body.destinationId ||
      !body.departureDate ||
      !body.returnDate ||
      !body.travelers ||
      body.travelers.length === 0
    ) {
      trackEvent("booking_validation_failed", { reason: "missing_fields" });
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate date order
    if (new Date(body.returnDate) <= new Date(body.departureDate)) {
      trackEvent("booking_validation_failed", { reason: "invalid_dates" });
      return NextResponse.json(
        { success: false, error: "Return date must be after departure date" },
        { status: 400 }
      );
    }

    // Validate travelers
    if (
      body.travelers.length < MIN_TRAVELERS ||
      body.travelers.length > MAX_TRAVELERS
    ) {
      trackEvent("booking_validation_failed", {
        reason: "invalid_traveler_count",
      });
      return NextResponse.json(
        {
          success: false,
          error: `Must have between ${MIN_TRAVELERS} and ${MAX_TRAVELERS} travelers`,
        },
        { status: 400 }
      );
    }

    // Validate traveler data
    for (const traveler of body.travelers) {
      if (!traveler.fullName || !traveler.fullName.trim()) {
        trackEvent("booking_validation_failed", {
          reason: "invalid_traveler_name",
        });
        return NextResponse.json(
          { success: false, error: "All travelers must have a name" },
          { status: 400 }
        );
      }
      if (!traveler.age || traveler.age < 1 || traveler.age > 150) {
        trackEvent("booking_validation_failed", {
          reason: "invalid_traveler_age",
        });
        return NextResponse.json(
          { success: false, error: "All travelers must have a valid age" },
          { status: 400 }
        );
      }
    }

    // Simulate network latency
    await new Promise((resolve) =>
      setTimeout(resolve, API_DELAYS.BOOKING_SUBMISSION)
    );

    // Generate a random booking ID
    const bookingId = `BK${Math.random()
      .toString(36)
      .substring(2, 9)
      .toUpperCase()}`;

    // Track successful booking
    trackEvent("booking_completed", {
      destinationId: body.destinationId,
      travelerCount: body.travelers.length,
      bookingId,
    });

    const response: BookingResponse = {
      success: true,
      bookingId,
    };

    return NextResponse.json(response);
  } catch (error) {
    logError(error as Error, { context: "booking_api" });
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
