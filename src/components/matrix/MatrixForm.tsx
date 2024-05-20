import React from "react"


type MatrixFormProps = {
    directed : boolean;
    matrix : number[][];
    setMatrix : React.Dispatch<React.SetStateAction<number[][]>>;
    onFormSubmit : (matrix : number[][]) => void;
  }



const MatrixForm = ({directed, matrix, setMatrix, onFormSubmit} : MatrixFormProps) => { //for matrix and submission without input rows
  
  //const [localMatrix, setLocalMatrix] = useState(matrix);
  
  const handleInputChange = (rowIndex : number, colIndex : number, event : React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedMatrix = matrix.map((row, i) => {
      if (i === rowIndex) {
        return row.map((cell, j) => j === colIndex ? parseInt(value) : cell);
      } else if (!directed && colIndex < matrix.length && rowIndex < matrix[i].length) {
        return row.map((cell, j) => j === rowIndex ? parseInt(value) : cell);
      }
      return row;
    });
    setMatrix(updatedMatrix);
  };

  const handleSubmit = (event : React.ChangeEvent<HTMLFormElement>) => {
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
        <p className = "general"> Input your matrix: </p>
        <form className="matrix-form" onSubmit={handleSubmit}>
            {matrix.length > 0 ? addBlanks() : null}
            <button className="button" type="submit">Submit</button>
        </form>
    </div>

  )

};
export default MatrixForm;