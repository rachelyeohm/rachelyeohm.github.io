import React, { useState } from 'react';


const NumForm = ({text, number, onChange}) => { //form format for entering of rows / columns
  console.log(text);
  return (
    <form className = "general">
    <label>
        {text}:   &nbsp; &nbsp;
        <input
        type="number"
        min = "0"
        step = "1"
        name="n"
        value={number}
        onChange={onChange}
        />
    </label>
  </form>
  );
}

const MatrixForm = ({row, col, directed, matrix, setMatrix, onFormSubmit}) => { //for matrix and submission without input rows
  
  const [localMatrix, setLocalMatrix] = useState(matrix);
  
  const handleInputChange = (rowIndex, colIndex, event) => {
    const { value } = event.target;
    const updatedMatrix = [...matrix];
    updatedMatrix[rowIndex][colIndex] = value;
    if (!directed){
      updatedMatrix[colIndex][rowIndex] = value;
    }
    setLocalMatrix(updatedMatrix);
    setMatrix(updatedMatrix);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(matrix);
  };

  function addBlanks(){
    return matrix.map((row, rowIndex) => (
              <div key={rowIndex}>
              {row.map((cell, colIndex) => (
                  <input
                  key={colIndex}
                  type="number"
                  min = "0"
                  step = "1"
                  value={cell}
                  onChange={(event) => handleInputChange(rowIndex, colIndex, event)}
                  />
              ))}
              </div>
          ));
  }

  return (
    <div>
        <p className = "general"> Input your adjacency matrix: </p>
        <form className="matrix-form" onSubmit={handleSubmit}>
            {matrix.length > 0 ? addBlanks() : null}
            <button className="button" type="submit">Submit</button>
        </form>
    </div>

  )

};

const Matrix = ({onFormSubmit}) => {
  const [row, setRow] = useState(4);
  const [col, setCol] = useState(4);
  const [matrix, setMatrix] = useState([]);
  
  const onColChange = (event) => {
    setCol(event.target.value);
    setNewMatrix();
  };
  const onRowChange = (event) => {
    setRow(event.target.value);
    setNewMatrix();
  };
  const setNewMatrix = () => {
    if(row > 0 && col > 0){
      const new_arr = createEmptyArray(row, col); //issue is here
      setMatrix(new_arr);
    } else {
      setMatrix([]);
    }
  };
  return (
    <div>
      <NumForm text="Enter the number of rows:" number={row} onChange={onRowChange}/>
      <NumForm text="Enter the number of columns:" number={col} onChange={onColChange}/>
      <MatrixForm row={row} col={col} directed={false} matrix={matrix} setMatrix={setMatrix} onFormSubmit={onFormSubmit}/>
    </div>
  )
}
export default Matrix;


export const SquareMatrix = ({directed, onFormSubmit}) => {
  const [row, setRow]  = useState(4);
  const [matrix, setMatrix] = useState([]);

  const onChange = (event) => {
      setRow(event.target.value);
      if(row > 0){
        const new_arr = createEmptyArray(row, row); //issue is here
        setMatrix(new_arr);
      } else {
        setMatrix([]);
      }
  };
  return (
    <div>
      <NumForm text="Enter the number of rows/columns" number={row} onChange={onChange}/>
      <MatrixForm row={row} col={row} directed={directed} matrix={matrix} setMatrix={setMatrix} onFormSubmit={onFormSubmit}/>
    </div>
  )
}


function createEmptyArray(row, col){
    const array = Array.from({length: row}, () => Array.from ( { length: col}));
    return array;
}