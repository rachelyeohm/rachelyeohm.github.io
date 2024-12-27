import React , {useState, useEffect} from "react"
import createZeroArray from "../../utility/createZeroArray.tsx"
import MatrixSizeForm from "./MatrixSizeForm.tsx"
import MatrixForm from "./MatrixForm.tsx"

const Matrix = ({onFormSubmit} : {onFormSubmit : (matrix : string[][]) => void}) => {
    const [row, setRow] = useState(4);
    const [col, setCol] = useState(4);
    const [matrix, setMatrix] = useState<string[][]>([]);
    
    const onColChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      setCol(parseInt(event.target.value));
    };
    const onRowChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      setRow(parseInt(event.target.value));
    };
    useEffect(() => {
      if (row > 0 && col>0) {
        const newMatrix = createZeroArray(row, col);
        setMatrix(newMatrix);
      } else {
        setMatrix([]);
      }
    }, [row, col]);
  
          
    return (
      <div>
        <MatrixSizeForm text="Enter the number of rows" number={row} onChange={onRowChange}/>
        <MatrixSizeForm text="Enter the number of columns" number={col} onChange={onColChange}/>
        <MatrixForm directed={true} matrix={matrix} 
              setMatrix={setMatrix} onFormSubmit={onFormSubmit}/>
       
      </div>
    )
  }
  export default Matrix;


  type SquareMatrixProps = {
    directed: boolean,
    onFormSubmit: (matrix : number[][]) => void
  }

  export const SquareMatrix = ({directed, onFormSubmit} : SquareMatrixProps) => {
    const [row, setRow]  = useState(4);
    const [matrix, setMatrix] = useState<number[][]>([]);
  
    const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setRow(parseFloat(event.target.value));
    };
  
    useEffect(() => {
      if (row > 0) {
        const newMatrix : number[][] = createZeroArray(row, row);
        setMatrix(newMatrix);
      } else {
        setMatrix([]);
      }
    }, [row]);
  
  
    return (
      <div>
        <MatrixSizeForm text="Enter the number of rows/columns" number={row} onChange={onChange}/>
        <MatrixForm directed={directed} matrix={matrix} setMatrix={setMatrix} onFormSubmit={onFormSubmit}/>
      </div>
    )
  }