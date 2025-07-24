import {NavigateFunction, useNavigate} from 'react-router-dom';
import { MainButton } from '../ui/MainButton';



const Home = () => {
  let navigate : NavigateFunction = useNavigate();


  return (


          <div style = {{paddingLeft: 30, fontFamily: "Inter"}}>
        <div>
          <h1>Home</h1>
          <p>Welcome to math!</p>
        </div>
        <div style={{ display: 'flex', flexDirection: "column", alignContent: "center",   justifyContent: 'center' }}>
          <div >
            <MainButton name = "Math" onClick = {()=>navigate("/math")}/>
            <p>Functionality:</p>
              <ul>
                <li> Calculating Reduced Row-Echelon Form</li>
                <li> Calculating number of solutions</li>
                <li> Graph Visualisation</li>
                <li> Finding the Minimum Spanning Tree</li>
              </ul>
            <MainButton name = "Crochet" onClick = {()=>navigate("/crochet")}/>
            <p>View my crochet work!</p>
          </div>
        </div>
          
      </div>
    
    
  );
};
export default Home;