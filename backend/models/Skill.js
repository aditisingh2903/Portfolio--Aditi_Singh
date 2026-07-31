import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: { type: [String], default: [] },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

skillSchema.index({ order: 1 });
export default mongoose.model('Skill', skillSchema);
