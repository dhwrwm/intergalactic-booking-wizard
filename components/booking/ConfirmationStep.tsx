"use client";

import Link from "next/link";

interface ConfirmationStepProps {
  bookingId: string;
}

export default function ConfirmationStep({ bookingId }: ConfirmationStepProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-white mb-4">
          🚀 Booking Confirmed!
        </h1>
        <p className="text-purple-200 mb-6">
          Your intergalactic adventure is all set!
        </p>

        {/* Booking ID */}
        <div className="mb-8 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
          <p className="text-purple-300 text-sm mb-2">Your Booking ID</p>
          <p className="text-2xl font-mono font-bold text-white">{bookingId}</p>
        </div>

        {/* Additional Info */}
        <div className="mb-8 text-left space-y-3 p-4 bg-purple-900/30 rounded-lg">
          <p className="text-purple-200 text-sm">
            ✓ Confirmation email sent to your space communicator
          </p>
          <p className="text-purple-200 text-sm">
            ✓ Boarding passes will be available 24 hours before departure
          </p>
          <p className="text-purple-200 text-sm">
            ✓ Please arrive at the launch pad 3 hours early
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Book Another Trip
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
