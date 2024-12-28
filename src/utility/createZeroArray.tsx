
export function createZeroArrayStr(row: number, col: number) : string[][] {
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



export default function createZeroArrayNum(row: number, col: number) : number[][] {
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