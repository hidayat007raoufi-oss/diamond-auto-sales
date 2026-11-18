type Service = {
  name: string;
  price: string;
  includes?: readonly string[];
};

type Category = {
  id: string;
  title: string;
  items: readonly Service[];
  note?: string;
  brands?: string;
};

export const servicePhone = {
  display: "(919) 987-6666",
  number: "+19199876666",
};

export const repairMenu: readonly Category[] = [
  {
    id: "oil-change",
    title: "Oil Change & Maintenance",
    items: [
      { name: "Conventional (up to 5 qts)", price: "$29.99" },
      { name: "Synthetic Blend (up to 5 qts)", price: "$39.99" },
      { name: "Full Synthetic (up to 5 qts)", price: "$49.99" },
      { name: "High Mileage (up to 5 qts)", price: "$44.99" },
      { name: "Additional Oil (per qt)", price: "$6.99" },
      { name: "Oil Filter Replacement", price: "$12.99" },
    ],
    note: "Free fluid check & top off with oil change",
  },
  {
    id: "brakes",
    title: "Brakes & Suspension",
    items: [
      { name: "Brake Pad Replacement (per axle)", price: "$119.99" },
      { name: "Brake Pads + Rotors (per axle)", price: "$179.99" },
      { name: "Brake Fluid Flush", price: "$79.99" },
      { name: "Power Steering Flush", price: "$79.99" },
      { name: "Suspension Inspection", price: "Free" },
      { name: "Brake Inspection", price: "Free" },
    ],
    note: "Free multi-point vehicle inspection",
  },
  {
    id: "engine",
    title: "Engine & Transmission",
    items: [
      { name: "Check Engine Light Diagnostic", price: "$59.99" },
      { name: "Advanced Diagnostic", price: "$89.99/hr" },
      { name: "Tune Up (Spark Plugs)", price: "$129.99" },
      { name: "Transmission Fluid Service", price: "$139.99" },
      { name: "Coolant Flush", price: "$89.99" },
      { name: "Fuel System Service", price: "$99.99" },
      { name: "All Major & Minor Repairs", price: "Ask" },
    ],
    note: "Free code scan with any service",
  },
  {
    id: "ac-electrical",
    title: "A/C & Electrical",
    items: [
      { name: "A/C System Check", price: "Free" },
      { name: "A/C Recharge (R134a)", price: "$119.99" },
      { name: "A/C Recharge (1234yf)", price: "$189.99" },
      { name: "Battery Testing", price: "Free" },
      { name: "Alternator Testing", price: "Free" },
      { name: "Starter Testing", price: "Free" },
    ],
  },
  {
    id: "tires",
    title: "Tires & Alignment",
    items: [
      { name: "Tire Rotation", price: "$19.99" },
      { name: "Wheel Alignment (4-wheel)", price: "$89.99" },
      { name: "Tire Patch/Repair", price: "$14.99" },
      { name: "New Tire Mount & Balance", price: "$24.99" },
      { name: "TPMS Service", price: "$29.99" },
    ],
  },
  {
    id: "tint",
    title: "Window Tint",
    items: [
      { name: "2 Front Windows (Carbon)", price: "$99.99" },
      { name: "2 Front Windows (Ceramic)", price: "$129.99" },
      { name: "Sides + Rear (Carbon)", price: "$199.99" },
      { name: "Sides + Rear (Ceramic)", price: "$299.99" },
      { name: "Full Windshield (Ceramic)", price: "$199.99" },
      { name: "Windshield Strip", price: "$59.99" },
      { name: "Tint Removal", price: "$99.99" },
    ],
    brands: "TINTX · 3M · XPEL · Avery Dennison",
  },
  {
    id: "wraps",
    title: "Wraps",
    items: [
      { name: "Full Wrap (Value Film)", price: "From $1,999" },
      { name: "Full Wrap (Premium Film)", price: "From $2,399" },
      { name: "Partial Wraps", price: "From $499" },
      { name: "Chrome Delete", price: "From $299" },
      { name: "Roof Wrap", price: "From $299" },
      { name: "Custom Designs", price: "Ask" },
    ],
    brands: "Premium films · 3M · Avery Dennison · KPMF · Inozetek",
  },
  {
    id: "body-paint",
    title: "Body & Paint",
    items: [
      { name: "Bumper Refinish", price: "From $249" },
      { name: "Fender Refinish", price: "From $199" },
      { name: "Door Refinish", price: "From $249" },
      { name: "Hood Refinish", price: "From $299" },
      { name: "Quarter Panel", price: "From $299" },
      { name: "Roof Refinish", price: "From $349" },
      { name: "Full Car Paint (Same Color)", price: "From $899" },
      { name: "Custom Color / Pearl", price: "Ask" },
    ],
    note: "Free estimates on all body work & collision repairs",
  },
  {
    id: "detailing",
    title: "Detailing",
    items: [
      {
        name: "Basic Wash",
        price: "$25.99",
        includes: ["Exterior Hand Wash", "Tire Shine", "Quick Interior Clean"],
      },
      {
        name: "Deluxe",
        price: "$59.99",
        includes: ["Exterior Wash & Wax", "Interior Vacuum", "Interior Wipe Down", "Tire Shine"],
      },
      {
        name: "Premium",
        price: "$149.99",
        includes: ["Deep Interior Cleaning", "Engine Bay Clean", "Paint Decontamination", "Ceramic Spray Sealant"],
      },
    ],
  },
];
