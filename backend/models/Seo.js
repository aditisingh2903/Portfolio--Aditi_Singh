import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  title: String,
  description: String,
  keywords: [String],
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  twitterCard: { type: String, default: 'summary_large_image' },
  favicon: String,
  googleAnalyticsId: String,
}, { timestamps: true });

export default mongoose.model('Seo', seoSchema);
