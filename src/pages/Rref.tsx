import React, {useState} from "react";
import {calcRREF} from "../utility/RrefUtility.tsx";
import Matrix from "../components/matrix/Matrix.tsx"


const RREF = () => {
    const [submittedMatrix, setSubmittedMatrix] = useState<number[][]>([]);
    const handleFormSubmit = (matrix : number[][]) => {
        setSubmittedMatrix(matrix);
    }
  
    //
    return (
      <div>
        <div>
            <Matrix onFormSubmit={handleFormSubmit}/>
            {submittedMatrix.length === 0 ? null : <DisplayRREF array={submittedMatrix}/>}

        </div>
            
      </div>
        
    );
  };
export default RREF;


  
export function DisplayRREF({array} : {array : number[][]}){
    console.log(array);
    const result : number[][] = calcRREF(array);
    const roundToTwoDecimalPlaces = (num : number) => Math.round((num + Number.EPSILON) * 100) / 100;

    // Display 2D array with 2 decimal places
    for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
        result[i][j] = roundToTwoDecimalPlaces(result[i][j]);
    }
    }
    return (
        <div className="general">
            <p>The reduced row-echelon form of the matrix is:</p>
            <table>
            <tbody>
                {result.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                    <React.Fragment key={cellIndex}>
                        <td>{cell}</td>
                        {cellIndex !== row.length - 1 && <td className="line"></td>}
                    </React.Fragment>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
      ); 
}
  
  