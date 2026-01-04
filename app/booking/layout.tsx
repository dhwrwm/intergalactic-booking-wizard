import type { Metadata } from "next";
import { WizardProvider } from "./BookingWizardContext";

export const metadata: Metadata = {
  title: "Book Your Trip | Intergalactic Travel Agency",
  description:
    "Book your space tourism adventure to Mars, Europa, Titan, or Luna",
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WizardProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                🚀 Intergalactic Travel Agency
              </h1>
              <p className="text-purple-200">Budget Space Tourism Since 2147</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </WizardProvider>
  );
}
