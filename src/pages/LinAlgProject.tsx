import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Menu , Button} from 'antd';
import type { MenuProps } from 'antd';
import {
  LeftOutlined, 
} from '@ant-design/icons';
import RREF from "./Rref.tsx";
import Solutions from "./Solutions.tsx";
import LinearIndependence from "./LinearIndependence.tsx";

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (l : string, k : string) => {
    return {label : l, key : k};
}
const items : MenuItem[] = [
    getItem('Find RREF', 'rref'),
    getItem('Find number of solutions', 'solutions'),
    getItem('Check Linear Independence, Orthogonality', 'linearindep'),
]

const LinAlgProject = () => {
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
        <Button type="primary" onClick={navigateBack} style={{marginBottom: 16}}>
          <LeftOutlined/>
        </Button>
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
      </div>
    </div>
  );
};
export default LinAlgProject;

