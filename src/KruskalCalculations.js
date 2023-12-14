import React from 'react';
import Graph from "./Graph"


//kruskal:
//start with all vertices and no edges. add edges as long as they dont form a circuit

const createEmptyMatrix = (n) => {
    return Array.from({ length: n }, () => Array(n).fill(0));
  };
  
  const find = (parent, i) => {
    if (parent[i] === i) {
      return i;
    }
    return find(parent, parent[i]);
  };
  
  const union = (parent, rank, x, y) => {
    const rootX = find(parent, x);
    const rootY = find(parent, y);
  
    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
  };
  
  const kruskal = (graph) => {
    const n = graph.length;
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = Array(n).fill(0);
    
    const edges = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (graph[i][j] != 0) {
          edges.push({ source: i, target: j, weight: graph[i][j] });
        }
      }
    }
    edges.sort((a, b) => a.weight - b.weight);    
  
    const result = [];
    const minSpanningTree = createEmptyMatrix(n);
  
    const findParentOfSource = (edge) => find(parent, edge.source);
    const findParentOfTarget = (edge) => find(parent, edge.target);
  
    for (let i = 0; i < edges.length; i++) {
      const { source, target, weight } = edges[i];
      const sourceParent = findParentOfSource(edges[i]);
      const targetParent = findParentOfTarget(edges[i]);
  
      if (sourceParent !== targetParent) {
        result.push({ source, target, weight });
        minSpanningTree[source][target] = weight;
        minSpanningTree[target][source] = weight;
        union(parent, rank, sourceParent, targetParent);
      }
    }
  
    return { edges: result, adjacencyMatrix: minSpanningTree };
  };
  
  // Example usage
  const adjacencyMatrix = [
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0],
  ];
  
  const { edges, adjacencyMatrix: minSpanningTree } = kruskal(adjacencyMatrix);
  console.log("Edges in minimum spanning tree:", edges);
  console.log("Adjacency matrix of minimum spanning tree:", minSpanningTree);
  

  const number_to_alpha = (number) => String.fromCharCode(97 + number);
  const EdgeList = ({ edges }) => {
    const listStyle = {
        padding: 0,
        margin: 0,
        listStyleType: 'decimal',
      };
  
      const listItemStyle = {
        padding: 0,
        margin: 0,
        fontSize: '0.9em',  
      };
    return (
      <div>
        <p>Edges added</p>
        <ol style={listStyle}>
          {edges.map((edge, index) => (
            <li key={index} style={listItemStyle}>
              First node: {number_to_alpha(edge.source)}, Second node: {number_to_alpha(edge.target)}, Weight: {edge.weight}
            </li>
          ))}
        </ol>
      </div>
    );
  };
  

const TreeCalc = ({graphData, width, height}) => {
  
  const kruskal_dict = kruskal(graphData);
  return (
    <div>
      <h2>Kruskal's Algorithm</h2>
      <div style={{ display: 'flex' }}>
        <div>
          <p>Original graph</p>
          <Graph graphData = {graphData} width={width} height={height} directed={false}/>
        </div>
        <div  style={{ marginLeft: 32 }}>
          <EdgeList edges={kruskal_dict.edges}/>
        </div>
        <div style={{ marginLeft: 16 }}>
          <p>Minimum Spanning Tree</p>
          <Graph graphData = {kruskal_dict.adjacencyMatrix} width={width} height={height} directed={false}/>
        </div>
      </div>
    </div>
    
    

    
  );
};

export default TreeCalc;

