
import createZeroArrayNum from "./createZeroArray";
import { PriorityQueue } from "./PriorityQueue";

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
  let edgeSet : EdgeProps[] = []; //pairs of start vertex to end vertex and weights
  let verticesInCut : number[] = [];
  let verticesOutsideCut : number[] =  Array.from({ length: graph.length }, (_, i) => i)

  let comparator = (a : EdgeProps, b : EdgeProps) => a.weight > b.weight
  let equals = (a : EdgeProps, b : EdgeProps) => a.target == b.target
  let PQ : PriorityQueue<EdgeProps>  = new PriorityQueue<EdgeProps>(comparator, equals)
  let startEdge : EdgeProps = {source : start_vertex, target : start_vertex, weight: 0}
  PQ.insert(startEdge)
  while (verticesInCut.length < graph.length && verticesOutsideCut.length > 0) {
    //if theres nothing in the PQ, pick another vertex and continue;
    console.log(verticesInCut)
    if (PQ.length() == 0) {
      let chosenVertex : number = verticesOutsideCut.shift()!
      for (let i = 0; i  < graph.length; i++) {
        if (verticesOutsideCut.includes(i) && graph[chosenVertex][i] != 0) {
           PQ.decreaseKey({source : chosenVertex, 
                           target : i, 
                           weight : graph[chosenVertex][i]})
        }
      }
      //put all the adjacent shit
    } else {
       //if theres sth in the PQ, extract the minimum;
       let chosenEdge = PQ.extractMin()
       if (verticesInCut.includes(chosenEdge.target)) continue
       edgeSet.push(chosenEdge)
       verticesInCut.push(chosenEdge.target)
       verticesOutsideCut = verticesOutsideCut.filter(num => num != chosenEdge.target)
       //add in new edges starting from chosenEdge.target
       for (let i = 0; i  < graph.length; i++) {
         if (verticesOutsideCut.includes(i) && graph[chosenEdge.target][i] != 0) {
            console.log("inserting source: " + chosenEdge.target + " target: " + i + " weight : " + graph[chosenEdge.target][i])
            PQ.decreaseKey({source : chosenEdge.target, 
                            target : i, 
                            weight : graph[chosenEdge.target][i]})
         }
       }
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