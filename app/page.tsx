import Link from "next/link";
import { Suspense } from "react";
import Card from "@/components/atoms/Card";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import DestinationsCount from "@/components/DestinationsCount";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-6xl font-bold text-white mb-4">
              🚀 Intergalactic Travel Agency
            </h1>
            <p className="text-2xl text-purple-200 mb-2">
              Budget Space Tourism Since 2147
            </p>
            <p className="text-lg text-purple-300">
              Explore the solar system without breaking the bank!
            </p>
          </div>

          {/* CTA Section */}
          <Card variant="elevated" padding="lg" className="mb-12">
            <Heading level="h2" className="mb-4 text-3xl">
              Ready for Your Next Adventure?
            </Heading>
            <Text variant="caption" className="mb-6 block">
              Book your trip to Mars, Europa, Titan, or Luna today!
            </Text>
            <Link
              href="/booking?step=destination"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold rounded-lg transition-colors shadow-lg"
            >
              Start Booking →
            </Link>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="bordered" padding="lg">
              <div className="text-4xl mb-3">🌍</div>
              <Heading level="h3" className="mb-2 text-white">
                <Suspense fallback="...">
                  <DestinationsCount />
                </Suspense>{" "}
                Destinations
              </Heading>
              <Text variant="caption">
                From the Moon to Titan, we&apos;ve got you covered
              </Text>
            </Card>
            <Card variant="bordered" padding="lg">
              <div className="text-4xl mb-3">💰</div>
              <Heading level="h3" className="mb-2 text-white">
                Budget Friendly
              </Heading>
              <Text variant="caption">
                Space travel for everyone, not just billionaires
              </Text>
            </Card>
            <Card variant="bordered" padding="lg">
              <div className="text-4xl mb-3">⚡</div>
              <Heading level="h3" className="mb-2 text-white">
                Easy Booking
              </Heading>
              <Text variant="caption">
                Simple 3-step process to book your adventure
              </Text>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
