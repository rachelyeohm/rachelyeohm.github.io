
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
    if (numZeroRows == coeffMatrix.length) {
        return combineMatrices(coeffMatrix, constMatrix);
    }
    const result : {coeffMatrix : number[][], constMatrix : number[][]}= reduceToRREF(nonZeroCoeff, nonZeroConst);

    //add back zero rows.
    for (let i = 0; i < numZeroRows; i++) {
        result.coeffMatrix.push(zeroRow);
        result.constMatrix.push([0]);
    }
    return combineMatrices(result.coeffMatrix, result.constMatrix);
}

export function reduceToRREF(matrix : number[][], constMatrix : number[][]) : {coeffMatrix : number[][], constMatrix : number[][]}{
    const rows = matrix.length;
    const columns = matrix[0].length;
    
    //credit goes to taylorrodriguez
    let lead = 0; //lead column
    for (let r = 0; r < rows; r++) {
        if (columns <= lead) {
            //exceeded number of columns
            return { coeffMatrix : matrix, constMatrix : constMatrix } ;
        }
        let i = r;
        while (matrix[i][lead] == 0) {
        i++;
        if (rows == i) {
            i = r;
            lead++;
            if (columns == lead) {
                return { coeffMatrix : matrix, constMatrix : constMatrix } ;
            }
        }
        }
        let tmp = matrix[i];
        matrix[i] = matrix[r];
        matrix[r] = tmp;

        tmp = constMatrix[i];
        constMatrix[i] = constMatrix[r];
        constMatrix[r] = tmp;

        let val = matrix[r][lead];
        for (let j = 0; j < columns; j++) {
            matrix[r][j] /= val;  
        }
        constMatrix[r][0] /= val;

        for (let i = 0; i < rows; i++) {
            if (i == r) continue;
            val = matrix[i][lead];
            for (let j = 0; j < columns; j++) {
                matrix[i][j] -= val * matrix[r][j];
            }
            constMatrix[i][0] -= val * constMatrix[r][0]
        }
        lead++;
    }

    console.log("matrix: " + matrix)
    console.log("constMatrix: " + constMatrix)

    return { coeffMatrix : matrix, constMatrix : constMatrix } ;
}

//take a row as input, find the pivot column index.
function findPivotColumnIndex(row : number[]){
    if (row.every(element => element === 0)) { //zero row: index is -1
        return -1; 
    }
    const pivotColumnIndex = row.findIndex(element => element !== 0);
    //console.log("pivot column indexes: " + pivotColumnIndex);
    return pivotColumnIndex;
}

export function findPivotIndexes(matrix : number[][]) {
    const rowCount = matrix.length;
    const rowIndexes : number[] = [];
    const columnIndexes : number[] = [];

    for (let r = 0; r < rowCount; r++) {
        const pivotColumnIndex = findPivotColumnIndex(matrix[r]);

        if (pivotColumnIndex != -1) { //-1 means zero row => skip //changed
            rowIndexes.push(r);
            columnIndexes.push(pivotColumnIndex);
        }
    }
    // console.log("pivot indexes:");
    // console.log({rowIndexes, columnIndexes});
    return { rowIndexes, columnIndexes };
}

function combineMatrices(coeffMatrix : number[][], constMatrix : number[][]) {
    return coeffMatrix.map((row, index) => [...row, constMatrix[index][0]]);

}