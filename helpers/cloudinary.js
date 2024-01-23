import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINART_API_KEY, CLOUDINART_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINART_API_KEY,
  api_secret: CLOUDINART_API_SECRET,
});

export default cloudinary;
