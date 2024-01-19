import './App.css';
import React, {useState} from "react";
import Matrix from "./Matrix"

const RREF = () => {
    const [submittedMatrix, setSubmittedMatrix] = useState([]);
    const handleFormSubmit = (matrix) => {
        setSubmittedMatrix(matrix);
    }
  
    return (
      <div>
        <div>
            <Matrix onFormSubmit={handleFormSubmit}/>
            {submittedMatrix.length === 0 ? null : <DisplayRREF array={submittedMatrix}/>}

        </div>
            
      </div>
        
    );
  };
export default RREF;

export function calcRREF(array){
    
    array = array.map(innerArray =>innerArray.map(element => parseInt(element, 10)));

    function reduceToRREF(matrix) {
        let lead = 0; //leading column 
        const rowCount = matrix.length;
        const colCount = matrix[0].length;
    
        for (let r = 0; r < rowCount; r++) { //for each row
            if (colCount <= lead) { //lead column has been found.
                break;
            }
    
            let i = r;
    
            while (matrix[i][lead] === 0) {
                i++;
                if (rowCount === i) {
                    i = r;
                    lead++;
                    if (colCount === lead) {
                        break;
                    }
                }
            }
    
            if (colCount > lead) { //must iterate through all columns first 
                let temp = matrix[i];
                matrix[i] = matrix[r];
                matrix[r] = temp;
    
                let val = matrix[r][lead];
    
                // Check if the divisor (val) is not zero before performing operations
                if (val !== 0) {
                    for (let j = 0; j < colCount; j++) {
                        matrix[r][j] /= val;
                    }
    
                    for (let i = 0; i < rowCount; i++) {
                        if (i !== r) {
                            val = matrix[i][lead];
                            for (let j = 0; j < colCount; j++) {
                                matrix[i][j] -= val * matrix[r][j];
                            }
                        }
                    }
                }
            }
    
            lead++;
        }
  
        return matrix;
    }

    function moveZeroRows(array){
        let result = array.filter((row)=>!row.every(val => val === 0));
        let zeroRow = Array(array[0].length).fill(0);
        
        result = reduceToRREF(result);
        for (let i=0; i < array.length - result.length; i++){
            result.push(zeroRow);
        }
        return result;
    }

    
    const result= moveZeroRows(array);
    
    return result;

}

// export function solveLinearSystem(matrix, constMatrix) {
//     const augmentedMatrix = matrix.map((row, index) => [...row, constMatrix[index][0]]);
//     const rowCount = augmentedMatrix.length;
//     const colCount = augmentedMatrix[0].length;
//     let lead = 0;

//     for (let r = 0; r < rowCount; r++) {
//         if (colCount <= lead) {
//             break;
//         }

//         let i = r;

//         while (augmentedMatrix[i][lead] === 0) {
//             i++;
//             if (rowCount === i) {
//                 i = r;
//                 lead++;
//                 if (colCount === lead) {
//                     break;
//                 }
//             }
//         }

//         if (colCount > lead) {
//             let temp = augmentedMatrix[i];
//             augmentedMatrix[i] = augmentedMatrix[r];
//             augmentedMatrix[r] = temp;

//             let val = augmentedMatrix[r][lead];

//             if (val !== 0) {
//                 for (let j = 0; j < colCount; j++) {
//                     augmentedMatrix[r][j] /= val;
//                 }

//                 for (let i = 0; i < rowCount; i++) {
//                     if (i !== r) {
//                         val = augmentedMatrix[i][lead];
//                         for (let j = 0; j < colCount; j++) {
//                             augmentedMatrix[i][j] -= val * augmentedMatrix[r][j];
//                         }
//                     }
//                 }
//             }
//         }

//         lead++;
//     }

//     // Extract the solution column vector
//     const solutionVector = augmentedMatrix.map(row => [row[colCount - 1]]);

//     return solutionVector;
// }

function findPivotColumnIndex(row){
    if (row.every(element => element === 0)) { //zero row: index is -1
        return -1;
    }
    const pivotColumnIndex = row.findIndex(element => element !== 0);
    return pivotColumnIndex;
}

function findPivotIndexes(matrix) {
    const rowCount = matrix.length;
    const colCount = matrix[0].length;
    const rowIndexes = [];
    const columnIndexes = [];

    for (let r = 0; r < rowCount; r++) {
        const pivotColumnIndex = findPivotColumnIndex(matrix[r]);

        if (pivotColumnIndex !== -1) { //-1 means zero row => skip
            rowIndexes.push(r);
            columnIndexes.push(pivotColumnIndex);
        }
    }

    return { rowIndexes, columnIndexes };
}

export function findNumberOfSolutions(matrix){
    const { rowIndexes, columnIndexes } = findPivotIndexes(matrix);

    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    const hasPivotInEveryColumn = Array.from({ length: colCount }, (_, index) => index).every(columnIndex =>
        columnIndexes.includes(columnIndex)
    );

    const hasPivotInEveryRow = Array.from({ length: rowCount }, (_, index) => index).every(rowIndex =>
        rowIndexes.includes(rowIndex)
    );

    if (hasPivotInEveryRow) {
        if (hasPivotInEveryColumn) {
            return "1";
        } else {
            return "infinity";
        }
    } else {
        return "0";
    }
}
  
function DisplayRREF({array}){
    const result = calcRREF(array);

    return (
        <div className="general">
            <p>The reduced row-echelon form of the matrix is:</p>
            <table>
            <tbody>
                {result.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                    <React.Fragment key={cellIndex}>
                        <td>{cell}</td>
                        {cellIndex !== row.length - 1 && <td className="line"></td>}
                    </React.Fragment>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
      ); 
}
  
  