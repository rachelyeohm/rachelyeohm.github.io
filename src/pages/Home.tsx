import {NavigateFunction, useNavigate} from 'react-router-dom';
import { MainButton } from '../ui/MainButton';



const Home = () => {
  let navigate : NavigateFunction = useNavigate();


  return (

    <div style = {{display : "flex",  width : "100vw", justifyContent : "center", alignItems : "center"}}>
        <div style={{ display: 'flex', margin : "0 auto", flexDirection: "column", alignContent: "center",   justifyContent: 'center' }}>
          <p style = {{fontSize : "32px"}}>Welcome to my website!</p>
          <div >
            <MainButton name = "Projects" onClick = {()=>navigate("/projects")}/>
            <p>View details about my past projects!</p>
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