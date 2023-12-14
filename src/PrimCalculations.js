import React from 'react';
import Graph, {PrimGraph} from "./Graph"


//prim: start with mstSet (vertices already included)
//make every vertices except the vertex u want as first infinite. the vertex u want first is 0

const createEmptyMatrix = n => Array.from({ length: n }, () => Array(n).fill(0));

//code for Prim's Theorem partially taken from Dharanendra L V. from geeksforgeeks.org
function minKey(weights, vertexSet, numVertices) { 
    // Initialize min value 
    let min = Number.MAX_VALUE, min_index; 
    console.log(weights);
    for (let v = 0; v < numVertices; v++) {
      if (vertexSet[v] == false && weights[v] < min) {
        min = weights[v];
        min_index = v;
      }
    }
    return min_index; 
}

function generateGraph(pairSet, graph) { 
  let vertices = [];
  let new_graph = createEmptyMatrix(graph.length);
  for (let i = 0; i < pairSet.length; i++) {
      new_graph[pairSet[i][0]][pairSet[i][1]] = pairSet[i][2];
      new_graph[pairSet[i][1]][pairSet[i][0]] = pairSet[i][2];
      if (!vertices.includes(pairSet[i][1])) {
        vertices.push(number_to_alpha(pairSet[i][1]));
      }
  }      
  return {start_vertex: number_to_alpha(pairSet[0][0]), vertices: vertices, adjacencyMatrix: new_graph};
} 
 
// Function to construct and print MST for 
// a graph represented using adjacency 
// matrix representation 
function prim(graph) 
{ 
    // Array to store constructed MST 
    let pairSet = []; //pairs of start vertex to end vertex and weights
    let parent = []; 
    let weights = []; 
    let vertexSet = []; 
    let numVertices = graph.length;
 
    // Initialize all keys as INFINITE 
    for (let i = 0; i < numVertices; i++) {
      weights[i] = Number.MAX_VALUE;
      vertexSet[i] = false; 
    }
        
 
    weights[0] = 0; 
    parent[0] = -1; // First node is always root of MST 
 
    for (let count = 0; count < numVertices - 1; count++) { 
        let u = minKey(weights, vertexSet, numVertices); 
        vertexSet[u] = true; 
        for (let v = 0; v < numVertices; v++) {
          if (graph[u][v] && vertexSet[v] == false && graph[u][v] < weights[v]) {
            parent[v] = u;
            weights[v] = graph[u][v];
            pairSet.push([u, v, weights[v]]);
          }
          
        }
        console.log(pairSet);
    } 
 
    // print the constructed MST 
    return generateGraph(pairSet, graph); 
}
  const number_to_alpha = (number) => String.fromCharCode(97 + number);
  const VertexList = ({ vertices }) => {
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
        <p>Vertices added</p>
        <p style = {listStyle}>Start vertex: {vertices.start_vertex}</p>
        <ol style={listStyle}>
          {vertices.vertices.map((vertex, index) => (
            <li key={index} style={listItemStyle}>
              Vertex added: {vertex}
            </li>
          ))}
        </ol>
      </div>
    );
  };
  

const TreeCalc = ({graphData, width, height}) => {
  
  const prim_dict = prim(graphData.map(row => row.map(str => parseInt(str, 10))));
  return (
    <div>
      <h2>Prim's Algorithm</h2>
      <div style={{ display: 'flex' }}>
        <div>
          <p>Original graph</p>
          <PrimGraph graphData = {graphData} width={width} height={height} directed={false}/>
        </div>
        <div  style={{ marginLeft: 100 }}>
          <VertexList vertices={prim_dict}/>
        </div>
        <div style={{ marginLeft: 100}}>
          <p>Minimum Spanning Tree</p>
          <Graph graphData = {prim_dict.adjacencyMatrix} width={width} height={height} directed={false}/>
        </div>
      </div>
    </div>

    
  );
};

export default TreeCalc;

