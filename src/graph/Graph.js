/**
 * A strict undirected graph:
 * - Node IDs must be string or number.
 * - No auto-creation of nodes. Must add them explicitly with addNode / addNodesFrom.
 * - Edges are undirected, stored in an adjacency list (Map<nodeId, Set<nodeId>>).
 * - node(id), edge(u,v) will throw error if they don't exist.
 */
class Graph {
    constructor() {
      // key: nodeId (string|number), value: Set of neighborIds
      this.adj = new Map();
  
      // key: nodeId => node attributes (e.g., { color: 'red' })
      this.nodesData = new Map();
  
      // For edge attributes (undirected):
      // We'll store them in a Map keyed by a stable string key (like "s:A|n:1").
      this.edgesData = new Map();
    }
  
    static _checkValidId(id) {
      const t = typeof id;
      if (t !== 'string' && t !== 'number') {
        throw new Error(`Invalid node id: ${id}. Only string or number is allowed.`);
      }
    }
  
    /**
     * Convert node ID to a string with type prefix to differentiate
     * number(1) from string("1").
     */
    _typedId(id) {
      return (typeof id === 'number') ? `n:${id}` : `s:${id}`;
    }
  
    /**
     * Construct a stable, order-independent key for an undirected edge (u,v).
     * Sort the typed IDs so (u,v) and (v,u) produce the same string.
     */
    _edgeKey(u, v) {
      const keyU = this._typedId(u);
      const keyV = this._typedId(v);
      const sorted = [keyU, keyV].sort();
      return `${sorted[0]}|${sorted[1]}`;
    }
  
    addNode(id, attr = {}) {
      Graph._checkValidId(id);
      if (this.adj.has(id)) {
        throw new Error(`Node "${id}" already exists.`);
      }
      this.adj.set(id, new Set());
      this.nodesData.set(id, { ...attr });
    }
  
    addNodesFrom(nodeData) {
      for (const item of nodeData) {
        if (Array.isArray(item)) {
          const [nid, attr = {}] = item;
          this.addNode(nid, attr);
        } else {
          this.addNode(item);
        }
      }
    }
  
    hasNode(id) {
      return this.adj.has(id);
    }
  
    node(id) {
      if (!this.adj.has(id)) {
        throw new Error(`Node "${id}" does not exist.`);
      }
      return this.nodesData.get(id);
    }
  
    removeNode(id) {
      if (!this.adj.has(id)) {
        throw new Error(`Node "${id}" does not exist.`);
      }
      // Remove from neighbors' adjacency sets + edgesData
      for (const nbr of this.adj.get(id)) {
        this.adj.get(nbr).delete(id);
        this.edgesData.delete(this._edgeKey(id, nbr));
      }
      this.adj.delete(id);
      this.nodesData.delete(id);
    }
  
    addEdge(u, v, attr = {}) {
      Graph._checkValidId(u);
      Graph._checkValidId(v);
      if (!this.adj.has(u)) {
        throw new Error(`Cannot add edge: node "${u}" does not exist.`);
      }
      if (!this.adj.has(v)) {
        throw new Error(`Cannot add edge: node "${v}" does not exist.`);
      }
  
      this.adj.get(u).add(v);
      this.adj.get(v).add(u);
  
      const ek = this._edgeKey(u, v);
      if (!this.edgesData.has(ek)) {
        this.edgesData.set(ek, { ...attr });
      } else {
        Object.assign(this.edgesData.get(ek), attr);
      }
    }
  
    hasEdge(u, v) {
      if (!this.adj.has(u)) return false;
      return this.adj.get(u).has(v);
    }
  
    edge(u, v) {
      if (!this.hasEdge(u, v)) {
        throw new Error(`Edge does not exist between "${u}" and "${v}".`);
      }
      return this.edgesData.get(this._edgeKey(u, v));
    }
  
    removeEdge(u, v) {
      if (!this.hasEdge(u, v)) {
        throw new Error(`Cannot remove edge: no edge between "${u}" and "${v}".`);
      }
      this.adj.get(u).delete(v);
      this.adj.get(v).delete(u);
      this.edgesData.delete(this._edgeKey(u, v));
    }
  
    neighbors(id) {
      if (!this.adj.has(id)) {
        throw new Error(`Node "${id}" does not exist.`);
      }
      return Array.from(this.adj.get(id));
    }
  
    numberOfNodes() {
      return this.adj.size;
    }
  
    nodes() {
      return Array.from(this.adj.keys());
    }
  
    numberOfEdges() {
      return this.edgesData.size;
    }
  
    edges() {
      // Return array of [u, v, attributeObj]. 
      // Edge key is e.g. "s:A|n:1"; we parse it back if needed.
      const results = [];
      for (const [key, attr] of this.edgesData.entries()) {
        // key might look like "n:1|s:A" => split by '|'
        const [uTyped, vTyped] = key.split('|');
        // strip prefix
        const u = uTyped.startsWith('n:') ? Number(uTyped.slice(2)) : uTyped.slice(2);
        const v = vTyped.startsWith('n:') ? Number(vTyped.slice(2)) : vTyped.slice(2);
        results.push([u, v, attr]);
      }
      return results;
    }
  }
  
  export default Graph;
  