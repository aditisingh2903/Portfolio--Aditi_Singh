import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: String,
  date: String,
  credentialId: String,
  link: String,
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

certificationSchema.index({ order: 1 });
export default mongoose.model('Certification', certificationSchema);
