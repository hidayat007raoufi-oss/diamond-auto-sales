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
      "Paint correction, ceramic coating, and interior restoration performed by certified specialists.",
    points: ["Multi-stage paint correction", "Ceramic & graphene coatings", "Interior deep restoration"],
    icon: "M12 3l2.5 5L20 9l-4 4 1 6-5-3-5 3 1-6L4 9l5.5-1L12 3z",
  },
  {
    id: "window-tint",
    name: "Window Tint",
    tagline: "Clarity, comfort, protection",
    description:
      "Premium ceramic films that reject heat and UV while preserving optical clarity — backed for life.",
    points: ["Ceramic IR-rejecting film", "99% UV protection", "Lifetime tint warranty"],
    icon: "M4 5h16v14H4zM4 5l16 14",
  },
  {
    id: "mechanic",
    name: "Mechanic Services",
    tagline: "Precision engineering",
    description:
      "Factory-grade diagnostics and service from technicians who treat performance as a discipline.",
    points: ["OEM-level diagnostics", "Performance servicing", "Transparent digital reports"],
    icon: "M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.3 2.3-2-2 2.3-2.3z",
  },
  {
    id: "tire",
    name: "Tire Services",
    tagline: "Grip, balance, longevity",
    description:
      "Performance tire fitment, hunter alignment, and road-force balancing for flawless contact.",
    points: ["Performance tire fitment", "Laser alignment", "Road-force balancing"],
    icon: "M12 12m-9 0a9 9 0 1018 0a9 9 0 10-18 0 M12 12m-3.5 0a3.5 3.5 0 107 0a3.5 3.5 0 10-7 0",
  },
  {
    id: "customization",
    name: "Vehicle Customization",
    tagline: "Built to your signature",
    description:
      "Wraps, wheels, lighting, and bespoke finishes engineered to make a vehicle unmistakably yours.",
    points: ["Color-change & PPF wraps", "Forged wheel programs", "Bespoke lighting & accents"],
    icon: "M12 2l3 6 6 1-4.5 4.2L18 20l-6-3.2L6 20l1.5-6.8L3 9l6-1 3-6z",
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);
