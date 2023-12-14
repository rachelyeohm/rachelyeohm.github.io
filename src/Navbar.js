
import React, {useState} from 'react';
import { Menu , Button} from 'antd';
import {
  ApartmentOutlined,
  NodeIndexOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined, 
} from '@ant-design/icons';

import Form from "./Form2.js"
import Tree from "./Tree.js"


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
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKey, setOpenKey] = useState("graph");
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
          defaultSelectedKeys={['graph']}
          defaultOpenKeys={['graph']}
          onClick={onClick}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div style={{ marginLeft: 16 }}>
        {openKey === 'graph' && <Form />}
        {openKey === 'tree' && <Tree />}
      </div>
    </div>
  );
};
export default App;