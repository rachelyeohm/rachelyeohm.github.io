export default function convertMatrixStrToFloat(matrix : string[][]) {
    return matrix.map(row => row.map(elem => parseFloat(elem)));
}