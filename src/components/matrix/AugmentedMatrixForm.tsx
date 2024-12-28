import { handleInputChangeArgProps } from "./MatrixTypes";
import { displayBlanks } from "./MatrixUI";

interface AugmentedMatrixFormProps {
    coefficientMatrix : string[][];
    setCoefficientMatrix :  React.Dispatch<React.SetStateAction<string[][]>>;
    constantsMatrix : string[][];
    setConstantsMatrix :  React.Dispatch<React.SetStateAction<string[][]>>;
    onFormSubmit: (coeffMatrix : string[][], constMatrix : string[][]) => void;

}

const AugmentedMatrixForm = ({coefficientMatrix, setCoefficientMatrix, constantsMatrix, setConstantsMatrix, onFormSubmit} : 
  AugmentedMatrixFormProps) => {


    const handleInputChange = ({rowIndex, colIndex, event, matrixType} : handleInputChangeArgProps) => {
      const { value } = event.target;
      const regex = /^[-]?\d*\.?\d*$/;
      if (!regex.test(value)) {
        event.target.value = value;
      } else {
        if (matrixType === 'coefficient') {
          const updatedMatrix = coefficientMatrix.map((row, i) => {
              if (i === rowIndex) {
                return row.map((cell, j) => j === colIndex ? value : cell);
              } 
              return row;
            });
          setCoefficientMatrix(updatedMatrix);
        } else {
          const updatedMatrix = constantsMatrix.map((row, i) => {
              if (i === rowIndex) {
                return row.map((cell, j) => j === colIndex ? value : cell);
              } 
              return row;
            });
          setConstantsMatrix(updatedMatrix);
        }
      }
    };
  
    const handleSubmit = (event : React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      onFormSubmit(coefficientMatrix, constantsMatrix);
    };

  
    return (
      <div>
        <form className='matrix-form' onSubmit={handleSubmit}>
          <div  style={{ display: 'flex'}}>
            {/* Coefficient Matrix */}
            <div>
              {displayBlanks(coefficientMatrix, 'coefficient', handleInputChange)}
            </div>
            
  
            {/* Constants Matrix */}
            <div className = "content">
                {displayBlanks(constantsMatrix, 'constants', handleInputChange)}
                <div className = "line"></div>
                
            </div>
            
          </div>
          <button className="button" type="submit">Submit</button>
      </form>
      </div>
  
    );
  
  }

export default AugmentedMatrixForm