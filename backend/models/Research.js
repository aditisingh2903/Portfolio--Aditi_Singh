import mongoose from 'mongoose';

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  journal: String,
  year: String,
  link: String,
  abstract: String,
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

researchSchema.index({ order: 1 });
export default mongoose.model('Research', researchSchema);
