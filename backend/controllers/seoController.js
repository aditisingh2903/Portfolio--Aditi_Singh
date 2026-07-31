import Seo from '../models/Seo.js';
import { asyncHandler } from '../utils/asyncHandler.js';
export const getSeo = asyncHandler(async (req, res) => {
  const seo = (await Seo.findOne()) || (await Seo.create({}));
  res.json(seo);
});
export const updateSeo = asyncHandler(async (req, res) => {
  let body = { ...req.body };
  ['keywords'].forEach((f) => {
    if (typeof body[f] === 'string') { try { body[f] = JSON.parse(body[f]); } catch {} }
  });
  const seo = await Seo.findOneAndUpdate({}, body, { new: true, upsert: true, runValidators: true });
  res.json(seo);
});
