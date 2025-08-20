import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {ConfigProvider} from 'antd';

import Home from './pages/Home.tsx'
import LinAlgProject from './pages/LinAlgProject.tsx'
import Crochet from './pages/Crochet.tsx'
import './index.css'
import Math from './pages/Math.tsx';
import Projects from './pages/Projects.tsx';
import type { ThemeConfig } from 'antd';



const config: ThemeConfig = {
  token: {
    fontFamily: "Inter"
  },
};




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config}  >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/linear_algebra" element={<LinAlgProject />} />
          <Route path="/crochet" element={<Crochet />} />
          <Route path="/math" element={<Math />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
