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
            {submittedMatrix.length === 0 ? null : <TryRREF array={submittedMatrix}/>}
            
      </div>
        
    );
  };
export default RREF;

function TryRREF({array}){
    array = array.map(innerArray =>innerArray.map(element => parseInt(element, 10)));
    console.log(array);
    function swapZeroRows(array){
        console.log("here4");
        console.log(array);
        let result = array.filter((row)=>!row.every(val => val === 0));
        let zeroRow = Array(array[0].length).fill(0);
        
        //result = reduceToRREF(result);
        for (let i=0; i < array.length - result.length; i++){
            result.push(zeroRow);
        }
        return result;
    }

    
    array= swapZeroRows(array);
    console.log(array);
    return array;
}