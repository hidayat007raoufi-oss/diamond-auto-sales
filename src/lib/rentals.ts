export type RentalClass = {
  id: string;
  name: string;
  category: "Economy" | "Sedan" | "SUV" | "Luxury";
  tagline: string;
  examples: string;
  seats: number;
  bags: number;
  dailyFrom: number;
  weeklyFrom: number;
  features: string[];
  /** Cinematic gradient used behind the placeholder photo. */
  tone: string;
  /** Public image path — drop a real photo here to replace the placeholder. */
  image: string;
};

export const rentals: RentalClass[] = [
  {
    id: "economy",
    name: "Economy",
    category: "Economy",
    tagline: "Efficient, easy, affordable",
    examples: "Nissan Versa, Kia Rio or similar",
    seats: 5,
    bags: 2,
    dailyFrom: 39,
    weeklyFrom: 229,
    features: ["Great fuel economy", "Bluetooth & backup camera", "Easy to park", "Unlimited local miles"],
    tone: "radial-gradient(120% 120% at 50% 20%, #5b6068 0%, #20232a 55%, #0a0b0d 100%)",
    image: "/rentals/economy.jpg",
  },
  {
    id: "sedan",
    name: "Full-Size Sedan",
    category: "Sedan",
    tagline: "Comfort for the long drive",
    examples: "Toyota Camry, Honda Accord or similar",
    seats: 5,
    bags: 3,
    dailyFrom: 55,
    weeklyFrom: 329,
    features: ["Spacious & quiet cabin", "Apple CarPlay / Android Auto", "Adaptive cruise", "Ideal for business travel"],
    tone: "radial-gradient(120% 120% at 70% 20%, #3a3d44 0%, #16171b 55%, #0a0b0d 100%)",
    image: "/rentals/sedan.jpg",
  },
  {
    id: "suv",
    name: "SUV",
    category: "SUV",
    tagline: "Room for everyone",
    examples: "Toyota RAV4, Chevy Equinox or similar",
    seats: 5,
    bags: 4,
    dailyFrom: 69,
    weeklyFrom: 419,
    features: ["All-weather capability", "Generous cargo space", "Roof rails", "Great for road trips"],
    tone: "radial-gradient(120% 120% at 40% 20%, #2f3238 0%, #131418 55%, #08090b 100%)",
    image: "/rentals/suv.jpg",
  },
  {
    id: "luxury",
    name: "Luxury",
    category: "Luxury",
    tagline: "Arrive in something special",
    examples: "Mercedes-Benz E-Class, BMW 5 Series or similar",
    seats: 5,
    bags: 3,
    dailyFrom: 129,
    weeklyFrom: 799,
    features: ["Premium leather interior", "Advanced driver assistance", "Premium sound", "Perfect for events"],
    tone: "radial-gradient(120% 120% at 60% 18%, #383b42 0%, #161719 55%, #0a0b0d 100%)",
    image: "/rentals/luxury.jpg",
  },
];

export const rentalCategories = ["Economy", "Sedan", "SUV", "Luxury"] as const;

export const formatDaily = (n: number) => `$${n}/day`;
export const getRental = (id: string) => rentals.find((r) => r.id === id);
