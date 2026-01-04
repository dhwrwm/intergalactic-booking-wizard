import { NextResponse } from "next/server";

export interface Destination {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
}

const destinations: Destination[] = [
  { id: "mars", name: "Mars", distance: "225M km", travelTime: "7 months" },
  { id: "europa", name: "Europa", distance: "628M km", travelTime: "2 years" },
  { id: "titan", name: "Titan", distance: "1.2B km", travelTime: "4 years" },
  {
    id: "luna",
    name: "Luna (Moon)",
    distance: "384K km",
    travelTime: "3 days",
  },
];

export async function GET() {
  return NextResponse.json(destinations);
}
