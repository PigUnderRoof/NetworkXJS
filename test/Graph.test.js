// test/Graph.test.js
import Graph from '../src/graph/Graph.js';

describe('Graph', () => {
  it('should add and remove nodes properly', () => {
    const g = new Graph();
    g.addNode(1);
    g.addNode("A", { color: 'blue' });

    expect(g.numberOfNodes()).toBe(2);
    expect(g.hasNode(1)).toBe(true);
    expect(g.hasNode("A")).toBe(true);

    // node method
    expect(g.node("A")).toEqual({ color: 'blue' });
    
    // remove node
    g.removeNode(1);
    expect(g.numberOfNodes()).toBe(1);
    expect(g.hasNode(1)).toBe(false);
  });

  it('should add edges only between existing nodes', () => {
    const g = new Graph();
    g.addNode(1);
    g.addNode(2);
    g.addEdge(1, 2, { weight: 10 });

    expect(g.hasEdge(1, 2)).toBe(true);
    expect(g.edge(1, 2)).toEqual({ weight: 10 });

    // Removing edge
    g.removeEdge(1, 2);
    expect(g.hasEdge(1, 2)).toBe(false);
  });

  it('should throw error if node does not exist', () => {
    const g = new Graph();
    g.addNode("X");

    expect(() => g.node("Y")).toThrow(/does not exist/);
    expect(() => g.addEdge("X", "Z")).toThrow(/does not exist/);
  });
});
