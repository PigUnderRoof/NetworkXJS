# 🌐 NetworkXJS - A Graph Library for JavaScript

[![npm version](https://img.shields.io/npm/v/networkxjs)](https://www.npmjs.com/package/networkxjs)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**NetworkXJS** is a JavaScript library for working with **graph data structures** and **graph algorithms**, inspired by Python's [NetworkX](https://networkx.org/). It provides an easy-to-use API for **building, analyzing, and manipulating graphs** in JavaScript.

🚀 **Why NetworkXJS?**
- **Simple & Flexible**: Designed for both beginners and advanced users.
- **Strict Graph Handling**: No implicit node creation. Nodes must be explicitly added.
- **Supports Node & Edge Attributes**: Store metadata on both nodes and edges.
- **Fast & Lightweight**: Uses `Map` and `Set` for efficient graph operations.
- **No Dependencies**: Works in both **Node.js** and **Browser** environments.

---

## 📦 Installation

To use NetworkXJS, simply install it via **npm** or **pnpm**:

```bash
# Using npm
npm install networkxjs

# Using pnpm
pnpm add networkxjs
```

In browser environments, you can include the library via a CDN:

```html
<script src="/url/to/networkxjs.umd.js"></script>
<script>
  const G = new NetworkXJS.Graph();
  G.addNode(1);
  G.addEdge(1, 2);
  console.log(G.hasEdge(1, 2));  // true
</script>
```
---

## 🚀 Quick Start

### **1️⃣ Import the library**
```js
import { Graph } from 'networkxjs';

// OR (if using CommonJS)
const { Graph } = require('networkxjs');
```

### **2️⃣ Create a graph**
```js
const G = new Graph();

G.addNode(1, { color: "red" });
G.addNode("A", { color: "blue" });

console.log(G.hasNode(1));  // true
console.log(G.hasNode("B"));  // false
```

### **3️⃣ Add edges**
```js
G.addEdge(1, "A", { weight: 5 });
console.log(G.hasEdge(1, "A")); // true

// Retrieve edge attributes
console.log(G.edge(1, "A")); // { weight: 5 }
```

### **4️⃣ Remove nodes & edges**
```js
G.removeEdge(1, "A");
console.log(G.hasEdge(1, "A")); // false

G.removeNode("A");
console.log(G.hasNode("A")); // false
```

---

## 🎯 API Reference

### **🔹 Graph Methods**
| Method | Description |
|--------|------------|
| `addNode(id, attr={})` | Add a node with an optional attribute object. |
| `addNodesFrom([...])` | Add multiple nodes at once. |
| `hasNode(id)` | Check if a node exists. |
| `node(id)` | Get node attributes (throws if not found). |
| `removeNode(id)` | Remove a node and all connected edges. |
| `addEdge(u, v, attr={})` | Add an undirected edge (nodes must exist). |
| `hasEdge(u, v)` | Check if an edge exists. |
| `edge(u, v)` | Get edge attributes (throws if not found). |
| `removeEdge(u, v)` | Remove an edge. |
| `neighbors(id)` | Get all neighbors of a node. |
| `numberOfNodes()` | Get the total number of nodes. |
| `numberOfEdges()` | Get the total number of edges. |

---

## 🛠 Common Issues & FAQs

### ❓ Why do I get an error when adding an edge?
NetworkXJS **does not auto-create nodes**. You must **add both nodes before** adding an edge.

```js
const G = new Graph();
G.addNode(1);
G.addNode(2);
G.addEdge(1, 2);  // ✅ Works fine

G.addEdge(3, 4);  // ❌ Error: Node "3" does not exist.
```

### ❓ Can I use objects as node IDs?
No. Node IDs must be **strings or numbers** to ensure fast lookups.

### ❓ Does it support directed graphs?
Not yet. Future versions may include `DiGraph`.

---

## 👥 Contributing

We welcome contributions! To contribute:

1. **Fork the repository** on GitHub.
2. **Clone your fork** and install dependencies:
   ```bash
   git clone https://github.com/yourusername/networkxjs.git
   cd networkxjs
   pnpm install
   ```
3. **Run tests** before submitting a PR:
   ```bash
   pnpm test
   ```
4. **Submit a pull request** 🎉

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

