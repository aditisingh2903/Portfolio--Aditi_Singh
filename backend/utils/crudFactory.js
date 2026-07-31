import { asyncHandler } from './asyncHandler.js';

export function makeCrud(Model, { textFields = [] } = {}) {
  return {
    list: asyncHandler(async (req, res) => {
      const { published } = req.query;
      const filter = {};
      if (published === 'true') filter.published = true;
      if (published === 'false') filter.published = false;
      const items = await Model.find(filter).sort({ order: 1, createdAt: 1 });
      res.json(items);
    }),
    get: asyncHandler(async (req, res) => {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    }),
    create: asyncHandler(async (req, res) => {
      const body = { ...req.body };
      textFields.forEach((f) => {
        if (typeof body[f] === 'string') {
          try { body[f] = JSON.parse(body[f]); } catch {}
        }
      });
      const item = await Model.create(body);
      res.status(201).json(item);
    }),
    update: asyncHandler(async (req, res) => {
      const body = { ...req.body };
      textFields.forEach((f) => {
        if (typeof body[f] === 'string') {
          try { body[f] = JSON.parse(body[f]); } catch {}
        }
      });
      const item = await Model.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    }),
    remove: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    }),
    reorder: asyncHandler(async (req, res) => {
      const { orders } = req.body;
      if (!Array.isArray(orders)) return res.status(400).json({ message: 'orders array required' });
      await Promise.all(orders.map(({ id, order }) => Model.findByIdAndUpdate(id, { order })));
      res.json({ message: 'Reordered' });
    }),
  };
}
