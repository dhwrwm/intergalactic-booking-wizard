"use client";

import { useDestinations } from "@/hooks/useDestinations";

export default function DestinationsCount() {
  const { destinations, loading } = useDestinations();

  if (loading) {
    return <>...</>;
  }

  return <>{destinations.length}</>;
}
