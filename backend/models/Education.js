import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: String,
  startDate: String,
  endDate: String,
  score: String,
  scoreType: { type: String, default: 'CPI' },
  description: [String],
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

educationSchema.index({ order: 1 });
export default mongoose.model('Education', educationSchema);
