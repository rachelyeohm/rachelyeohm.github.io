import React, { useState } from 'react';
import GraphCalc from "./GraphCalculations"
import Graph from "./Graph"
import KruskalCalc from "./KruskalCalculations"
import PrimCalc from "./PrimCalculations"

const MatrixForm = ({usecase, directed}) => {
  const [number, setNumber]  = useState({
    n:4
  });

  const handleNumChange = (event) => {
      setIsFormSubmitted(false);
      const { name, value } = event.target;
      setNumber({
        ...number,
        [name]: value // Update the specific field in the form data state
      });
      const num_rows = value;
      if(num_rows > 0){
        const new_arr = createEmptyArray(num_rows); //issue is here
        setMatrix(new_arr);

      } else {
        setMatrix([]);
      }
    };
    
  const handleNumSubmit = (event) => {
    event.preventDefault();
    const num_rows = event.target.value;
    setMatrix(createEmptyArray(num_rows));
  };

  const [matrix, setMatrix] = useState(
    createEmptyArray(number.n)
  );

  const handleInputChange = (rowIndex, colIndex, event) => {
    const { value } = event.target;
    const updatedMatrix = [...matrix];
    updatedMatrix[rowIndex][colIndex] = value;
    if (!directed){
      updatedMatrix[colIndex][rowIndex] = value;
    }
    setMatrix(updatedMatrix);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
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

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  return (
    <div>
          <form className = "general" onSubmit={handleNumSubmit}>
          <label>
              Enter number of rows/columns:   &nbsp; &nbsp;
              <input
              type="number"
              min = "0"
              step = "1"
              name="n"
              value={number.n}
              onChange={handleNumChange}
              />
          </label>
          </form>

        <p className = "general"> Input your adjacency matrix: </p>
        <form className="matrix-form" onSubmit={handleSubmit}>
            {matrix.length > 0 ? addBlanks() : null}
            <button className="button" type="submit">Submit</button>
        </form>
        {isFormSubmitted && (usecase === "visualisation" ? null : <KruskalCalc graphData={matrix} width={200} height={200}/>) }
        {isFormSubmitted && (usecase === "visualisation" ? <GraphCalc graphData={matrix}/> : <PrimCalc graphData={matrix} width={200} height={200}/>)}
    </div>
    
  );
};

export default MatrixForm;


function createEmptyArray(n) {
    const array = Array.from({
      // generate array of length m
      length: n
      // inside map function generate array of size n
      // and fill it with `0`
    }, () => Array.from ( { length: n}));
    
    return array;
  }
