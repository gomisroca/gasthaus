export interface SpeisekarteItem {
  id: string;
  name: string;
  description: string;
  categories: string[];
  ingredients: string[];
  tags: string[];
  price: number;
  image: string | null;
  seasonal: boolean;
}
