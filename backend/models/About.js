import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  heading: { type: String, default: 'About Me' },
  paragraphs: { type: [String], default: [] },
  image: { type: String, default: '' },
  highlights: { type: [String], default: [] },
  stats: [{
    label: String,
    value: String,
    _id: false,
  }],
}, { timestamps: true });

export default mongoose.model('About', aboutSchema);
