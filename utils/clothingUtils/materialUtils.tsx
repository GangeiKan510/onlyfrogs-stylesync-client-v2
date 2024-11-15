import { MATERIAL_LIST } from "@/components/constants/clothing-details/material";

const getMaterialSvg = (materialName: string) => {
  const material = MATERIAL_LIST.find(
    (mat) => mat.name.toLowerCase() === materialName.toLowerCase()
  );
  return material ? material.reference : null;
};

export default getMaterialSvg;