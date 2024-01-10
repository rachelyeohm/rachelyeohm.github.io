import React, {useState} from 'react';
import Matrix from "./Matrix"
import KruskalCalc from "./KruskalCalculations"
import PrimCalc from "./PrimCalculations"


//for undirected
const MST= () => {

  const [submittedMatrix, setSubmittedMatrix] = useState([]);
  const handleFormSubmit = (matrix) => setSubmittedMatrix(matrix);

  return (
    <div>
          <p className='general'>A minimum spanning tree is a subgraph with every vertex of the graph that is also a tree.</p>
          <p className='general'>We will use Kruskal's Algorithm and Prim's Algorithm to calculate the minimum spanning tree.</p>
          <Matrix directed = {false} onFormSubmit={handleFormSubmit}/>
          <KruskalCalc graphData={submittedMatrix} width={200} height={200}/>
          <PrimCalc graphData={submittedMatrix} width={200} height={200}/>
    </div>
    
  );
};

export default MST;

