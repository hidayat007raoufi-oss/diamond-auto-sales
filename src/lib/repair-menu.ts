type ServiceMenu = {
  id: string;
  title: string;
  items: ReadonlyArray<readonly [name: string, price: string]>;
  note?: string;
};

export const repairMenu: ServiceMenu[] = [
  {
    id: "oil",
    title: "Oil Change & Maintenance",
    items: [
      ["Conventional (up to 5 qts)", "$29.99"],
      ["Synthetic Blend (up to 5 qts)", "$39.99"],
      ["Full Synthetic (up to 5 qts)", "$49.99"],
      ["High Mileage (up to 5 qts)", "$44.99"],
      ["Additional Oil (per qt)", "$6.99"],
      ["Oil Filter Replacement", "$12.99"],
    ],
    note: "Free fluid check and top-off with an oil change.",
  },
  {
    id: "brakes",
    title: "Brakes & Suspension",
    items: [
      ["Brake Pad Replacement (per axle)", "$119.99"],
      ["Brake Pads + Rotors (per axle)", "$179.99"],
      ["Brake Fluid Flush", "$79.99"],
      ["Power Steering Flush", "$79.99"],
      ["Suspension Inspection", "Free"],
      ["Brake Inspection", "Free"],
    ],
    note: "Free multi-point vehicle inspection.",
  },
  {
    id: "engine",
    title: "Engine & Transmission",
    items: [
      ["Check Engine Light Diagnostic", "$59.99"],
      ["Advanced Diagnostic", "$89.99/hr"],
      ["Tune Up (Spark Plugs)", "$129.99"],
      ["Transmission Fluid Service", "$139.99"],
      ["Coolant Flush", "$89.99"],
      ["Fuel System Service", "$99.99"],
      ["All Major & Minor Repairs", "Ask for a quote"],
    ],
    note: "Free code scan with any service.",
  },
  {
    id: "ac",
    title: "A/C & Electrical",
    items: [
      ["A/C System Check", "Free"],
      ["A/C Recharge (R134a)", "$119.99"],
      ["A/C Recharge (1234yf)", "$189.99"],
      ["Battery Testing", "Free"],
      ["Alternator Testing", "Free"],
      ["Starter Testing", "Free"],
    ],
  },
  {
    id: "tires",
    title: "Tires & Alignment",
    items: [
      ["Tire Rotation", "$19.99"],
      ["Wheel Alignment (4-wheel)", "$89.99"],
      ["Tire Patch/Repair", "$14.99"],
      ["New Tire Mount & Balance", "$24.99"],
      ["TPMS Service", "$29.99"],
    ],
  },
];

export const customizationMenu: ServiceMenu[] = [
  {
    id: "tint",
    title: "Window Tint",
    items: [
      ["2 Front Windows (Carbon)", "$99.99"],
      ["2 Front Windows (Ceramic)", "$129.99"],
      ["Sides + Rear (Carbon)", "$199.99"],
      ["Sides + Rear (Ceramic)", "$299.99"],
      ["Full Windshield (Ceramic)", "$199.99"],
      ["Windshield Strip", "$59.99"],
      ["Tint Removal", "$99.99"],
    ],
  },
  {
    id: "wraps",
    title: "Wraps",
    items: [
      ["Full Wrap (Value Film)", "From $1,999"],
      ["Full Wrap (Premium Film)", "From $2,399"],
      ["Partial Wraps", "From $499"],
      ["Chrome Delete", "From $299"],
      ["Roof Wrap", "From $299"],
      ["Custom Designs", "Ask for a quote"],
    ],
  },
  {
    id: "body",
    title: "Body & Paint",
    items: [
      ["Bumper Refinish", "From $249"],
      ["Fender Refinish", "From $199"],
      ["Door Refinish", "From $249"],
      ["Hood Refinish", "From $299"],
      ["Quarter Panel", "From $299"],
      ["Roof Refinish", "From $349"],
      ["Full Car Paint (Same Color)", "From $899"],
      ["Custom Color / Pearl", "Ask for a quote"],
    ],
    note: "Free estimates on bodywork and collision repairs.",
  },
];

export const detailingMenu = [
  {
    name: "Basic Wash",
    price: "$25.99",
    items: ["Exterior hand wash", "Tire shine", "Quick interior clean"],
  },
  {
    name: "Deluxe",
    price: "$59.99",
    items: ["Exterior wash & wax", "Interior vacuum", "Interior wipe-down", "Tire shine"],
  },
  {
    name: "Premium",
    price: "$149.99",
    items: ["Deep interior cleaning", "Engine bay clean", "Paint decontamination", "Ceramic spray sealant"],
  },
];

export type { ServiceMenu };
