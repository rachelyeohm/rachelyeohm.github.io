import React, {useState} from 'react'
import AugmentedMatrix from '../components/matrix/AugmentedMatrix';
import calcNumberOfSolutions from '../utility/calcNumberOfSolutions';

const Solutions = () => { 
    const [submittedCoeffMatrix, setSubmittedCoeffMatrix] = useState<number[][]>([]);
    const [submittedConstMatrix, setSubmittedConstMatrix] = useState<number[][]>([]);
    const handleFormSubmit = (coeffMatrix: number[][], constMatrix: number[][]) => {
      setSubmittedCoeffMatrix(coeffMatrix);
      setSubmittedConstMatrix(constMatrix);
    }
    

    return (
      <div>
        <div>
            <AugmentedMatrix onFormSubmit={handleFormSubmit}/>
            <p className='general'>There are {submittedCoeffMatrix.length === 0 ? "____" : calcNumberOfSolutions(submittedCoeffMatrix, submittedConstMatrix)} solutions.</p>
            
        </div>
            
      </div>
        
    );
}

export default Solutions;