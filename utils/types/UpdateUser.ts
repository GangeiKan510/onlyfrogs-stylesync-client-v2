export interface UpdateUserData {
  id: string;
  birth_date?: string;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  location?: {
    name: string;
    lat: string;
    lon: string;
  } | null;
  skin_tone_classification?: string;
  season?: string;
  sub_season?: string;
  skin_tone_complements?: string[];
  body_type?: string;
  preferred_style?: string[];
  favorite_colors?: string[];
  preferred_brands?: string[];
  budget_min?: number;
  budget_max?: number;
}

export interface PersonalInfo {
  gender: string;
  birthday: string;
  height_cm: number;
  weight_kg: number;
  location: {
    name: string;
    lat: string;
    lon: string;
  } | null;
}

export interface SkinToneAnalysisResult {
  skin_tone: string;
  season: string;
  sub_season: string;
  complements: string[];
}

export interface Preferences {
  preferred_style: string[];
  favorite_colors: string[];
  preferred_brands: string[];
  budget_range: {
    min: number;
    max: number;
  };
}

export interface UpdateUserName {
  id: string;
  first_name: string;
  last_name: string;
}

export interface UpdatePersonalInformationData {
  id: string;
  birth_date: string;
  gender: string;
  height: number;
  weight: number;
}

export interface UpdateUserBodyType {
  id: string;
  body_type: string;
}

export interface UpdateUserSkinToneDetailsData {
  id: string;
  skin_tone_classification: string;
  skin_tone_complements: string[];
  season: string;
  sub_season: string;
}

export interface UpdateUserPreferencesAndBudgetData {
  id: string;
  brands: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  favoriteColors: string[];
  styles: string[];
}
