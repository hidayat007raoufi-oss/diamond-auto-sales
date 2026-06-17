export type Vehicle = {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  mileage: number;
  bodyType: "Sedan" | "SUV" | "Truck" | "Coupe";
  drivetrain: "RWD" | "AWD" | "4WD";
  power: string; // e.g. "473 hp"
  zeroToSixty: string; // e.g. "3.9s"
  exterior: string;
  status: "Available" | "Reserved" | "Sold";
  featured: boolean;
  /** Optional real photo URL. When absent, a cinematic gradient is rendered. */
  image?: string;
  /** Ordered frames for a 360° spin viewer. When present, enables 360° view. */
  frames360?: string[];
  /** Cinematic gradient used for the presentation surface. */
  tone: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "porsche-911-carrera-s",
    make: "Porsche",
    model: "911",
    trim: "Carrera S",
    year: 2023,
    price: 134900,
    mileage: 6420,
    bodyType: "Coupe",
    drivetrain: "RWD",
    power: "443 hp",
    zeroToSixty: "3.5s",
    exterior: "GT Silver Metallic",
    status: "Available",
    featured: true,
    tone: "radial-gradient(120% 120% at 70% 20%, #3a3d44 0%, #16171b 55%, #0a0b0d 100%)",
  },
  {
    id: "mercedes-amg-gt-53",
    make: "Mercedes-AMG",
    model: "GT",
    trim: "53 4-Door",
    year: 2022,
    price: 98500,
    mileage: 14380,
    bodyType: "Coupe",
    drivetrain: "AWD",
    power: "429 hp",
    zeroToSixty: "4.4s",
    exterior: "Obsidian Black",
    status: "Available",
    featured: true,
    tone: "radial-gradient(120% 120% at 30% 15%, #2c2f36 0%, #131418 55%, #08090b 100%)",
  },
  {
    id: "bmw-m4-competition",
    make: "BMW",
    model: "M4",
    trim: "Competition xDrive",
    year: 2023,
    price: 86900,
    mileage: 8910,
    bodyType: "Coupe",
    drivetrain: "AWD",
    power: "503 hp",
    zeroToSixty: "3.4s",
    exterior: "Brooklyn Grey",
    status: "Reserved",
    featured: true,
    tone: "radial-gradient(120% 120% at 60% 25%, #34373e 0%, #15161a 55%, #090a0c 100%)",
  },
  {
    id: "range-rover-sport-autobiography",
    make: "Land Rover",
    model: "Range Rover Sport",
    trim: "Autobiography",
    year: 2023,
    price: 112400,
    mileage: 11250,
    bodyType: "SUV",
    drivetrain: "4WD",
    power: "523 hp",
    zeroToSixty: "4.3s",
    exterior: "Santorini Black",
    status: "Available",
    featured: true,
    tone: "radial-gradient(120% 120% at 40% 20%, #2f3238 0%, #131418 55%, #08090b 100%)",
  },
  {
    id: "audi-rs7-performance",
    make: "Audi",
    model: "RS7",
    trim: "Performance",
    year: 2022,
    price: 121900,
    mileage: 9870,
    bodyType: "Sedan",
    drivetrain: "AWD",
    power: "621 hp",
    zeroToSixty: "3.5s",
    exterior: "Daytona Gray",
    status: "Available",
    featured: true,
    tone: "radial-gradient(120% 120% at 65% 18%, #383b42 0%, #161719 55%, #0a0b0d 100%)",
  },
  {
    id: "tesla-model-s-plaid",
    make: "Tesla",
    model: "Model S",
    trim: "Plaid",
    year: 2023,
    price: 94900,
    mileage: 7640,
    bodyType: "Sedan",
    drivetrain: "AWD",
    power: "1,020 hp",
    zeroToSixty: "1.99s",
    exterior: "Solid Black",
    status: "Available",
    featured: true,
    tone: "radial-gradient(120% 120% at 35% 20%, #2a2d33 0%, #121316 55%, #08090a 100%)",
  },
  {
    id: "lexus-lc-500",
    make: "Lexus",
    model: "LC",
    trim: "500",
    year: 2022,
    price: 88200,
    mileage: 12030,
    bodyType: "Coupe",
    drivetrain: "RWD",
    power: "471 hp",
    zeroToSixty: "4.4s",
    exterior: "Atomic Silver",
    status: "Sold",
    featured: false,
    tone: "radial-gradient(120% 120% at 55% 22%, #36393f 0%, #15161a 55%, #090a0c 100%)",
  },
  {
    id: "cadillac-escalade-v",
    make: "Cadillac",
    model: "Escalade-V",
    trim: "Super Cruise",
    year: 2023,
    price: 149500,
    mileage: 5410,
    bodyType: "SUV",
    drivetrain: "4WD",
    power: "682 hp",
    zeroToSixty: "4.4s",
    exterior: "Black Raven",
    status: "Available",
    featured: false,
    tone: "radial-gradient(120% 120% at 45% 18%, #2d3036 0%, #131417 55%, #08090b 100%)",
  },
];

/**
 * Real automotive photography (Unsplash). These load in the browser / on
 * Vercel. Swap any entry for your own inventory photos — the card and hero
 * fall back to the cinematic gradient if a URL is ever unavailable.
 */
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HERO_IMAGE = U("1544636331-e26879cd4d9b", 1600);

const images: Record<string, string> = {
  "porsche-911-carrera-s": U("1503376780353-7e6692767b70"),
  "mercedes-amg-gt-53": U("1617814076367-b759c7d7e738"),
  "bmw-m4-competition": U("1555215695-3004980ad54e"),
  "range-rover-sport-autobiography": U("1606664515524-ed2f786a0bd6"),
  "audi-rs7-performance": U("1606152421802-db97b9c7a11b"),
  "tesla-model-s-plaid": U("1560958089-b8a1929cea89"),
  "lexus-lc-500": U("1614200179396-2bdb77ebf81b"),
  "cadillac-escalade-v": U("1519641471654-76ce0107ad1b"),
};

export const vehicleImage = (id: string) => images[id];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatMileage = (value: number) =>
  `${new Intl.NumberFormat("en-US").format(value)} mi`;

/** Rough est. monthly payment: 72mo, ~6.4% APR, $5k down. Estimate only. */
export const estMonthly = (price: number) => {
  const principal = Math.max(price - 5000, 0);
  const r = 0.064 / 12;
  const n = 72;
  const m = (principal * r) / (1 - Math.pow(1 + r, -n));
  return `$${Math.round(m / 5) * 5}/mo`;
};

export const getVehicle = (id: string) => vehicles.find((v) => v.id === id);
export const featuredVehicles = () => vehicles.filter((v) => v.featured);
