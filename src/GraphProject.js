import './App.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu , Button} from 'antd';
import {
  ApartmentOutlined,
  NodeIndexOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined, 
  LeftOutlined
} from '@ant-design/icons';
import GraphVisualisation from "./GraphVisualisation.js"
import MST from "./MST.js"




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
  getItem('Graph Visualisation', 'graph', <NodeIndexOutlined/>),
  getItem('Find Minimum Spanning Tree', 'tree', <ApartmentOutlined/>),
];
const GraphProject = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKey, setOpenKey] = useState("graph");
  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  let navigate = useNavigate();
  const navigateBack = ()=>navigate("/");
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
          onClick={navigateBack}
          style={{
            marginBottom: 16,
          }}
        >
          <LeftOutlined/>
        </Button>
        <Menu
          defaultSelectedKeys={['graph']}
          defaultOpenKeys={['graph']}
          onClick={onClick}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div style={{ marginLeft: 16 }}>
        {openKey === 'graph' && <GraphVisualisation/>}
        {openKey === 'tree' && <MST />}
      </div>
    </div>
  );
};
export default GraphProject;

