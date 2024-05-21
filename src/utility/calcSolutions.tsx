import { findPivotIndexes } from "./RrefUtility";
import { reduceToRREF } from "./RrefUtility";
import {Term} from "../components/terms/Term"

type calcSolutionsResults  = {
    rref : {coeffMatrix : number[][], constMatrix : number[][]}
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
    //generate range to represent columns of the coefficient matrix (so -1)
    const range: number[] = Array.from({ length: combinedMatrix[0].length-1 }, (_, i) => i);
    if (range.every(num => pivotIndexes.columnIndexes.includes(num))) {
        numSolutions = "1";
        solution = [generateVariableString(result.constMatrix.map(subArray => subArray[0]))]
    } else {
        numSolutions = "infinite";
        solution = calculateInfiniteSolutions(result.coeffMatrix, result.constMatrix, pivotIndexes);
    }

    
    return {rref: result, numSolutions : numSolutions, pivotColumns : pivotColumns, solution : solution}
}

function calculateInfiniteSolutions(coeffMatrix : number[][], 
    constMatrix: number[][], pivotIndexes : {rowIndexes: number[]; columnIndexes: number[];}) {
        const colIndexes = pivotIndexes.columnIndexes.filter(num => num < coeffMatrix.length - 1)
        
        const variables : string[] = generateVariableNames(constMatrix.map(subArray => subArray[0]));
        let allCols : number[] = Array.from({ length: coeffMatrix.length }, (_, i) => i);
        let nonPivotCols : number[] = [];
        let eqnArray : string[] = [];

        //stores the coefficient terms for each variable (represented by its column position)
        const coeffMap: Map<number, Term[]> = new Map<number, Term[]>();
        //stores the constant term for each variable (represented by its column position)
        const constMap: Map<number, number> = new Map<number, number>();

        //iterating through the columns
        for (let i = coeffMatrix[0].length - 1; i >= 0; i--) {
            console.error("column is now " + i)
            coeffMap.set(i, [])
            constMap.set(i, 0)
            //free variable / non-pivot column
            if (!colIndexes.includes(i)) {
                nonPivotCols.push(i)
                eqnArray.push(variables[i] + " is free")
                
            } else {
                //not a free variable
                console.error(nonPivotCols)
                const idx = pivotIndexes.columnIndexes.indexOf(i)
                const row = pivotIndexes.rowIndexes[idx]
                //for example if x + 3y + z = 1
                //add the rest of the variable (e.g. -3y -z) to x's equation
                for (const col of allCols) {
                    if (col > i) {
                        if (nonPivotCols.includes(col)) {
                            //if the column is a nonpivot column, add term as usual
                            const colTerm : Term = new Term(-coeffMatrix[row][col], variables[col])
                            const arr : Term[] =  (coeffMap.get(i) ?? [])
                            arr.push(colTerm)
                            coeffMap.set(i,arr)
                        } else {
                            //if the column is a pivot column
                            //we have to replace it with the representations of the free variables
                            let arr : Term[] = coeffMap.get(col) ?? []
                            //but we might have to multiply all terms by the coefficient
                            arr = arr.map((term : Term) => term.multiply(coeffMatrix[row][col]))
                            coeffMap.set(i, arr)
                            //add constant of representation of free variable
                            let freeVarConst : number = constMap.get(col) ?? 0
                            freeVarConst = freeVarConst * coeffMatrix[row][col]
                            constMap.set(i, (constMap.get(i) ?? 0) + freeVarConst)
                        }
                    }
                }
                //add the constant value (1) to x's equation
                constMap.set(i, constMatrix[row][0] + (constMap.get(i) ?? 0))
                
                eqnArray.push(variables[i] + " = " 
                        + summariseTerms(coeffMap.get(i)??[]).join(" + ") 
                        + " + " + (constMap.get(i)??0))
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

function summariseTerms(terms : Term[]) : Term[] {
    //basically if the eqn is 2x + 3x + 5y, itll summarise it to 5x + 5y
    let result : Term[] = []
    terms.reduce((subArr, term) => term.addTermToTermArray(subArr) , result)
    return result
}