import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import type { ThemeConfig } from 'antd';
import {ConfigProvider} from 'antd';

import Home from './pages/Home.tsx'
import LinAlgProject from './pages/LinAlgProject.tsx'
import GraphProject from './pages/GraphProject.tsx'
import './index.css'


// const { getDesignToken, useToken } = theme;

const config: ThemeConfig = {
    "token": {
      "colorPrimary": "#df2ab8",
      "colorInfo": "#df2ab8"
    },
    "components": {
      "Button": {
        "defaultActiveBorderColor": "rgb(142, 52, 245)",
        "defaultActiveColor": "rgb(142, 52, 245)"
      }
    }
};


// const globalToken = getDesignToken(config);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/linear_algebra" element={<LinAlgProject />} />
          <Route path="/graph_theory" element={<GraphProject />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
