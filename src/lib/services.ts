export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  benefit: string;
  priceFrom: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "detailing",
    name: "Detailing",
    tagline: "Concours-level finish",
    description:
      "Multi-stage correction, coatings, and interior restoration by certified specialists.",
    benefit: "A showroom finish that protects your paint for years.",
    priceFrom: "From $199",
    points: ["Paint correction", "Interior deep cleaning", "Leather treatment", "Engine bay detail", "Maintenance wash plans"],
  },
  {
    id: "window-tint",
    name: "Window Tint",
    tagline: "Clarity, comfort, protection",
    description: "Premium ceramic films that reject heat and UV while preserving optical clarity.",
    benefit: "A cooler cabin, UV protection, and privacy — backed for life.",
    priceFrom: "From $249",
    points: ["Ceramic & privacy tint", "Heat rejection", "99% UV protection", "Windshield strip", "Legal shade guidance"],
  },
  {
    id: "ceramic",
    name: "Ceramic Coating",
    tagline: "Liquid glass protection",
    description: "Ceramic and graphene coatings that lock in gloss and repel water, grime, and contaminants.",
    benefit: "Years of effortless cleaning and a permanent deep shine.",
    priceFrom: "From $699",
    points: ["Ceramic coating", "Graphene coating", "Hydrophobic finish", "Multi-year warranty", "Annual refresh"],
  },
  {
    id: "mechanic",
    name: "Mechanical Services",
    tagline: "Precision engineering",
    description: "Factory-grade diagnostics and repair from technicians who treat reliability as a discipline.",
    benefit: "Dealer-level repair without the dealer markup.",
    priceFrom: "From $89 diagnostic",
    points: ["OEM diagnostics", "Brakes & suspension", "Oil & fluid service", "Battery testing", "Pre-purchase inspection"],
  },
  {
    id: "tire",
    name: "Tire Services",
    tagline: "Grip, balance, longevity",
    description: "Performance tire fitment, balancing, alignment, and wheel packages.",
    benefit: "Confident grip and a noticeably smoother ride.",
    priceFrom: "From $25 / tire",
    points: ["Tire installation", "Road-force balancing", "Alignment", "Performance tires", "Wheel packages"],
  },
  {
    id: "customization",
    name: "Vehicle Customization",
    tagline: "Built to your signature",
    description: "Wraps, wheels, lighting, and bespoke finishes engineered to make a vehicle unmistakably yours.",
    benefit: "A build that turns heads and stays true to you.",
    priceFrom: "Quote-based",
    points: ["Color-change & PPF wraps", "Forged wheels", "Lighting & accents", "Aero parts", "Audio"],
  },
  {
    id: "performance",
    name: "Performance Upgrades",
    tagline: "Engineered for more",
    description: "Suspension, exhaust, intake, and tuning for drivers who want more than transportation.",
    benefit: "Real, dialed-in gains in power, sound, and handling.",
    priceFrom: "Quote-based",
    points: ["Suspension", "Exhaust systems", "Intakes & tuning", "Big-brake kits", "Stage builds"],
  },
  {
    id: "protection",
    name: "Vehicle Protection",
    tagline: "Value, preserved",
    description: "Coverage and care plans that protect your investment long after you drive off the lot.",
    benefit: "Drive worry-free and protect your resale value.",
    priceFrom: "Plan-based",
    points: ["Extended service contracts", "GAP protection", "Wheel & tire coverage", "Interior protection", "Maintenance packages"],
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);
