import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home.tsx'
import LinAlgProject from './LinAlgProject.tsx'
import GraphProject from './GraphProject.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/linear_algebra" element={<LinAlgProject />} />
        <Route path="/graph_theory" element={<GraphProject />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
