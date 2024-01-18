import './App.css';
import React, {useState} from "react";
import {AugmentedMatrix} from "./Matrix"

const Solutions = () => {
    const [submittedMatrix, setSubmittedMatrix] = useState([]);
    const handleFormSubmit = (matrix) => setSubmittedMatrix(matrix);
  
    return (
      <div>
        <div>
            <AugmentedMatrix onFormSubmit={handleFormSubmit}/>

        </div>
            
      </div>
        
    );
  };
export default Solutions;