import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
// BrowserRouter,
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import UpLoad from './pages/Upload';
import Result from './pages/Result';
import Login from './pages/Login';
import Match from './pages/match';
import MyItems from './pages/MyItems';

function App(){
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Upload" element={<UpLoad />} />
          <Route path="/Result" element={<Result />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Match" element={<Match />} />
          <Route path="/My-Items" element={<MyItems />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;