export type UpdateClothingData = {
  id: string | null;
  name: string;
  brand: string;
  season: string[];
  occasion: string[];
  category: {
    name: string | null;
    type: string | null;
  };
  color: string | null;
  material: string | null;
  pattern: string | null;
};
