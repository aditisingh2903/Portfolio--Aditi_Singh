import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: String,
  date: String,
  description: String,
  rank: String,
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

achievementSchema.index({ order: 1 });
export default mongoose.model('Achievement', achievementSchema);
