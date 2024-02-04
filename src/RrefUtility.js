import './App.css';
import React, {useState} from "react";


export function calcRREF(matrix){
    const constMatrix = [];
    for (let i=0; i < matrix.length; i++){
        constMatrix.push([0]);
    }
    const result = calcAugmentedRREF(matrix, constMatrix);
    for (let i = 0; i < result.length; i++) {
        result[i].pop();
      }
    return result;

}
function calcAugmentedRREF(coeffMatrix, constMatrix) {
    console.log(constMatrix);
    console.log(coeffMatrix);
    coeffMatrix = coeffMatrix.map(innerArray => innerArray.map(element => parseInt(element, 10)));
    constMatrix = constMatrix.map(innerArray => innerArray.map(element => parseInt(element, 10)));
    let nonZeroCoeff = [];
    let nonZeroConst = [];
    let zeroRow = Array(coeffMatrix[0].length).fill(0);
    for (let i = 0; i < coeffMatrix.length; i++) {
        let isZeroRow = coeffMatrix[i].every(element => element === 0);

        if (isZeroRow) {
            if (constMatrix[i][0] === 0) { //complete zero row: dont add to the new matrix
                continue;
            } else {
                return -1; // coefficients are zero and constant is nonzero => inconsistent
            }
        }
        nonZeroCoeff.push(coeffMatrix[i].slice());
        nonZeroConst.push(constMatrix[i]);
    }

    const {matrix: resultCoeff, constMatrix: resultConst} = reduceToRREF(nonZeroCoeff, nonZeroConst);

    //add back zero rows.
    for (let i = 0; i < coeffMatrix.length - nonZeroCoeff.length; i++) {
        resultCoeff.push(zeroRow);
        resultConst.push([0]);
    }
    return combineMatrices(resultCoeff, resultConst);
}

function reduceToRREF(matrix, constMatrix) {
    let lead = 0; // leading column
    const rowCount = matrix.length;
    const colCount = matrix[0].length;
    console.log(matrix);
    console.log(constMatrix);
    for (let r = 0; r < rowCount; r++) { // for each row
        if (colCount <= lead) { // lead column has been found.
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

        if (colCount > lead) { // must iterate through all columns first
            let temp = matrix[i];
            matrix[i] = matrix[r];
            matrix[r] = temp;

            // Switch the corresponding row in the constant matrix [CHANGED]
            let tempConst = constMatrix[i];
            constMatrix[i] = constMatrix[r];
            constMatrix[r] = tempConst;

            let val = matrix[r][lead];

            // Check if the divisor (val) is not zero before performing operations
            if (val !== 0) {
                for (let j = 0; j < colCount; j++) {
                    matrix[r][j] /= val;
                }

                // Divide the corresponding element in the constant matrix by val [CHANGED]
                constMatrix[r][0] /= val;

                // Perform row operations on both the coefficient matrix and the constant matrix
                for (let i = 0; i < rowCount; i++) {
                    if (i !== r) {
                        val = matrix[i][lead];
                        for (let j = 0; j < colCount; j++) {
                            matrix[i][j] -= val * matrix[r][j];
                        }
                        constMatrix[i][0] -= val * constMatrix[r][0];
                    }
                }
            }
        }

        lead++;
    }

    return { matrix, constMatrix };
}

function findPivotColumnIndex(row){
    if (row.every(element => element === 0)) { //zero row: index is -1
        return -1; 
    }
    const pivotColumnIndex = row.findIndex(element => element !== 0);
    console.log("pivot column indexes: " + pivotColumnIndex);
    return pivotColumnIndex;
}

function findPivotIndexes(matrix) {
    const rowCount = matrix.length;
    const colCount = matrix[0].length;
    const rowIndexes = [];
    const columnIndexes = [];

    for (let r = 0; r < rowCount; r++) {
        const pivotColumnIndex = findPivotColumnIndex(matrix[r]);

        if (pivotColumnIndex != -1) { //-1 means zero row => skip //changed
            rowIndexes.push(r);
            columnIndexes.push(pivotColumnIndex);
        }
    }
    console.log("pivot indexes:");
    console.log({rowIndexes, columnIndexes});
    return { rowIndexes, columnIndexes };
}

function combineMatrices(coeffMatrix, constMatrix) {
    const rowCount = coeffMatrix.length;
    const combinedMatrix = new Array(rowCount);

    for (let i = 0; i < rowCount; i++) {
        combinedMatrix[i] = [...coeffMatrix[i], ...constMatrix[i]];
    }

    return combinedMatrix;
}

export const calcNumberOfSolutions = (coeffMatrix, constMatrix) => {
    let combinedMatrix = calcAugmentedRREF(coeffMatrix, constMatrix);
    if (combinedMatrix === -1) {
        return "zero"
    }
    
    combinedMatrix = combinedMatrix.filter((row)=>!row.every(val => val === 0)); //filtering out zero rows
    const { rowIndexes, columnIndexes } = findPivotIndexes(combinedMatrix);
    // if any is the last column, zero solutions.
    // if anything from 0 to 3 doesnt exist, then infinite solutions!
    
    console.log(combinedMatrix);

    const rowCount = combinedMatrix.length;
    const colCount = combinedMatrix[0].length;

    for (let i = 0; i < columnIndexes.length; i++) {
        if (columnIndexes[i] === colCount) {
            return "zero";
        }
    }
    if (columnIndexes.length === colCount-1) {
        return "one";
    } else {
        return "infinity";
    }
    
}