const express = require('express');
const Note = require('../models/Note');
const { authenticate } = require('../middleware/auth');
const appEvents = require('../events');

const router = express.Router();
router.use(authenticate); // har notes route protected hai

const isOwnerOrAdmin = (note, user) =>
  note.owner.toString() === user.id || user.role === 'admin';

// POST /api/notes
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'title and content are required' });
  }
  const note = await Note.create({ title, content, owner: req.user.id });
  appEvents.emit('note:created', note);
  res.status(201).json(note);
});

// GET /api/notes (apne notes; admin ko sab)
router.get('/', async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { owner: req.user.id };
  res.status(200).json(await Note.find(filter));
});

// GET /api/notes/:id
router.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id).catch(() => null);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  if (!isOwnerOrAdmin(note, req.user)) return res.status(403).json({ message: 'Access denied' });
  res.json(note);
});

// PUT /api/notes/:id
router.put('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id).catch(() => null);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  if (!isOwnerOrAdmin(note, req.user)) return res.status(403).json({ message: 'Access denied' });

  const { title, content } = req.body;
  if (title) note.title = title;
  if (content) note.content = content;
  await note.save();
  res.json(note);
});

// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id).catch(() => null);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  if (!isOwnerOrAdmin(note, req.user)) return res.status(403).json({ message: 'Access denied' });

  await note.deleteOne();
  appEvents.emit('note:deleted', note._id);
  res.json({ message: 'Note deleted' });
});

module.exports = router;