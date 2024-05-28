import React, {useState} from 'react';
import {SquareMatrix} from "../components/matrix/Matrix"
import {determinant, symmetric, euler} from "../utility/graphCalculations"
import Graph from "../components/graph/Graph"
//form is directed - true

//for undirected
const GraphVisualisation= () => {


    const [submittedMatrix, setSubmittedMatrix] = useState<number[][]>([]);
    const handleFormSubmit = (matrix : number[][]) => {
        setSubmittedMatrix(matrix);
    }
    return (
        <div>
            <p className='general'>Here, an adjacency matrix is used to represent a graph.</p>
            <SquareMatrix directed = {true} onFormSubmit = {handleFormSubmit} />
            
            {submittedMatrix.length === 0 ? 
            (
                <div>
                    <p> Example Graph: </p>
                    <Graph graphData = {[[1, 2, 3, 4], [1,2,3,2], [0,4,1,2], [0,0,5,0]]} width={600} height={200} directed = {true}/>
                </div>
            )
            
            :
            (<div>
                <p> Graph generated: </p>
                <Graph graphData = {submittedMatrix} width={600} height={200} directed = {true}/>
                <div className="general">
        
                    <p>Determinant: {determinant(submittedMatrix)}</p>
                    <p>Symmetric: {symmetric(submittedMatrix) ? "Yes" : "No"}</p>
                    <p>Euler: {euler(submittedMatrix) ? "Yes" : "No"}</p>
                    
                </div>
    
            </div>)
            }
        </div>
        
    );
};

export default GraphVisualisation;

