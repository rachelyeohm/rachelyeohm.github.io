
import createZeroArrayNum from "./createZeroArray";

export type KruskalResultProps = {
  edges: EdgeProps[], adjacencyMatrix: number[][]
}

export type PrimResultProps = {
  start_vertex: string, vertices: string[], adjacencyMatrix: number[][]
}
export type EdgeProps  = {
    source : number,
    target : number,
    weight : number
}
const number_to_alpha = (number : number) => String.fromCharCode(97 + number);

//quickunion
const find = (parent : number[], i : number) : number => {
    if (parent[i] === i) {
      return i;
    }
    return find(parent, parent[i]);
  };
  
  const union = (parent : number[], rank : number[], x : number, y :number) => {
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
  
  export const kruskal = (graph : number[][]) : KruskalResultProps => {
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
    const minSpanningTree = createZeroArrayNum(n, n);
  
    const findParentOfSource = (edge : EdgeProps) => find(parent, edge.source);
    const findParentOfTarget = (edge : EdgeProps) => find(parent, edge.target);
  
    for (let i = 0; i < edges.length; i++) {
      const { source, target, weight } = edges[i];
      const sourceParent = findParentOfSource(edges[i]);
      const targetParent = findParentOfTarget(edges[i]);
  
      if (sourceParent !== targetParent) {
        result.push({ source, target, weight });
        minSpanningTree[source][target] = weight;
        minSpanningTree[target][source] = weight;
        union(parent, rank, sourceParent, targetParent)
      }
    }
  
    return { edges: result, adjacencyMatrix: minSpanningTree }
  };



 
export function prim(graph : number[][], start_vertex : number) : PrimResultProps
{ 

  const V = graph.length;
  function minKey(key : number[], visited : boolean[]) { 
    // Initialize min value 
    let min = Number.MAX_VALUE, min_index = -1; 

    for (let v = 0; v < V; v++) 
        if (!visited[v] && key[v] < min) {
            min = key[v];
            min_index = v; 
        }

      return min_index; 
  } 
  
  let edgeSet : EdgeProps[] = [];
  let parent : number[] = new Array(V); 
  let key : number[] = new Array(V); 
  let visited : boolean[] = new Array(V); 

  for (let i = 0; i < V; i++) {
      key[i] = Number.MAX_VALUE; 
      visited[i] = false; 
      parent[i] = -1;
  }

  key[start_vertex] = 0; 

  for (let count = 0; count < V - 1; count++) { 
      let u : number = minKey(key, visited); 
      visited[u] = true; 
      for (let v = 0; v < V; v++) { 
          if (u != -1 && v != -1 && graph[u][v] && !visited[v] && graph[u][v] < key[v]) { 
              parent[v] = u; 
              key[v] = graph[u][v]; 
          } 
      } 
  } 

  for (let i = 1; i < V; i++) {
    if (parent[i] != -1) {
      edgeSet.push({source : parent[i], target: i, weight : graph[i][parent[i]]})
    }
  }
  return generateGraph(edgeSet, graph.length, start_vertex)
  
}

function generateGraph(pairSet : EdgeProps[], graphLength : number, start_vertex : number) { 
  let vertices : string[] = [];
  let new_graph = createZeroArrayNum(graphLength, graphLength);
  for (let i = 0; i < pairSet.length; i++) {
      new_graph[pairSet[i].source][pairSet[i].target] = pairSet[i].weight;
      new_graph[pairSet[i].target][pairSet[i].source] = pairSet[i].weight;
      if (!vertices.includes(number_to_alpha(pairSet[i].target))) {
        vertices.push(number_to_alpha(pairSet[i].target))
      }
  }      
  return {start_vertex: number_to_alpha(start_vertex), vertices: vertices, adjacencyMatrix: new_graph};
} 