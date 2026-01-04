import { DEFAULT_STEP } from "@/lib/booking";
import BookingWizard from "./BookingWizard";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step } = await searchParams;
  return <BookingWizard step={step ?? DEFAULT_STEP} />;
}
