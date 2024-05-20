import { findPivotIndexes } from "./RrefUtility";
import { reduceToRREF } from "./RrefUtility";


type calcSolutionsResults  = {
    numSolutions : string;
    pivotColumns : string;
    solution : string;
}
export default function calcSolutions(coeffMatrix : number[][], constMatrix : number[][]) : calcSolutionsResults{

    const result = reduceToRREF(coeffMatrix, constMatrix)
    
    const combinedMatrix : number[][] = result.coeffMatrix.map((row, index) =>
                                 row.concat(result.constMatrix[index]));


    let numSolutions = "";
    let pivotColumns = convertToPivotIndex(result.coeffMatrix, result.constMatrix);
    let solution = "";


    //last row has a pivot column - inconsistent
    const pivotIndexes = findPivotIndexes(combinedMatrix);
    if (pivotIndexes.rowIndexes.includes(combinedMatrix.length - 1)) {
        numSolutions = "0";
        solution = "nil";
    }

    //all rows (except the last row) have pivot column - one solution;
    const range: number[] = Array.from({ length: combinedMatrix.length-2 }, (_, i) => i);
    if (range.every(num => pivotIndexes.rowIndexes.includes(num))) {
        numSolutions = "1";
        solution = generateVariableString(result.constMatrix.map(subArray => subArray[0]))
    } else {
        numSolutions = "infinite";
        solution = "???";
    }

    
    return {numSolutions : numSolutions, pivotColumns : pivotColumns, solution : solution}
}

function convertToPivotIndex(coeffMatrix : number[][], constMatrix: number[][]) : string {
    const pivotIndexes : number[] = findPivotIndexes(coeffMatrix.map((row, index) => row.concat(constMatrix[index]))).columnIndexes;
    return [...new Set(pivotIndexes)].join(", ")
}

function generateVariableString(matrix: number[]): string {
    const baseVariables = ['z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
  
    // Check if the matrix length exceeds the available variable names
    if (matrix.length > baseVariables.length) {
      throw new Error('Matrix is too large to be mapped to single-letter variables.');
    }
  
    // Slice the required number of variable names
    const variables = baseVariables.slice(0, matrix.length).reverse();
  
    // Map the numbers to their corresponding variables and join them into a string
    const result = matrix.map((value, index) => `${variables[index]} = ${value.toFixed(3)}`).join(', ');
  
    return result;
  }