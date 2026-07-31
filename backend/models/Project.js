import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  description: String,
  longDescription: [String],
  techStack: { type: [String], default: [] },
  links: {
    github: String,
    live: String,
    video: String,
    demo: String,
  },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

projectSchema.index({ order: 1 });
export default mongoose.model('Project', projectSchema);
