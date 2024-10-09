import Cotton from '../../../assets/images/materials/Cotton.svg';
import Polyester from '../../../assets/images/materials/Polyester.svg';
import Nylon from '../../../assets/images/materials/Nylon.svg';
import Denim from '../../../assets/images/materials/Denim.svg';
import Leather from '../../../assets/images/materials/Leather.svg';
import Wool from '../../../assets/images/materials/Wool.svg';
import Linen from '../../../assets/images/materials/Linen.svg';
import Acrylic from '../../../assets/images/materials/Acrylic.svg';
import Silk from '../../../assets/images/materials/Silk.svg';
import Rayon from '../../../assets/images/materials/Rayon.svg';
import Viscose from '../../../assets/images/materials/Viscose.svg';
import Tweed from '../../../assets/images/materials/Tweed.svg';
import Velvet from '../../../assets/images/materials/Velvet.svg';
import Chiffon from '../../../assets/images/materials/Chiffon.svg';
import Suede from '../../../assets/images/materials/Suede.svg';
import Corduroy from '../../../assets/images/materials/Corduroy.svg';
import Lace from '../../../assets/images/materials/Lace.svg';
import Fur from '../../../assets/images/materials/Fur.svg';
import Lyocell from '../../../assets/images/materials/Lyocell.svg';
import Cashmere from '../../../assets/images/materials/Cashmere.svg';
import Mohair from '../../../assets/images/materials/Mohair.svg';
import Angora from '../../../assets/images/materials/Angora.svg';
import OtherMaterials from '../../../assets/images/materials/OtherMaterials.svg';
import { SvgProps } from 'react-native-svg';
  
interface Material {
  name: string;
  reference: React.FC<SvgProps>; 
  description: string;
}

export const MATERIAL_LIST: Material[] = [
  { name: "Cotton", reference: Cotton, description: "Soft, breathable, and widely used fabric." },
  { name: "Polyester", reference: Polyester, description: "Durable, wrinkle-resistant, and quick-drying fabric." },
  { name: "Nylon", reference: Nylon, description: "Strong, lightweight, and elastic synthetic material." },
  { name: "Denim", reference: Denim, description: "Durable cotton fabric used in jeans and jackets." },
  { name: "Leather", reference: Leather, description: "Tough, flexible material made from animal hides." },
  { name: "Wool", reference: Wool, description: "Warm, soft material typically used in winter clothing." },
  { name: "Linen", reference: Linen, description: "Lightweight, breathable fabric made from flax fibers." },
  { name: "Acrylic", reference: Acrylic, description: "Synthetic wool-like fabric, often used in knitwear." },
  { name: "Silk", reference: Silk, description: "Smooth, luxurious fabric made from silkworms." },
  { name: "Rayon", reference: Rayon, description: "Soft, smooth material that drapes well, made from cellulose." },
  { name: "Viscose", reference: Viscose, description: "Silk-like fabric with good draping, often used in dresses." },
  { name: "Tweed", reference: Tweed, description: "Rough, woolen fabric, popular for jackets and suits." },
  { name: "Velvet", reference: Velvet, description: "Soft, dense fabric with a smooth feel, often used in evening wear." },
  { name: "Chiffon", reference: Chiffon, description: "Lightweight, sheer fabric commonly used in formal wear." },
  { name: "Suede", reference: Suede, description: "Soft, textured leather, often used in shoes and jackets." },
  { name: "Corduroy", reference: Corduroy, description: "Thick, ridged fabric, often used in pants and jackets." },
  { name: "Lace", reference: Lace, description: "Delicate, open-weave fabric, often used in formal attire." },
  { name: "Fur", reference: Fur, description: "Thick, soft material made from animal pelts." },
  { name: "Lyocell", reference: Lyocell, description: "Eco-friendly, breathable fabric made from wood pulp." },
  { name: "Cashmere", reference: Cashmere, description: "Luxurious, soft wool from cashmere goats." },
  { name: "Mohair", reference: Mohair, description: "Silky, durable fiber made from the hair of angora goats." },
  { name: "Angora", reference: Angora, description: "Soft, fluffy material from angora rabbits, often used in knitwear." },
  { name: "Other Materials", reference: OtherMaterials, description: "Various other materials used in clothing production." }
];
