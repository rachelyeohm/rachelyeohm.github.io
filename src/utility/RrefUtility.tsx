
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

    //deep copies the arrays
    let matrix2 : number[][] = JSON.parse(JSON.stringify(matrix));
    let constMatrix2 : number[][] = JSON.parse(JSON.stringify(constMatrix));
    
    //credit goes to taylorrodriguez
    let lead = 0; //lead column
    for (let r = 0; r < rows; r++) {
        if (columns <= lead) {
            //exceeded number of columns
            return { coeffMatrix : matrix2, constMatrix : constMatrix2 } ;
        }
        let i = r;
        while (matrix2[i][lead] == 0) {
        i++;
        if (rows == i) {
            i = r;
            lead++;
            if (columns == lead) {
                return { coeffMatrix : matrix2, constMatrix : constMatrix2 } ;
            }
        }
        }
        let tmp = matrix2[i];
        matrix2[i] = matrix2[r];
        matrix2[r] = tmp;

        tmp = constMatrix2[i];
        constMatrix2[i] = constMatrix2[r];
        constMatrix2[r] = tmp;

        let val = matrix2[r][lead];
        for (let j = 0; j < columns; j++) {
            matrix2[r][j] /= val;  
        }
        constMatrix2[r][0] /= val;

        for (let i = 0; i < rows; i++) {
            if (i == r) continue;
            val = matrix2[i][lead];
            for (let j = 0; j < columns; j++) {
                matrix2[i][j] -= val * matrix2[r][j];
            }
            constMatrix2[i][0] -= val * constMatrix2[r][0]
        }
        lead++;
    }

    console.log("matrix: " + matrix)
    console.log("constMatrix: " + constMatrix)
    console.log("matrix2: " + matrix2)
    console.log("constMatrix2: " + constMatrix2)

    return { coeffMatrix : matrix2, constMatrix : constMatrix2 } ;
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