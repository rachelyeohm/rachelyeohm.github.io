interface AugmentedMatrixFormProps {
    coefficientMatrix : number[][];
    setCoefficientMatrix :  React.Dispatch<React.SetStateAction<number[][]>>;
    constantsMatrix : number[][];
    setConstantsMatrix :  React.Dispatch<React.SetStateAction<number[][]>>;
    onFormSubmit: (coeffMatrix : number[][], constMatrix : number[][]) => void;

}

const AugmentedMatrixForm = ({coefficientMatrix, setCoefficientMatrix, constantsMatrix, setConstantsMatrix, onFormSubmit} : AugmentedMatrixFormProps) => {


    const handleInputChange = (rowIndex : number, 
        colIndex : number, event : React.ChangeEvent<HTMLInputElement>, matrixType : string) => {
      const { value } = event.target;
      if (matrixType === 'coefficient') {
        const updatedMatrix = coefficientMatrix.map((row, i) => {
            if (i === rowIndex) {
              return row.map((cell, j) => j === colIndex ? parseInt(value) : cell);
            } 
            return row;
          });
        setCoefficientMatrix(updatedMatrix);
      } else {
        const updatedMatrix = constantsMatrix.map((row, i) => {
            if (i === rowIndex) {
              return row.map((cell, j) => j === colIndex ? parseInt(value) : cell);
            } 
            return row;
          });
        setConstantsMatrix(updatedMatrix);
      }
    };
  
    const handleSubmit = (event : React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      onFormSubmit(coefficientMatrix, constantsMatrix);
    };
  
    function addBlanks(matrix : number[][], matrixType : string){
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
            
  
            {/* Constants Matrix */}
            <div className = "content">
                {addBlanks(constantsMatrix, 'constants')}
                <div className = "line"></div>
                
            </div>
            
          </div>
          <button className="button" type="submit">Submit</button>
      </form>
      </div>
  
    );
  
  }

export default AugmentedMatrixForm