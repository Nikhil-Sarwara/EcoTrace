export type Category = 'transport' | 'energy' | 'food';

export interface Activity {
  id: string;
  category: Category;
  label: string; // e.g., "Commute to work"
  value: number; // calculated emission in kg
  date: string;
}

export interface Stat {
  label: string;
  value: string;
  trend: number; // percentage
  icon: string;
}