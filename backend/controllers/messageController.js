import Message from '../models/Message.js';
import { asyncHandler } from '../utils/asyncHandler.js';
export const list = asyncHandler(async (req, res) => {
  const items = await Message.find().sort({ createdAt: -1 });
  res.json(items);
});
export const create = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'name, email, message required' });
  const msg = await Message.create({ name, email, subject, message });
  res.status(201).json({ message: 'Message sent', id: msg._id });
});
export const markRead = asyncHandler(async (req, res) => {
  const m = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(m);
});
export const remove = asyncHandler(async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});
