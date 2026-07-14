export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  tips?: string;
  icon: string; // Emoji or Lucide icon string
  category?: "travel" | "hotel" | "activity" | "dining" | "leisure";
}

export interface DayItinerary {
  dayNumber: number;
  dateStr: string; // e.g., "8/29 (토)"
  title: string; // e.g., "LA 레이오버"
  subtitle: string; // e.g., "라라랜드 로맨틱 데이"
  items: ItineraryItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: "essentials" | "dresscode" | "water" | "electronics";
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface WeatherData {
  city: string;
  temp: string;
  humidity: string;
  wind: string;
  sky: string;
  pop: string;
  icon: string;
  tip: string;
  forecast: { day: string; temp: string; sky: string }[];
}
