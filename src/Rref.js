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
            {submittedMatrix.length === 0 ? null : <CalcRREF array={submittedMatrix}/>}
            
      </div>
        
    );
  };
export default RREF;

function CalcRREF({array}){
    
    array = array.map(innerArray =>innerArray.map(element => parseInt(element, 10)));

    function reduceToRREF(matrix) {
        let lead = 0;
        const rowCount = matrix.length;
        const colCount = matrix[0].length;
    
        for (let r = 0; r < rowCount; r++) {
            if (colCount <= lead) {
                break;
            }
    
            let i = r;
    
            while (matrix[i][lead] === 0) {
                i++;
                if (rowCount === i) {
                    i = r;
                    lead++;
                    if (colCount === lead) {
                        break;
                    }
                }
            }
    
            if (colCount > lead) {
                let temp = matrix[i];
                matrix[i] = matrix[r];
                matrix[r] = temp;
    
                let val = matrix[r][lead];
    
                // Check if the divisor (val) is not zero before performing operations
                if (val !== 0) {
                    for (let j = 0; j < colCount; j++) {
                        matrix[r][j] /= val;
                    }
    
                    for (let i = 0; i < rowCount; i++) {
                        if (i !== r) {
                            val = matrix[i][lead];
                            for (let j = 0; j < colCount; j++) {
                                matrix[i][j] -= val * matrix[r][j];
                            }
                        }
                    }
                }
            }
    
            lead++;
        }
  
        return matrix;
    }

    function moveZeroRows(array){
        let result = array.filter((row)=>!row.every(val => val === 0));
        let zeroRow = Array(array[0].length).fill(0);
        
        result = reduceToRREF(result);
        for (let i=0; i < array.length - result.length; i++){
            result.push(zeroRow);
        }
        return result;
    }

    
    const result= moveZeroRows(array);
    return result;


}
  
  
  
  