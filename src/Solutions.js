import './App.css';
import React, {useState} from "react";
import {AugmentedMatrix} from "./Matrix"

const Solutions = () => {
    const [submittedAMatrix, setSubmittedAMatrix] = useState([]);
    const [submittedBMatrix, setSubmittedBMatrix] = useState([]);
    const handleAFormSubmit = (matrix) => setSubmittedAMatrix(matrix);
    const handleBFormSubmit = (matrix) => setSubmittedBMatrix(matrix);
  
    return (
      <div>
        <div>
            <AugmentedMatrix onAFormSubmit={handleAFormSubmit} onBFormSubmit={handleBFormSubmit}/>

        </div>
            
      </div>
        
    );
  };
export default Solutions;