import { findPivotIndexes } from "./RrefUtility";
import { reduceToRREF } from "./RrefUtility";


type calcSolutionsResults  = {
    numSolutions : string;
    pivotColumns : string;
    solution : string[];
}
export default function calcSolutions(coeffMatrix : number[][], constMatrix : number[][]) : calcSolutionsResults{

    const result = reduceToRREF(coeffMatrix, constMatrix)
    
    const combinedMatrix : number[][] = result.coeffMatrix.map((row, index) =>
                                 row.concat(result.constMatrix[index]));


    let numSolutions = "";
    let pivotColumns = convertToPivotIndex(result.coeffMatrix, result.constMatrix);
    let solution = [];


    //last row has a pivot column - inconsistent
    const pivotIndexes = findPivotIndexes(combinedMatrix);
    if (pivotIndexes.rowIndexes.includes(combinedMatrix.length - 1)) {
        numSolutions = "0";
        solution = ["nil"];
    }

    //all rows (except the last row) have pivot column - one solution;
    //generate range to represent columns of the coefficient matrix
    const range: number[] = Array.from({ length: combinedMatrix[0].length-1 }, (_, i) => i);
    if (range.every(num => pivotIndexes.columnIndexes.includes(num))) {
        numSolutions = "1";
        solution = [generateVariableString(result.constMatrix.map(subArray => subArray[0]))]
    } else {
        numSolutions = "infinite";
        solution = calculateInfiniteSolutions(coeffMatrix, constMatrix, pivotIndexes);
    }

    
    return {numSolutions : numSolutions, pivotColumns : pivotColumns, solution : solution}
}

function calculateInfiniteSolutions(coeffMatrix : number[][], 
    constMatrix: number[][], pivotIndexes : {rowIndexes: number[]; columnIndexes: number[];}) {
        const colIndexes = pivotIndexes.columnIndexes.filter(num => num < coeffMatrix.length - 1)
        
        const variables : string[] = generateVariableNames(constMatrix.map(subArray => subArray[0]));
        
        let nonPivotCols : number[] = [];
        let eqnArray : string[] = [];

        //iterating through the columns
        for (let i = coeffMatrix[0].length - 1; i >= 0; i--) {
            //free variable / non-pivot column
            if (!colIndexes.includes(i)) {
                nonPivotCols.push(i)
                eqnArray.push(variables[i] + " is free")
                
            } else {
                //not a free variable
                const idx = pivotIndexes.columnIndexes.indexOf(i)
                const row = pivotIndexes.rowIndexes[idx]
                let elementArray : string[] = [];
                for (const col of nonPivotCols) {
                    elementArray.push((-coeffMatrix[row][col]).toString())
                }
                if (constMatrix[row][0] != 0) {
                    elementArray.push((-constMatrix[row][0]).toString() + variables[idx])
                }
                
                eqnArray.push(variables[i] + " = " + elementArray.join(" + "))
            }
        }
        return eqnArray.reverse()

        
}

function convertToPivotIndex(coeffMatrix : number[][], constMatrix: number[][]) : string {
    const pivotIndexes : number[] = findPivotIndexes(coeffMatrix.map((row, index) => row.concat(constMatrix[index]))).columnIndexes;
    return [...new Set(pivotIndexes)].join(", ")
}

function generateVariableString(matrix: number[]): string {
    
    const variables : string[] = generateVariableNames(matrix)
    // Map the numbers to their corresponding variables and join them into a string
    const result = matrix.map((value, index) => `${variables[index]} = ${value.toFixed(3)}`).join(', ');
  
    return result;
  }

function generateVariableNames(matrix : number[]) {
    const baseVariables : string[] = ['z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
  
    // Check if the matrix length exceeds the available variable names
    if (matrix.length > baseVariables.length) {
      throw new Error('Matrix is too large to be mapped to single-letter variables.');
    }
  
    // Slice the required number of variable names
    return baseVariables.slice(0, matrix.length).reverse();
}