import './App.css';
import React, {useState} from "react";
import {AugmentedMatrix} from "./Matrix"
import {calcAugmentedRREF, findNumberOfSolutions} from "./Rref";

const Solutions = () => {
    const [submittedCoeffMatrix, setSubmittedCoeffMatrix] = useState([]);
    const [submittedConstMatrix, setSubmittedConstMatrix] = useState([]);
    const handleFormSubmit = (coeffMatrix, constMatrix) => {
      setSubmittedCoeffMatrix(coeffMatrix);
      setSubmittedConstMatrix(constMatrix);
    }

    return (
      <div>
        <div>
            <AugmentedMatrix onFormSubmit={handleFormSubmit}/>
            <p className='general'>There are {submittedCoeffMatrix.length === 0 ? "____" : calcNumberOfSolutions(submittedCoeffMatrix, submittedConstMatrix)} solutions.</p>
            
        </div>
            
      </div>
        
    );
  };
export default Solutions;


const calcNumberOfSolutions = (coeffMatrix, constMatrix) => {
  const result = calcAugmentedRREF(coeffMatrix, constMatrix);
  function combineMatrices(coeffMatrix, constMatrix) {
    const rowCount = coeffMatrix.length;
    const combinedMatrix = new Array(rowCount);

    for (let i = 0; i < rowCount; i++) {
        combinedMatrix[i] = [...coeffMatrix[i], ...constMatrix[i]];
    }

    return combinedMatrix;
  }
  const combinedMatrix = combineMatrices(result.coeffMatrix, result.constMatrix);
  const numberOfSolutions = findNumberOfSolutions(combinedMatrix);
  return numberOfSolutions;
}
