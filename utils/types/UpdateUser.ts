export interface UpdateUserData {
  id: string;
  birth_date?: string;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  location?: string;
  skin_tone_classification?: string;
  season?: string;
  sub_season?: string;
  skin_tone_complements?: string[];
  body_type?: string;
  preferred_style?: string[];
  favourite_colors?: string[];
  preferred_brands?: string[];
  budget_min?: number;
  budget_max?: number;
}
