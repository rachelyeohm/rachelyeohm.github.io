import React, {useState} from 'react';
import {SquareMatrix} from "./Matrix"
import GraphCalc from "./GraphCalculations"
import Graph from "./Graph"
//form is directed - true

//for undirected
const GraphVisualisation= () => {

    const [submittedMatrix, setSubmittedMatrix] = useState([]);
    const handleFormSubmit = (matrix) => {
        setSubmittedMatrix(matrix);
    }
    return (
        <div>
            <SquareMatrix directed = {true} onFormSubmit = {handleFormSubmit} />
            {submittedMatrix.length === 0 ? null  :
            (<div>
                <Graph graphData = {submittedMatrix} width={600} height={200} directed = {false}/>
                <GraphCalc graphData={submittedMatrix}/>
            </div>)
            }
        </div>
        
    );
};

export default GraphVisualisation;

