export interface SpeisekarteItem {
  id: string;
  name: string;
  description: string;
  categories: string[];
  ingredients: string[];
  tags: string[];
  priceCents: number;
  image: string | null;
  seasonal: boolean;
  createdAt: string;
  updatedAt: string;
}
