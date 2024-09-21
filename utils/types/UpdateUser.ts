export interface UpdateUserData {
  id: string;
  birth_date?: string;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  location?: string | null;
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

export interface PersonalInfo {
  gender: string;
  birthday: string;
  height_cm: number;
  weight_kg: number;
  location: string | null;
}

export interface SkinToneAnalysisResult {
  skin_tone: string;
  season: string;
  sub_season: string;
  complements: string[];
}

export interface Preferences {
  preferred_style: string[];
  favourite_colors: string[];
  preferred_brands: string[];
  budget_range: {
    min: number;
    max: number;
  };
}
