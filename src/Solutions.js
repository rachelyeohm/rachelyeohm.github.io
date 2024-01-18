import './App.css';
import React, {useState} from "react";
import Matrix from "./Matrix"

const Solutions = () => {
    const [submittedMatrix, setSubmittedMatrix] = useState([]);
    const handleFormSubmit = (matrix) => {
        setSubmittedMatrix(matrix);
    }
  
    return (
      <div>
        <div>
            <Matrix onFormSubmit={handleFormSubmit}/>

        </div>
            
      </div>
        
    );
  };
export default Solutions;