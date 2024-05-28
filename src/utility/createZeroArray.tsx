
export default function createZeroArray(row: number, col: number) : number[][] {
    const array : number[][] = [];
    for (let i = 0; i < row; i++) {
      const row: number[] = [];
      for (let j = 0; j < col; j++) {
          row.push(0);
      }
      array.push(row);
    }
    return array;
}