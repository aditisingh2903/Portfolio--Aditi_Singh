import Profile from '../models/Profile.js';
import { asyncHandler } from '../utils/asyncHandler.js';
export const getContact = asyncHandler(async (req, res) => {
  const p = (await Profile.findOne()) || {};
  res.json({ phone: p.phone, email: p.email, location: p.location, socials: p.socials || [] });
});
