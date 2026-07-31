import { Router } from 'express';
import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const streamUpload = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder || 'aditi-portfolio', resource_type: 'auto' },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

router.post('/image', protect, upload.single('image'), asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const result = await streamUpload(req.file.buffer, 'aditi-portfolio/images');
  res.json({ url: result.secure_url, publicId: result.public_id });
}));

router.post('/resume', protect, upload.single('resume'), asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const result = await streamUpload(req.file.buffer, 'aditi-portfolio/resume');
  res.json({ url: result.secure_url, publicId: result.public_id });
}));

export default router;
