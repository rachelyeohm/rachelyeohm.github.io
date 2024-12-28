import { Button } from "antd";
import {createZeroArrayStr} from "../../utility/createZeroArray";
import { handleInputChangeArgProps } from "./MatrixTypes";
import { displayBlanks } from "../../ui/MatrixUI";

interface AugmentedMatrixFormProps {
    coefficientMatrix : string[][];
    setCoefficientMatrix :  React.Dispatch<React.SetStateAction<string[][]>>;
    constantsMatrix : string[][];
    setConstantsMatrix :  React.Dispatch<React.SetStateAction<string[][]>>;
    handleFormSubmit: (coeffMatrix : string[][], constMatrix : string[][]) => void;

}

const AugmentedMatrixForm = ({coefficientMatrix, setCoefficientMatrix, constantsMatrix, setConstantsMatrix, 
  handleFormSubmit: handleFormSubmit} : AugmentedMatrixFormProps) => {


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

    const handleReset = (coefficientMatrix : string[][], constantsMatrix : string[][]) => {
      setCoefficientMatrix(createZeroArrayStr(coefficientMatrix.length, coefficientMatrix.length > 0 ? coefficientMatrix[0].length : 0));
      setCoefficientMatrix(createZeroArrayStr(constantsMatrix.length, constantsMatrix.length > 0 ? constantsMatrix[0].length : 0));
    }


  
    return (
      <div>
        <form className='matrix-form'>
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
      </form>
      <div className = "form-actions">
          <Button size = "large" onClick = {() => handleReset(coefficientMatrix, constantsMatrix)}>{"Reset"}</Button>
          <Button size="large" onClick = {() => handleFormSubmit(coefficientMatrix, constantsMatrix)}>{"Submit"}</Button>
      </div>
      </div>
  
    );
  
  }

export default AugmentedMatrixForm