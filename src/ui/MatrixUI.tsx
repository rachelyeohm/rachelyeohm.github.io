import { handleInputChangeArgProps } from "../components/matrix/MatrixTypes";

export function displayBlanks(matrix : string[][], matrixType : string, handleInputChange : 
    (props: handleInputChangeArgProps) => void){
    const numCols = matrix.length > 0 ?  matrix[0].length : 0;
    return (
        <div style = {{display: "flex", flexDirection: "column", flexWrap: "nowrap"}}>
            {
                matrix.map((row, rowIndex) => (
                    <div key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <input
                        key={colIndex}
                        value={cell}
                        onChange={(event) => handleInputChange({rowIndex, colIndex, event, matrixType})}
                        />
                    ))}
                    </div>
                ))
            }
        </div>
    )
    
  }