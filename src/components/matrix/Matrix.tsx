import React , {useState, useEffect} from "react"
import {createZeroArrayStr} from "../../utility/createZeroArray.tsx"
import MatrixSizeForm from "./MatrixSizeForm.tsx"
import MatrixForm from "./MatrixForm.tsx"

const Matrix = ({handleFormSubmit: handleFormSubmit} : {handleFormSubmit : (matrix : string[][]) => void}) => {
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
      const newMatrix = createZeroArrayStr(row, col);
      setMatrix(newMatrix);
      
    }, [row, col]);
  
          
    return (
      <div>
        <MatrixSizeForm text="Enter the number of rows" number={row} onChange={onRowChange}/>
        <MatrixSizeForm text="Enter the number of columns" number={col} onChange={onColChange}/>
        <MatrixForm directed={true} matrix={matrix} 
              setMatrix={setMatrix} handleFormSubmit={handleFormSubmit}/>
       
      </div>
    )
  }
  export default Matrix;


  type SquareMatrixProps = {
    directed: boolean,
    onFormSubmit: (matrix : string[][]) => void
  }

  export const SquareMatrix = ({directed, onFormSubmit} : SquareMatrixProps) => {
    const [row, setRow]  = useState(4);
    const [matrix, setMatrix] = useState<string[][]>([]);
  
    const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setRow(parseFloat(event.target.value));
    };
  
    useEffect(() => {
      const newMatrix : string[][] = createZeroArrayStr(row, row);
      setMatrix(newMatrix);
      
    }, [row]);
  
  
    return (
      <div>
        <MatrixSizeForm text="Enter the number of rows/columns" number={row} onChange={onChange}/>
        <MatrixForm directed={directed} matrix={matrix} setMatrix={setMatrix} handleFormSubmit={onFormSubmit}/>
      </div>
    )
  }