import './App.css';
import React, {useState} from "react";
import Matrix from "./Matrix"

const RREF = () => {
    const [submittedMatrix, setSubmittedMatrix] = useState([]);
    const handleFormSubmit = (matrix) => {
        setSubmittedMatrix(matrix);
        console.log("Here");
        console.log(submittedMatrix);
    }
  
    return (
      <div>
            <Matrix onFormSubmit={handleFormSubmit}/>
            {submittedMatrix.length === 0 ? null : submittedMatrix}
            
      </div>
        
    );
  };
export default RREF;
