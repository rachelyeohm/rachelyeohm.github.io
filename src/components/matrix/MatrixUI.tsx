import { handleInputChangeArgProps } from "./MatrixTypes";

export function displayBlanks(matrix : string[][], matrixType : string, handleInputChange : 
    (props: handleInputChangeArgProps) => void){
    return matrix.map((row, rowIndex) => (
              <div key={rowIndex}>
              {row.map((cell, colIndex) => (
                  <input
                  key={colIndex}
                  value={cell}
                  onChange={(event) => handleInputChange({rowIndex, colIndex, event, matrixType})}
                  />
              ))}
              </div>
          ));
  }