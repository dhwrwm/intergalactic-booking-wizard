import { useState, useEffect } from "react";
import { Destination } from "@/types/booking";
import { logError } from "@/lib/monitoring";
import { API_ENDPOINTS } from "@/lib/constants";

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_ENDPOINTS.DESTINATIONS);

        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const data = await response.json();
        setDestinations(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        logError(err instanceof Error ? err : new Error(errorMessage), {
          context: "useDestinations",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading, error };
}
