export type Program = {
  id: string;
  name: string;
  positioning: string;
  priceLabel: string;
  features: string[];
  highlighted?: boolean;
};

export const programs: Program[] = [
  {
    id: "fleet-maintenance",
    name: "Fleet Maintenance",
    positioning: "For businesses that can't afford downtime",
    priceLabel: "Custom",
    features: [
      "Priority scheduling & pickup",
      "Predictive service intervals",
      "Consolidated monthly billing",
      "Dedicated account manager",
    ],
  },
  {
    id: "vehicle-care-plan",
    name: "Monthly Vehicle Care",
    positioning: "Effortless ownership, handled",
    priceLabel: "$149/mo",
    features: [
      "Monthly maintenance detail",
      "Fluid & inspection checks",
      "Concierge drop-off & return",
      "Member service rates",
    ],
    highlighted: true,
  },
  {
    id: "tire-care",
    name: "Tire Care Plan",
    positioning: "Always planted to the road",
    priceLabel: "$39/mo",
    features: [
      "Rotation & balancing included",
      "Road-hazard coverage",
      "Seasonal tire storage",
      "Alignment checks",
    ],
  },
  {
    id: "protection-plan",
    name: "Vehicle Protection",
    positioning: "Value, preserved",
    priceLabel: "From $89/mo",
    features: [
      "Extended powertrain coverage",
      "Paint & interior protection",
      "Annual ceramic refresh",
      "Transferable on resale",
    ],
  },
  {
    id: "tint-warranty",
    name: "Tint Warranty Program",
    positioning: "Protected for the long haul",
    priceLabel: "$19/mo",
    features: [
      "Lifetime film replacement",
      "Heat & fade guarantee",
      "Bubble & peel coverage",
      "Nationwide honor network",
    ],
  },
];
