# LeetCode 2000+ Tracker

A full-stack Node.js app to track your journey from **1813 → 2000+ rating**.

## 240 problems across 16 categories:
- Two Pointers / Sliding Window
- Binary Search
- Stack & Monotonic Stack
- Dynamic Programming (1D / 2D)
- **Interval DP** (Burst Balloons, Remove Boxes, Strange Printer, Stone Game...)
- **Segment Tree / BIT / Advanced Data Structures**
- Graphs — BFS / DFS / Topological Sort
- Trees & BST
- Heap / Priority Queue
- Greedy
- Backtracking
- Trie
- Union-Find (DSU)
- Bit Manipulation
- Math & Number Theory
- **System Design & OOD** (LRU, LFU, Design Twitter, Skiplist, Autocomplete...)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start

# 3. Open browser
http://localhost:3000
```

## Features
- ✅ Check off problems as solved — persisted to `data/progress.json`
- 📝 Add per-problem notes (approach, complexity, gotchas)
- 🔍 Search by problem name, tag, or id
- 🎯 Filter by difficulty, rating tier (≥1800, ≥1900, ≥2000)
- 📊 Live estimated rating tracker (1813 → 2100)
- 🏷️ Click any tag to filter by that pattern

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/progress | Get all progress |
| POST | /api/progress/solve | Toggle problem solved `{id, solved}` |
| PATCH | /api/progress/note | Save note `{id, note}` |
| DELETE | /api/progress | Reset all progress |
| GET | /api/stats | Get stats summary |
