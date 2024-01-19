import './App.css';
import React, {useState} from "react";
import {AugmentedMatrix} from "./Matrix"
import {calcRREF, findNumberOfSolutions} from "./Rref";

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
            <p className='general'>There are {submittedCoeffMatrix.length === 0 ? "____" : calcNumberOfSolutions(submittedCoeffMatrix)} solutions.</p>
            
        </div>
            
      </div>
        
    );
  };
export default Solutions;


const calcNumberOfSolutions = (coeffMatrix) => {
  const RREF = calcRREF(coeffMatrix);
  const numberOfSolutions = findNumberOfSolutions(RREF);
  return numberOfSolutions;
}
