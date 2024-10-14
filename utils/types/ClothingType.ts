export default interface UploadClothing {
  file: string;
}

export interface UploadClothingWithImageLink {
  image_url: string;
  user_id: string;
  closet_id: string;
}
