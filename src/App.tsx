import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
// BrowserRouter,
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import UpLoad from './pages/Upload';
import Result from './pages/Result';
import Login from './pages/Login';

function App(){
  return (
    <BrowserRouter>
      {
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UpLoad />} />
          <Route path="/result" element={<Result />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      }
    </BrowserRouter>
  );
}

export default App;