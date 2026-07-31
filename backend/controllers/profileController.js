import Profile from '../models/Profile.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProfile = asyncHandler(async (req, res) => {
  const profile = (await Profile.findOne()) || (await Profile.create({}));
  res.json(profile);
});

export const updateProfile = asyncHandler(async (req, res) => {
  let body = { ...req.body };
  ['roles', 'socials', 'highlights', 'stats'].forEach((f) => {
    if (typeof body[f] === 'string') {
      try { body[f] = JSON.parse(body[f]); } catch {}
    }
  });
  const profile = await Profile.findOneAndUpdate({}, body, { new: true, upsert: true, runValidators: true });
  res.json(profile);
});
