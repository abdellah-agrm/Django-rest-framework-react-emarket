import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';
import ProductCreate from './components/product/ProductCreate';
import ProductUpdate from './components/product/ProductUpdate';
import UserRegister from './components/account/UserRegister';
import UserLogin from './components/account/UserLogin';
import Profile from './components/account/Profile';


function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<ProductList/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/product/create" element={<ProductCreate/>} />
          <Route path="/product/update/:id" element={<ProductUpdate/>} />
          <Route path="/register" element={<UserRegister/>} />
          <Route path="/login" element={<UserLogin/>} />
          <Route path="/profil" element={<Profile/>} />
        </Routes>
      </div>
  );
}

export default App;
