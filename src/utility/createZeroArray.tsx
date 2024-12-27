
export default function createZeroArray(row: number, col: number) : string[][] {
    const array : string[][] = [];
    for (let i = 0; i < row; i++) {
      const row: string[] = [];
      for (let j = 0; j < col; j++) {
          row.push('0');
      }
      array.push(row);
    }
    return array;
}