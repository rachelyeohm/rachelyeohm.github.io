  import React from 'react';
  import {useNavigate} from 'react-router-dom';
  import {Button, Flex} from 'antd';
  import {
    RightOutlined,
  } from '@ant-design/icons';

  const MainButton = ({name, onClick}) => {
    return (
      <Flex gap="small" wrap="wrap" style={{
        width: '100%',
      }}>
          <Button shape="square" size="large" onClick = {onClick} block>
              {name}
              <RightOutlined/> 
          </Button>
      </Flex>
    )
  }



  const Home = () => {
    let navigate = useNavigate();


    return (
            <div>
          <div style={{ marginLeft: 32 }}>
            <h1>Home</h1>
            <p>Welcome to math!</p>
          </div>
          <div style={{ display: 'flex', flexDirection: "column", alignContent: "center",   justifyContent: 'center' }}>
            <div style={{ width: '50%' , margin: "0 auto"}}>
              <MainButton name = "Linear Algebra" onClick = {()=>navigate("/linear_algebra")}/>
              <p>Functionality:</p>
                <ul>
                  <li> Matrix Multiplication</li>
                  <li> Checking for Linear Independence</li>
                  <li> Checking for orthogonality + orthonormality</li>
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