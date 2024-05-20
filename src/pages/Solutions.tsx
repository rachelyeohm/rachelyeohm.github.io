import React, {useState} from 'react'
import AugmentedMatrix from '../components/matrix/AugmentedMatrix';
import calcNumberOfSolutions from '../utility/calcSolutions';
import { findPivotIndexes } from '../utility/RrefUtility';

const Solutions = () => { 
    const [submittedCoeffMatrix, setSubmittedCoeffMatrix] = useState<number[][]>([]);
    const [submittedConstMatrix, setSubmittedConstMatrix] = useState<number[][]>([]);
    const handleFormSubmit = (coeffMatrix: number[][], constMatrix: number[][]) => {
      setSubmittedCoeffMatrix(coeffMatrix);
      setSubmittedConstMatrix(constMatrix);
    }

    function convertToPivotIndex(coeffMatrix : number[][], constMatrix: number[][]) : string {
        const pivotIndexes : number[] = findPivotIndexes(submittedCoeffMatrix.map((row, index) => row.concat(submittedConstMatrix[index]))).columnIndexes;
        return [...new Set(pivotIndexes)].join(", ")
      }
    

    return (
      <div>
        <div>
            <AugmentedMatrix onFormSubmit={handleFormSubmit}/>
            <p className='general'>There are {submittedCoeffMatrix.length === 0 
                    ? "____" 
                    : calcNumberOfSolutions(submittedCoeffMatrix, submittedConstMatrix)} solutions.</p>
            <p className='general'> The pivot columns are {submittedCoeffMatrix.length === 0 
                    ? "___" 
                    : convertToPivotIndex(submittedCoeffMatrix, submittedConstMatrix)}.</p>
        </div>
            
      </div>
        
    );
}

export default Solutions;