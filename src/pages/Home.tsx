import {NavigateFunction, useNavigate} from 'react-router-dom';
import { MainButton } from '../ui/MainButton';



const Home = () => {
  let navigate : NavigateFunction = useNavigate();


  return (


          <div style = {{paddingLeft: 30}}>
        <div>
          <h1>Home</h1>
          <p>Welcome to math!</p>
        </div>
        <div style={{ display: 'flex', flexDirection: "column", alignContent: "center",   justifyContent: 'center' }}>
          <div >
            <MainButton name = "Linear Algebra" onClick = {()=>navigate("/linear_algebra")}/>
            <p>Functionality:</p>
              <ul>
                <li> Calculating Reduced Row-Echelon Form</li>
                <li> Calculating number of solutions</li>
                <li> Checking for Linear Independence (In progress)</li>
                <li> Checking for orthogonality + orthonormality (In progress)</li>
              </ul>
            <MainButton name = "Graph Theory" onClick = {()=>navigate("/graph_theory")}/>
            <p>Functionality:</p>
              <ul>
                <li> Graph Visualisation</li>
                <li> Finding the Minimum Spanning Tree </li>
              </ul>
          </div>
        </div>
          
      </div>
    
    
  );
};
export default Home;