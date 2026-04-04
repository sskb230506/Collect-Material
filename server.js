const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'progress.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return { solved: [], notes: {}, timestamps: {} }; }
}

function writeData(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all progress
app.get('/api/progress', (_req, res) => res.json(readData()));

// POST toggle solve  { id, solved: true/false }
app.post('/api/progress/solve', (req, res) => {
  const { id, solved } = req.body;
  if (!id) return res.status(400).json({ error: 'id required' });
  const data = readData();
  const numId = Number(id);
  if (solved) {
    if (!data.solved.includes(numId)) data.solved.push(numId);
    data.timestamps[numId] = new Date().toISOString();
  } else {
    data.solved = data.solved.filter(x => x !== numId);
    delete data.timestamps[numId];
  }
  writeData(data);
  res.json({ ok: true, solved: data.solved });
});

// PATCH save note  { id, note }
app.patch('/api/progress/note', (req, res) => {
  const { id, note } = req.body;
  const data = readData();
  data.notes[String(id)] = note || '';
  writeData(data);
  res.json({ ok: true });
});

// GET note for one problem
app.get('/api/progress/note/:id', (req, res) => {
  const data = readData();
  res.json({ note: data.notes[req.params.id] || '' });
});

// DELETE reset everything
app.delete('/api/progress', (_req, res) => {
  writeData({ solved: [], notes: {}, timestamps: {} });
  res.json({ ok: true });
});

// GET stats
app.get('/api/stats', (_req, res) => {
  const data = readData();
  const total = 240;
  const done = data.solved.length;
  res.json({
    total,
    done,
    pct: Math.round((done / total) * 100),
    rating: Math.min(2100, Math.round(1813 + done * (290 / total)))
  });
});

app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

app.listen(PORT, () =>
  console.log(`\n  LeetCode 2000+ Tracker  →  http://localhost:${PORT}\n`)
);