import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { BackButton } from '../ui/BackButton.tsx';
import RREF from "./Rref.tsx";
import Solutions from "./Solutions.tsx";
import LinearIndependence from "./LinearIndependence.tsx";
import GraphVisualisation from "./GraphVisualisation.tsx"
import MST from "./MST.tsx"

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (l : string, k : string) => {
    return {label : l, key : k};
}

const items: MenuItem[] = [
  {
    key: 'LinAlg',
    label: 'Linear Algebra',
    children: [
        getItem('Find RREF', 'rref'),
        getItem('Find number of solutions', 'solutions'),
        getItem('Check Linear Independence, Orthogonality', 'linearindep'),
    ],
  },
  {
    key: 'Graph',
    label: 'Graph',
    children: [
        getItem('Graph Visualisation', 'graphvis'),
        getItem('Find Minimum Spanning Tree', 'tree'),
    ],
  }
  
]

const Math = () => {
  const [collapsed, _] = useState<boolean>(false);
  const [openKey, setOpenKey] = useState<string>("rref");
  let navigate = useNavigate();
  const navigateBack = ()=>navigate("/");
  
  const onClick : MenuProps['onClick'] = (e) => {
    
    setOpenKey(e.key);
  };
  return (
    <div style={{ display: 'flex' , justifyContent : "center", width: '100vw'}}>
      <div>
         <BackButton onClick={navigateBack} color={"var(--math-color-dark"}/>
        <Menu
          defaultSelectedKeys={['rref']}
          defaultOpenKeys={['rref']}
          onClick={onClick}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div style={{width: '100vw', paddingLeft : 16, display : "flex", justifyContent : "center", alignItems : "center"}}>
        {openKey === 'rref' && <RREF/>}
        {openKey === 'solutions' && <Solutions/>}
        {openKey === 'linearindep' && <LinearIndependence/>}
        {openKey === 'graphvis' && <GraphVisualisation/>}
        {openKey === 'tree' && <MST />}
      </div>
    </div>
  );
};
export default Math;

