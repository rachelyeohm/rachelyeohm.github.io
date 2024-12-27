import React from "react"
import { useEffect, useState } from "react";

type MatrixFormProps = {
    directed : boolean;
    matrix : number[][];
    setMatrix : React.Dispatch<React.SetStateAction<number[][]>>;
    onFormSubmit : (matrix : number[][]) => void;
  }



const MatrixForm = ({directed, matrix, setMatrix, onFormSubmit} : MatrixFormProps) => { //for matrix and submission without input rows
  const [focusedCell, setFocusedCell] = useState<[number, number] | null>(null);



  const handleInputChange = (rowIndex : number, colIndex : number, event : React.ChangeEvent<HTMLInputElement>) => {
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

  function displayBlanks(){
    return matrix.map((row, rowIndex) => (
              <div key={rowIndex}>
              {row.map((cell, colIndex) => (
                  <input
                  key={colIndex}
                  value={cell}
                  onChange={(event) => handleInputChange(rowIndex, colIndex, event)}
                  />
              ))}
              </div>
          ));
  }

  return (
    <div>
        <p className = "general"> Input your matrix: </p>
        <form className="matrix-form" onSubmit={handleSubmit}>
            {matrix.length > 0 ? displayBlanks() : null}
            <button className="button" type="submit">Submit</button>
        </form>
    </div>

  )

};
export default MatrixForm;