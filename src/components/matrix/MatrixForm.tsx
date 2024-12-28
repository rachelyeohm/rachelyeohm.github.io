import React from "react"
import { useState } from "react";
import { handleInputChangeArgProps } from "./MatrixTypes";
import { displayBlanks } from "../../ui/MatrixUI";
import { Button } from "antd";
import {createZeroArrayStr} from "../../utility/createZeroArray";

type MatrixFormProps = {
    directed : boolean;
    matrix : string[][];
    setMatrix : React.Dispatch<React.SetStateAction<string[][]>>;
    handleFormSubmit : (matrix : string[][]) => void;
  }



const MatrixForm = ({directed, matrix, setMatrix, handleFormSubmit} : MatrixFormProps) => { //for matrix and submission without input rows
  const [focusedCell, setFocusedCell] = useState<[number, number] | null>(null);



  const handleInputChange = ({rowIndex, colIndex, event, matrixType} : handleInputChangeArgProps) => {
    const { value } = event.target;
    const regex = /^[-]?\d*\.?\d*$/;
    if (!regex.test(value)) {
      event.target.value = value;
    } else {
      const updatedMatrix = matrix.map((row, i) => {
        if (i === rowIndex) {
          return row.map((cell, j) => j === colIndex ? value : cell); 
        } else if (!directed && i === colIndex && colIndex < matrix.length && rowIndex < matrix[i].length) {
          return row.map((cell, j) => j === rowIndex ? value : cell);
        }
        return row;
      });
      setMatrix(updatedMatrix);
    }   
  };

  const handleReset = (matrix : string[][]) => {
    setMatrix(createZeroArrayStr(matrix.length, matrix.length > 0 ? matrix[0].length : 0))
  }



  return (
    <div>
        <p className = "general"> Input your matrix: </p>
        <form className="matrix-form" onReset = {() => handleReset(matrix)}>
            {matrix.length > 0 ? displayBlanks(matrix, "", handleInputChange) : null}
        </form>
        <div className = "form-actions">
          <Button size = "large" onClick = {() => handleReset(matrix)}>{"Reset"}</Button>
          <Button size="large" onClick = {() => handleFormSubmit(matrix)}>{"Submit"}</Button>
        </div>
          
        
    </div>

  )

};
export default MatrixForm;