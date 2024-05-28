import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu , Button} from 'antd';
import type {MenuProps} from 'antd';
import {
  LeftOutlined
} from '@ant-design/icons';
import GraphVisualisation from "./GraphVisualisation.tsx"
import MST from "./MST.tsx"

type MenuItem = Required<MenuProps>['items'][number];

const items : MenuItem[] = [
    {
        key : "graph",
        label : "Graph Visualisation",
    },
    {
        key: "tree",
        label:  "Find Minimum Spanning Tree",
    }
];


const GraphProject = () => {
  const [collapsed, _] = useState(false);
  const [openKey, setOpenKey] = useState("graph");
  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  let navigate = useNavigate();
  const navigateBack = ()=>navigate("/");
  const onClick : MenuProps['onClick'] = (e) => {
    
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

