export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyType: "Sedan" | "SUV" | "Truck" | "Coupe" | "Hatchback" | "Van";
  fuel: "Gas" | "Hybrid" | "Electric" | "Diesel";
  transmission: "Automatic" | "Manual";
  drivetrain: "FWD" | "RWD" | "AWD" | "4WD";
  exteriorColor: string;
  status: "Available" | "Pending" | "Sold";
  featured: boolean;
  /** Tailwind gradient used as a photo placeholder until real images are added. */
  accent: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "2022-toyota-camry-se",
    make: "Toyota",
    model: "Camry SE",
    year: 2022,
    price: 26995,
    mileage: 18450,
    bodyType: "Sedan",
    fuel: "Gas",
    transmission: "Automatic",
    drivetrain: "FWD",
    exteriorColor: "Celestial Silver",
    status: "Available",
    featured: true,
    accent: "from-slate-500 to-slate-700",
  },
  {
    id: "2021-honda-crv-ex",
    make: "Honda",
    model: "CR-V EX",
    year: 2021,
    price: 28490,
    mileage: 31200,
    bodyType: "SUV",
    fuel: "Gas",
    transmission: "Automatic",
    drivetrain: "AWD",
    exteriorColor: "Modern Steel",
    status: "Available",
    featured: true,
    accent: "from-zinc-600 to-zinc-800",
  },
  {
    id: "2023-ford-f150-xlt",
    make: "Ford",
    model: "F-150 XLT",
    year: 2023,
    price: 42750,
    mileage: 12980,
    bodyType: "Truck",
    fuel: "Gas",
    transmission: "Automatic",
    drivetrain: "4WD",
    exteriorColor: "Oxford White",
    status: "Available",
    featured: true,
    accent: "from-blue-700 to-blue-900",
  },
  {
    id: "2022-tesla-model3",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 33990,
    mileage: 22150,
    bodyType: "Sedan",
    fuel: "Electric",
    transmission: "Automatic",
    drivetrain: "RWD",
    exteriorColor: "Pearl White",
    status: "Pending",
    featured: false,
    accent: "from-red-600 to-red-800",
  },
  {
    id: "2020-jeep-wrangler",
    make: "Jeep",
    model: "Wrangler Sport",
    year: 2020,
    price: 31200,
    mileage: 38600,
    bodyType: "SUV",
    fuel: "Gas",
    transmission: "Manual",
    drivetrain: "4WD",
    exteriorColor: "Firecracker Red",
    status: "Available",
    featured: false,
    accent: "from-amber-600 to-orange-800",
  },
  {
    id: "2021-bmw-330i",
    make: "BMW",
    model: "330i",
    year: 2021,
    price: 35900,
    mileage: 27400,
    bodyType: "Sedan",
    fuel: "Gas",
    transmission: "Automatic",
    drivetrain: "RWD",
    exteriorColor: "Alpine White",
    status: "Available",
    featured: true,
    accent: "from-sky-700 to-indigo-900",
  },
  {
    id: "2023-toyota-rav4-hybrid",
    make: "Toyota",
    model: "RAV4 Hybrid",
    year: 2023,
    price: 34490,
    mileage: 9800,
    bodyType: "SUV",
    fuel: "Hybrid",
    transmission: "Automatic",
    drivetrain: "AWD",
    exteriorColor: "Magnetic Gray",
    status: "Available",
    featured: false,
    accent: "from-emerald-600 to-teal-800",
  },
  {
    id: "2019-chevrolet-silverado",
    make: "Chevrolet",
    model: "Silverado 1500 LT",
    year: 2019,
    price: 29995,
    mileage: 54300,
    bodyType: "Truck",
    fuel: "Gas",
    transmission: "Automatic",
    drivetrain: "4WD",
    exteriorColor: "Black",
    status: "Sold",
    featured: false,
    accent: "from-neutral-700 to-neutral-900",
  },
  {
    id: "2022-mazda-cx5",
    make: "Mazda",
    model: "CX-5 Touring",
    year: 2022,
    price: 27800,
    mileage: 21100,
    bodyType: "SUV",
    fuel: "Gas",
    transmission: "Automatic",
    drivetrain: "AWD",
    exteriorColor: "Soul Red Crystal",
    status: "Available",
    featured: false,
    accent: "from-rose-600 to-red-900",
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatMileage = (value: number) =>
  `${new Intl.NumberFormat("en-US").format(value)} mi`;

export const getVehicle = (id: string) => vehicles.find((v) => v.id === id);

export const featuredVehicles = () => vehicles.filter((v) => v.featured);
