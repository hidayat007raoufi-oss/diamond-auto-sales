type ServiceSection = {
  id: string;
  title: string;
  prices: readonly (readonly [string, string])[];
  note?: string;
};

export const serviceMenu: readonly ServiceSection[] = [
  {
    id: "maintenance", title: "Oil Change & Maintenance",
    prices: [
      ["Conventional oil change (up to 5 qt)", "$29.99"],
      ["Synthetic blend oil change (up to 5 qt)", "$39.99"],
      ["Full synthetic oil change (up to 5 qt)", "$49.99"],
      ["High-mileage oil change (up to 5 qt)", "$44.99"],
      ["Additional oil (per qt)", "$6.99"],
      ["Oil filter replacement", "$12.99"],
    ],
    note: "Free fluid check and top-off with an oil change.",
  },
  {
    id: "brakes", title: "Brakes & Suspension",
    prices: [
      ["Brake pad replacement (per axle)", "$119.99"],
      ["Brake pads and rotors (per axle)", "$179.99"],
      ["Brake fluid flush", "$79.99"], ["Power steering flush", "$79.99"],
      ["Suspension inspection", "Free"], ["Brake inspection", "Free"],
    ],
    note: "Free multi-point vehicle inspection.",
  },
  {
    id: "engine", title: "Engine & Transmission",
    prices: [
      ["Check engine light diagnostic", "$59.99"], ["Advanced diagnostic", "$89.99/hr"],
      ["Tune-up (spark plugs)", "$129.99"], ["Transmission fluid service", "$139.99"],
      ["Coolant flush", "$89.99"], ["Fuel system service", "$99.99"],
      ["Major and minor repairs", "Get a quote"],
    ],
    note: "Free code scan with any service.",
  },
  {
    id: "ac-electrical", title: "A/C & Electrical",
    prices: [
      ["A/C system check", "Free"], ["A/C recharge (R134a)", "$119.99"],
      ["A/C recharge (1234yf)", "$189.99"], ["Battery testing", "Free"],
      ["Alternator testing", "Free"], ["Starter testing", "Free"],
    ],
  },
  {
    id: "tires", title: "Tires & Alignment",
    prices: [
      ["Tire rotation", "$19.99"], ["Four-wheel alignment", "$89.99"],
      ["Tire patch or repair", "$14.99"], ["New tire mount and balance", "$24.99"],
      ["TPMS service", "$29.99"],
    ],
  },
  {
    id: "tint", title: "Window Tint",
    prices: [
      ["Two front windows (carbon)", "$99.99"], ["Two front windows (ceramic)", "$129.99"],
      ["Sides and rear (carbon)", "$199.99"], ["Sides and rear (ceramic)", "$299.99"],
      ["Full windshield (ceramic)", "$199.99"], ["Windshield strip", "$59.99"],
      ["Tint removal", "$99.99"],
    ],
  },
  {
    id: "wraps", title: "Wraps",
    prices: [
      ["Full wrap (value film)", "From $1,999"], ["Full wrap (premium film)", "From $2,399"],
      ["Partial wrap", "From $499"], ["Chrome delete", "From $299"],
      ["Roof wrap", "From $299"], ["Custom designs", "Get a quote"],
    ],
  },
  {
    id: "body-paint", title: "Body & Paint",
    prices: [
      ["Bumper refinish", "From $249"], ["Fender refinish", "From $199"],
      ["Door refinish", "From $249"], ["Hood refinish", "From $299"],
      ["Quarter panel refinish", "From $299"], ["Roof refinish", "From $349"],
      ["Full car paint (same color)", "From $899"], ["Custom color or pearl", "Get a quote"],
    ],
    note: "Free estimates on body work and collision repairs.",
  },
  {
    id: "detailing", title: "Detailing",
    prices: [
      ["Basic wash · Hand wash, tire shine, quick interior clean", "$25.99"],
      ["Deluxe · Wash and wax, vacuum, interior wipe-down, tire shine", "$59.99"],
      ["Premium · Deep interior clean, engine bay clean, paint decontamination, ceramic spray sealant", "$149.99"],
    ],
  },
];
