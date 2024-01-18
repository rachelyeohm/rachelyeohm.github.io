import './App.css';
import React, {useState} from "react";
import {AugmentedMatrix} from "./Matrix"

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

        </div>
            
      </div>
        
    );
  };
export default Solutions;