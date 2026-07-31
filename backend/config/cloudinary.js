import { v2 as cloudinary } from 'cloudinary';

let configured = false;
function ensureConfigured() {
  if (configured) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  configured = true;
}

// Proxy so existing `import cloudinary from '...cloudinary.js'` keeps working,
// but configuration happens lazily on first call (after dotenv has loaded).
export default new Proxy(cloudinary, {
  get(target, prop) {
    ensureConfigured();
    const value = target[prop];
    return typeof value === 'function' ? value.bind(target) : value;
  },
});
