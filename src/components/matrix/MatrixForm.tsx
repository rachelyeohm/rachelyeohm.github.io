import React from "react"
import { useEffect, useState } from "react";
import { handleInputChangeArgProps } from "./MatrixTypes";
import { displayBlanks } from "./MatrixUI";

type MatrixFormProps = {
    directed : boolean;
    matrix : string[][];
    setMatrix : React.Dispatch<React.SetStateAction<string[][]>>;
    onFormSubmit : (matrix : string[][]) => void;
  }



const MatrixForm = ({directed, matrix, setMatrix, onFormSubmit} : MatrixFormProps) => { //for matrix and submission without input rows
  const [focusedCell, setFocusedCell] = useState<[number, number] | null>(null);



  const handleInputChange = ({rowIndex, colIndex, event, matrixType} : handleInputChangeArgProps) => {
    const { value } = event.target;
    const regex = /^[-]?\d*\.?\d*$/;
    if (!regex.test(value)) {
      event.target.value = value;
    } else {
      const updatedMatrix = matrix.map((row, i) => {
        if (i === rowIndex) {
          return row.map((cell, j) => j === colIndex ? value : cell); //parseFloat(value)
        } else if (!directed && i === colIndex && colIndex < matrix.length && rowIndex < matrix[i].length) {
          return row.map((cell, j) => j === rowIndex ? value : cell);
        }
        return row;
      });
      setMatrix(updatedMatrix);
    }
      
  };

  const handleSubmit = (event : React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFormSubmit(matrix);
  };



  return (
    <div>
        <p className = "general"> Input your matrix: </p>
        <form className="matrix-form" onSubmit={handleSubmit}>
            {matrix.length > 0 ? displayBlanks(matrix, "", handleInputChange) : null}
            <button className="button" type="submit">Submit</button>
        </form>
    </div>

  )

};
export default MatrixForm;