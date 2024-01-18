import './App.css';
import React, {useState} from 'react';
import { Menu , Button} from 'antd';
import {
  ApartmentOutlined,
  NodeIndexOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined, 
} from '@ant-design/icons';
import RREF from "./Rref.js";
import Solutions from "./Solutions.js";
import LinearIndependence from "./LinearIndependence.js";




function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Find RREF', 'rref'),
  getItem('Find number of solutions', 'solutions'),
  getItem('Check Linear Independence, Orthogonality', 'linearindep'),
];
const GraphProject = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKey, setOpenKey] = useState("rref");
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClick = (e) => {
    
    setOpenKey(e.key);
  };
  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          width: 256,
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
      <div style={{ marginLeft: 16 }}>
        {openKey === 'rref' && <RREF/>}
        {openKey === 'solutions' && <Solutions/>}
        {openKey === 'linearindep' && <LinearIndependence/>}
      </div>
    </div>
  );
};
export default GraphProject;

