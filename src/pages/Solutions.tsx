import React, {useState} from 'react'
import AugmentedMatrix from '../components/matrix/AugmentedMatrix';
import calcSolutions from '../utility/calcSolutions';
import { findPivotIndexes } from '../utility/RrefUtility';

type calcSolutionsResults  = {
  rref : {coeffMatrix : number[][], constMatrix : number[][]}
  numSolutions : string;
  pivotColumns : string;
  solution : string[];
}

const Solutions = () => { 
    const [submittedCoeffMatrix, setSubmittedCoeffMatrix] = useState<number[][]>([]);
    const [submittedConstMatrix, setSubmittedConstMatrix] = useState<number[][]>([]);
    const [solutions, setSolutions] = useState<calcSolutionsResults>({
      rref : {coeffMatrix : [], constMatrix : []},
      numSolutions : "nil",
      pivotColumns : "nil",
      solution : ["nil"]
    });
    const handleFormSubmit = (coeffMatrix: number[][], constMatrix: number[][]) => {
      setSubmittedCoeffMatrix(coeffMatrix);
      setSubmittedConstMatrix(constMatrix);
      setSolutions(calcSolutions(coeffMatrix, constMatrix))
    }


    

    return (
      <div>
        <div>
            <AugmentedMatrix onFormSubmit={handleFormSubmit}/>
            <p className='general'>The reduced row-echelon form is {submittedCoeffMatrix.length === 0 
                  ? "_____"
                  : DisplayAugmentedRREF(solutions.rref) }</p>
            <p className='general'>There are {submittedCoeffMatrix.length === 0 
                    ? "____" 
                    : solutions.numSolutions} solutions.</p>
            <p className='general'> The pivot columns are {submittedCoeffMatrix.length === 0 
                    ? "___" 
                    : solutions.pivotColumns}.</p>

            <p className='general'> {submittedCoeffMatrix.length === 0 
                    ? "The solution(s) are _____" 
                    : displaySolutions(solutions.solution)}</p>
        </div>
            
      </div>
        
    );
}

export default Solutions;


function displaySolutions(solutions : string[]) {
  return (
    <div className = "general">
      The solutions(s) are:
      <br></br>
      {solutions.map((eqn, index) => (
        <div key={index}>{eqn}</div>
      ))}
    </div>
  );
}


export function DisplayAugmentedRREF(rref : {coeffMatrix : number[][], constMatrix : number[][]}){

  const roundToTwoDecimalPlaces = (num : number) => Math.round((num + Number.EPSILON) * 100) / 100;

  return (
    <div style={{display : "flex"}}>
      <div className="general">
          <table>
          <tbody>
              {rref.coeffMatrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                  <React.Fragment key={cellIndex}>
                      <td>{cell.toFixed()}</td>
                      {cellIndex !== row.length - 1 && <td className="line"></td>}
                  </React.Fragment>
                  ))}
              </tr>
              ))}
          </tbody>
          </table>
      </div>

      <div className="content">
        <table>
        <tbody>
            {rref.constMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                <React.Fragment key={cellIndex}>
                    <td>{cell.toFixed()}</td>
                    {cellIndex !== row.length - 1 && <td className="line"></td>}
                </React.Fragment>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
        <div className = "line"></div>
      </div>
    </div>
  ); 
}

