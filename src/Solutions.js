import './App.css';
import React, {useState} from "react";
import {AugmentedMatrix} from "./Matrix"
import {calcAugmentedRREF, calcNumberOfSolutions} from "./RrefUtility";

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

