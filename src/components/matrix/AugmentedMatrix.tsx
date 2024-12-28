import React, {useState, useEffect} from "react"
import {createZeroArrayStr} from "../../utility/createZeroArray";
import MatrixSizeForm from "./MatrixSizeForm";
import AugmentedMatrixForm from "./AugmentedMatrixForm";

interface AugmentedMatrixProps {
    onFormSubmit : (coeffMatrix : string[][], constMatrix : string[][]) => void
}


export const AugmentedMatrix  = ({onFormSubmit} : AugmentedMatrixProps) => {
    const [row, setRow]  = useState(4); //length of coefficient matrix
    const [col, setCol] = useState(4); //length of coefficient matrix
    const [coefficientMatrix, setCoefficientMatrix] = useState<string[][]>([]);
    const [constantsMatrix, setConstantsMatrix] = useState<string[][]>([]);

    const onColChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      setCol(parseInt(event.target.value));
    };
    const onRowChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      setRow(parseInt(event.target.value));
    };

    useEffect(() => {
      const newMatrix = createZeroArrayStr(row, col);
      const newConstMatrix = createZeroArrayStr(row, col > 0 ? 1 : 0);
      setCoefficientMatrix(newMatrix);
      setConstantsMatrix(newConstMatrix);
      
    }, [row, col]);

    
  
    return (
      <div>
        <MatrixSizeForm text="Enter the number of rows" number={row} onChange={onRowChange}/>
        <MatrixSizeForm text="Enter the number of columns" number={col} onChange={onColChange}/>
        <AugmentedMatrixForm coefficientMatrix={coefficientMatrix} setCoefficientMatrix={setCoefficientMatrix} constantsMatrix={constantsMatrix} setConstantsMatrix={setConstantsMatrix} handleFormSubmit={onFormSubmit}/>
      </div>
    )
  }

export default AugmentedMatrix;
