import React from 'react';
import Form from "./Form"


//for undirected
const MST= () => {

  return (
    <div>
          <p className='general'>A minimum spanning tree is a subgraph with every vertex of the graph that is also a tree.</p>
          <p className='general'>We will use Kruskal's Algorithm and Prim's Algorithm to calculate the minimum spanning tree.</p>
          <Form usecase = {"MST"} directed = {false} />
    </div>
    
  );
};

export default MST;

