import { PATTERN_LIST } from "@/components/constants/clothing-details/pattern";

const getPatternSvg = (patternName: string) => {
  const pattern = PATTERN_LIST.find(
    (pat) => pat.name.toLowerCase() === patternName.toLowerCase()
  );
  return pattern ? pattern.reference : null;
};

export default getPatternSvg;