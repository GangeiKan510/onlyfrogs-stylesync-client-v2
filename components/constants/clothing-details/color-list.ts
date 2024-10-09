interface Color {
  name: string;      // The name of the color
  colorCode: string; // The hexadecimal color code (consider validating this format)
}

// Directly declare COLOR_LIST as an array of Color
export const COLOR_LIST: Color[] = [
  { name: "White", colorCode: "#FFFFFF" },
  { name: "Cream", colorCode: "#FFFDD0" },
  { name: "Beige", colorCode: "#E2C79C" },
  { name: "Light-Gray", colorCode: "#E4E2E2" },
  { name: "Dark-Gray", colorCode: "#B0B0B0" },
  { name: "Black", colorCode: "#000000" },
  { name: "Light-Pink", colorCode: "#FFEEEE" },
  { name: "Yellow", colorCode: "#FFFF00" },
  { name: "Light-Green", colorCode: "#C5DB88" },
  { name: "Torquoise", colorCode: "#6BF1D8" },
  { name: "Light-Blue", colorCode: "#C5E3FF" },
  { name: "Light-Purple", colorCode: "#D7BEF5" },
  { name: "Silver", colorCode: "#C0C0C0" },
  { name: "Pink", colorCode: "#FFC0CB" },
  { name: "Coral", colorCode: "#FF7F50" },
  { name: "Orange", colorCode: "#FFA500" },
  { name: "Green", colorCode: "#008000" },
  { name: "Blue", colorCode: "#0000FF" },
  { name: "Purple", colorCode: "#800080" },
  { name: "Red", colorCode: "#FF0000" },
  { name: "Camel", colorCode: "#C19A6B" },
  { name: "Brown", colorCode: "#A52A2A" },
  { name: "Khaki", colorCode: "#F0E68C" },
  { name: "Navy", colorCode: "#000080" },
  { name: "Wine", colorCode: "#9E213F" },
  { name: "Gold", colorCode: "#FFD700" },
];
