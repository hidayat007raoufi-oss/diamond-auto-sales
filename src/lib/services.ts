export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  points: string[];
  /** Inline SVG path data drawn on a 24x24 viewBox. */
  icon: string;
};

export const services: Service[] = [
  {
    id: "detailing",
    name: "Detailing",
    tagline: "Concours-level finish",
    description:
      "Correction, coatings, and interior restoration performed by certified specialists for a factory-plus finish.",
    points: [
      "Paint correction",
      "Ceramic coating",
      "Graphene coating",
      "Interior deep cleaning",
      "Leather treatment",
      "Engine bay detail",
      "Maintenance wash plans",
    ],
    icon: "M12 3l2.5 5L20 9l-4 4 1 6-5-3-5 3 1-6L4 9l5.5-1L12 3z",
  },
  {
    id: "window-tint",
    name: "Window Tint",
    tagline: "Clarity, comfort, protection",
    description:
      "Premium ceramic films that reject heat and UV while preserving optical clarity — installed to legal spec.",
    points: [
      "Ceramic tint",
      "Privacy tint",
      "Heat rejection",
      "UV protection",
      "Windshield strip",
      "Legal shade guidance",
    ],
    icon: "M4 5h16v14H4zM4 5l16 14",
  },
  {
    id: "mechanic",
    name: "Mechanic Services",
    tagline: "Precision engineering",
    description:
      "Factory-grade diagnostics and repair from technicians who treat performance and reliability as a discipline.",
    points: [
      "Diagnostics",
      "Brakes",
      "Suspension",
      "Oil service",
      "Battery testing",
      "Pre-purchase inspection",
      "General repairs",
    ],
    icon: "M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.3 2.3-2-2 2.3-2.3z",
  },
  {
    id: "tire",
    name: "Tire Services",
    tagline: "Grip, balance, longevity",
    description:
      "Performance tire fitment, balancing, and wheel packages for flawless contact with the road.",
    points: [
      "Tire installation",
      "Balancing",
      "Rotation",
      "Pressure checks",
      "Performance tires",
      "Wheel packages",
    ],
    icon: "M12 12m-9 0a9 9 0 1018 0a9 9 0 10-18 0 M12 12m-3.5 0a3.5 3.5 0 107 0a3.5 3.5 0 10-7 0",
  },
  {
    id: "customization",
    name: "Vehicle Customization",
    tagline: "Built to your signature",
    description:
      "Wheels, suspension, exhaust, lighting, wraps, and aero — engineered to make a vehicle unmistakably yours.",
    points: [
      "Wheels",
      "Suspension",
      "Exhaust",
      "Lighting",
      "Wraps",
      "Aero parts",
      "Performance styling",
    ],
    icon: "M12 2l3 6 6 1-4.5 4.2L18 20l-6-3.2L6 20l1.5-6.8L3 9l6-1 3-6z",
  },
  {
    id: "protection",
    name: "Vehicle Protection",
    tagline: "Value, preserved",
    description:
      "Coverage and care plans that protect your investment long after you drive off the lot.",
    points: [
      "Extended service contracts",
      "GAP protection",
      "Wheel & tire protection",
      "Ceramic coating",
      "Interior protection",
      "Maintenance packages",
    ],
    icon: "M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z",
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);
