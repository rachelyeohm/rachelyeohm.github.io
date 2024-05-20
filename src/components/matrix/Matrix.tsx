import React , {useState, useEffect} from "react"
import createZeroArray from "../../utility/createZeroArray.tsx"
import MatrixSizeForm from "./MatrixSizeForm.tsx"
import MatrixForm from "./MatrixForm.tsx"

const Matrix = ({onFormSubmit} : {onFormSubmit : (matrix : number[][]) => void}) => {
    const [row, setRow] = useState(4);
    const [col, setCol] = useState(4);
    const [matrix, setMatrix] = useState<number[][]>([]);
    
    const onColChange = (event) => {
      setCol(event.target.value);
    };
    const onRowChange = (event) => {
      setRow(event.target.value);
    };
    useEffect(() => {
      if (row > 0 && col>0) {
        const newMatrix = createZeroArray(row, col);
        console.log("printed new array");
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