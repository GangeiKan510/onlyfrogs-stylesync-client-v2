
const getColorHexCode = (colorName: string, COLOR_LIST: { name: string; colorCode: string; }[]): string | undefined => {
  const color = COLOR_LIST.find(
    (c) => c.name.toLowerCase() === colorName.toLowerCase()
  );
  return color ? color.colorCode : undefined;
};

export default getColorHexCode;