import './App.css';
import React, {useState} from "react";
import Matrix from "./Matrix"

const LinAlgProject = () => {
  const [submittedMatrix, setSubmittedMatrix] = useState([]);
  const handleFormSubmit = (matrix) => {
      setSubmittedMatrix(matrix);
      console.log("Here");
      console.log(submittedMatrix);
  }

  return (
    <div>
          <p>In Progress!</p>
          <Matrix onFormSubmit={handleFormSubmit}/>
          {submittedMatrix.length === 0 ? null : <RREF array={submittedMatrix}/>}
          
    </div>
      
  );
};
export default LinAlgProject;

function RREF(array){
  
  console.log("Here2");
  console.log(array);
  console.log("array length is " + array.length);
    
  function swapZeroRows(array){
      let result = array.filter((row)=>!row.every(val => val === 0));
      let zeroRow = Array(3).fill(0);
      result = reduceToRREF(result);
      for (let i=0; i < array.length - result.length; i++){
          result.push(zeroRow);
      }
      return result;
  }

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
    
        let temp = matrix[i];
        matrix[i] = matrix[r];
        matrix[r] = temp;
    
        let val = matrix[r][lead];
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
    
        lead++;
      }
    
      return matrix;
    }

  
  const result= swapZeroRows(array);
  return (
    <div>
      {result}
    </div>
  )
  
}



