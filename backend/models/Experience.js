import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  organization: { type: String, required: true },
  startDate: String,
  endDate: String,
  location: String,
  description: [String],
  images: { type: [String], default: [] },
  type: { type: String, enum: ['work', 'internship', 'leadership', 'hackathon'], default: 'work' },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

experienceSchema.index({ order: 1 });
export default mongoose.model('Experience', experienceSchema);
