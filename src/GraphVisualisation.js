import React, {useState} from 'react';
import Matrix from "./Matrix"
import GraphCalc from "./GraphCalculations"
//form is directed - true

//for undirected
const GraphVisualisation= () => {

    const [submittedMatrix, setSubmittedMatrix] = useState([]);
    const handleFormSubmit = (matrix) => setSubmittedMatrix(matrix);
    console.log(submittedMatrix);
    return (
        <div>
            <Matrix directed = {true} onFormSubmit = {handleFormSubmit} />
            <GraphCalc graphData={submittedMatrix}/>
        </div>
        
    );
};

export default GraphVisualisation;

