import React, { useState, useEffect } from 'react';

type NumFormProps =  {
    text : string;
    number : number;
    onChange : (e) => void;
}

const NumForm = ({text, number, onChange} : NumFormProps) => { //form format for entering of rows / columns
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

const MatrixForm = ({directed, matrix, setMatrix, onFormSubmit}) => { //for matrix and submission without input rows
  
  //const [localMatrix, setLocalMatrix] = useState(matrix);
  
  const handleInputChange = (rowIndex, colIndex, event) => {
    const { value } = event.target;
    const updatedMatrix = [...matrix];
    updatedMatrix[rowIndex][colIndex] = value;
    if (!directed){
      updatedMatrix[colIndex][rowIndex] = value;
    }
    //setLocalMatrix(updatedMatrix);
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
        <p className = "general"> Input your matrix: </p>
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
  const [matrix, setMatrix] = useState<number[][] | null>([]);
  
  const onColChange = (event) => {
    setCol(event.target.value);
  };
  const onRowChange = (event) => {
    setRow(event.target.value);
  };
  useEffect(() => {
    if (row > 0 && col>0) {
      const newMatrix = createZeroArray(row, col);
      setMatrix(newMatrix);
    } else {
      setMatrix([]);
    }
  }, [row, col]);

  return (
    <div>
      <NumForm text="Enter the number of rows" number={row} onChange={onRowChange}/>
      <NumForm text="Enter the number of columns" number={col} onChange={onColChange}/>
      <MatrixForm directed={true} matrix={matrix} 
            setMatrix={setMatrix} onFormSubmit={onFormSubmit}/>
    </div>
  )
}
export default Matrix;


export const SquareMatrix = ({directed, onFormSubmit}) => {
  const [row, setRow]  = useState(4);
  const [matrix, setMatrix] = useState<number[][] | null>([]);

  const onChange = (event) => {
      setRow(event.target.value);
  };

  useEffect(() => {
    if (row > 0) {
      const newMatrix = createZeroArray(row, row);
      setMatrix(newMatrix);
    } else {
      setMatrix([]);
    }
  }, [row]);


  return (
    <div>
      <NumForm text="Enter the number of rows/columns" number={row} onChange={onChange}/>
      <MatrixForm directed={directed} matrix={matrix} setMatrix={setMatrix} onFormSubmit={onFormSubmit}/>
    </div>
  )
}

export const AugmentedMatrix  = ({onFormSubmit}) => {
    const [row, setRow]  = useState(4); //length of coefficient matrix
    const [col, setCol] = useState(4); //length of coefficient matrix
    const [coefficientMatrix, setCoefficientMatrix] = useState<number[][] | null>([]);
    const [constantsMatrix, setConstantsMatrix] = useState<number[][] | null>([]);

    const onColChange = (event) => {
      setCol(event.target.value);
    };
    const onRowChange = (event) => {
      setRow(event.target.value);
    };

    useEffect(() => {
      if (row > 0 && col > 0) {
        const newMatrix = createZeroArray(row, col);
        const newConstMatrix = createZeroArray(row, 1);
        setCoefficientMatrix(newMatrix);
        setConstantsMatrix(newConstMatrix);
      } else {
        setCoefficientMatrix([]);
        setConstantsMatrix([]);
      }
    }, [row, col]);

    
  
    return (
      <div>
        <NumForm text="Enter the number of rows" number={row} onChange={onRowChange}/>
        <NumForm text="Enter the number of columns" number={col} onChange={onColChange}/>
        <AugmentedMatrixForm coefficientMatrix={coefficientMatrix} setCoefficientMatrix={setCoefficientMatrix} constantsMatrix={constantsMatrix} setConstantsMatrix={setConstantsMatrix} onFormSubmit={onFormSubmit}/>
      </div>
    )
  }



export const AugmentedMatrixForm = ({coefficientMatrix, setCoefficientMatrix, constantsMatrix, setConstantsMatrix, onFormSubmit}) => {


  const handleInputChange = (rowIndex, colIndex, event, matrixType) => {
    const { value } = event.target;
    const updatedMatrix = matrixType === 'coefficient' ? [...coefficientMatrix] : [...constantsMatrix];
    updatedMatrix[rowIndex][colIndex] = value;
    if (matrixType === 'coefficient') {
      setCoefficientMatrix(updatedMatrix);
    } else {
      setConstantsMatrix(updatedMatrix);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(coefficientMatrix, constantsMatrix);
  };

  function addBlanks(matrix, matrixType){
    return matrix.map((row, rowIndex) => (
              <div key={rowIndex}>
              {row.map((cell, colIndex) => (
                  <input
                  key={colIndex}
                  type="number"
                  min = "0"
                  step = "1"
                  value={cell}
                  onChange={(event) => handleInputChange(rowIndex, colIndex, event, matrixType)}
                  />
              ))}
              </div>
          ));
  };

  return (
    <div>
      <form className='matrix-form' onSubmit={handleSubmit}>
        <div  style={{ display: 'flex'}}>
          {/* Coefficient Matrix */}
          <div>
            {addBlanks(coefficientMatrix, 'coefficient')}
          </div>
          

          {/* Vertical Line */}
          <div className="vertical-line-container">
              <div className="vertical-line"></div>
          </div>
          

          {/* Constants Matrix */}
          <div>
              {addBlanks(constantsMatrix, 'constants')}
          </div>
          
        </div>
        <button className="button" type="submit">Submit</button>
    </form>
    </div>

  );

}


function createZeroArray(row: number, col: number) : number[][] {
    const array : number[][] = [];
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}