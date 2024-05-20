import React, {useState} from "react";


export function calcRREF(matrix : number[][]){
    const constMatrix : number[][] = [];
    for (let i=0; i < matrix.length; i++){
        constMatrix.push([0]);
    }
    const result : number[][] = calcAugmentedRREF(matrix, constMatrix);
    for (let i = 0; i < result.length; i++) {
        result[i].pop();
      }
    return result;

}

function calcAugmentedRREF(coeffMatrix : number[][], constMatrix : number[][]) {
    console.log(constMatrix);
    console.log(coeffMatrix);
    let nonZeroCoeff : number[][] = [];
    let nonZeroConst : number[][] = [];
    let zeroRow = Array(coeffMatrix[0].length).fill(0);
    let numZeroRows : number = 0;
    for (let i = 0; i < coeffMatrix.length; i++) {
        let isZeroRow = coeffMatrix[i].every(element => element === 0);

        if (isZeroRow) {
            if (constMatrix[i][0] === 0) { //complete zero row: dont add to the new matrix
                numZeroRows++;
                continue;
            } 
        }
        nonZeroCoeff.push(coeffMatrix[i].slice());
        nonZeroConst.push(constMatrix[i]);
    }
    const {matrix: resultCoeff, constMatrix: resultConst} = reduceToRREF(nonZeroCoeff, nonZeroConst);

    //add back zero rows.
    for (let i = 0; i < numZeroRows; i++) {
        resultCoeff.push(zeroRow);
        resultConst.push([0]);
    }
    return combineMatrices(resultCoeff, resultConst);
}

function reduceToRREF(matrix : number[][], constMatrix : number[][]) {
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

    return { matrix, constMatrix } ;
}

function findPivotColumnIndex(row : number[]){
    if (row.every(element => element === 0)) { //zero row: index is -1
        return -1; 
    }
    const pivotColumnIndex = row.findIndex(element => element !== 0);
    console.log("pivot column indexes: " + pivotColumnIndex);
    return pivotColumnIndex;
}

function findPivotIndexes(matrix : number[][]) {
    const rowCount = matrix.length;
    const colCount = matrix[0].length;
    const rowIndexes : number[] = [];
    const columnIndexes : number[] = [];

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

function combineMatrices(coeffMatrix : number[][], constMatrix : number[][]) {
    return coeffMatrix.map((row, index) => [...row, constMatrix[index][0]]);

}