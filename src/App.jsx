// src/App.js
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/home';
import Prodectdetails from './pages/home';
import ConfirmReq from './pages/confirmReQ'
import "./App.css"
import ProductDetails from './components/ProdectDetails';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/prodectdetails' element={<Prodectdetails/>} />
        <Route path='/confirmReq' element={<ConfirmReq/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
