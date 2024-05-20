import React, {useState, useEffect} from "react"
import createZeroArray from "../../utility/createZeroArray";
import MatrixSizeForm from "./MatrixSizeForm";
import AugmentedMatrixForm from "./AugmentedMatrixForm";

interface AugmentedMatrixProps {
    onFormSubmit : (coeffMatrix : number[][], constMatrix : number[][]) => void
}


export const AugmentedMatrix  = ({onFormSubmit} : AugmentedMatrixProps) => {
    const [row, setRow]  = useState(4); //length of coefficient matrix
    const [col, setCol] = useState(4); //length of coefficient matrix
    const [coefficientMatrix, setCoefficientMatrix] = useState<number[][]>([]);
    const [constantsMatrix, setConstantsMatrix] = useState<number[][]>([]);

    const onColChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      setCol(parseInt(event.target.value));
    };
    const onRowChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      setRow(parseInt(event.target.value));
    };

    useEffect(() => {
      if (row > 0 && col > 0) {
        const newMatrix = createZeroArray(row, col);
        const newConstMatrix = createZeroArray(row, 1);
        setCoefficientMatrix(newMatrix);
        setConstantsMatrix(newConstMatrix);
      } else {
        setCoefficientMatrix([]);
        setConstantsMatrix([]);
      }
    }, [row, col]);

    
  
    return (
      <div>
        <MatrixSizeForm text="Enter the number of rows" number={row} onChange={onRowChange}/>
        <MatrixSizeForm text="Enter the number of columns" number={col} onChange={onColChange}/>
        <AugmentedMatrixForm coefficientMatrix={coefficientMatrix} setCoefficientMatrix={setCoefficientMatrix} constantsMatrix={constantsMatrix} setConstantsMatrix={setConstantsMatrix} onFormSubmit={onFormSubmit}/>
      </div>
    )
  }

export default AugmentedMatrix;
