import About from '../models/About.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAbout = asyncHandler(async (req, res) => {
  const about = (await About.findOne()) || (await About.create({}));
  res.json(about);
});

export const updateAbout = asyncHandler(async (req, res) => {
  let body = { ...req.body };
  ['paragraphs', 'highlights', 'stats'].forEach((f) => {
    if (typeof body[f] === 'string') {
      try { body[f] = JSON.parse(body[f]); } catch {}
    }
  });
  const about = await About.findOneAndUpdate({}, body, { new: true, upsert: true, runValidators: true });
  res.json(about);
});
