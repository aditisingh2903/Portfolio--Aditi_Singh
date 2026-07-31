import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
  label: String,
  url: String,
  icon: String,
}, { _id: false });

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Aditi Singh' },
  tagline: String,
  roles: { type: [String], default: [] },
  avatar: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  phone: String,
  email: String,
  location: String,
  summary: String,
  socials: { type: [socialSchema], default: [] },
  heroBackground: { type: String, default: '' },
  cpi: String,
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
