import React from 'react';
import { Button } from 'antd';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CreateModal } from './components/CreateModal';
import { Login, Register, Documents, Editor } from './pages';

import styles from './pages/Login/Login.module.css';
import './App.css';

function getRoutes(hasToken) {
  if(hasToken) {
    return(
      <>
        <Routes>
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/:id/*" element={<Editor />} />
          <Route
            path="*"
            element={<Navigate to="/documents" replace />}
          />
        </Routes>
        <Routes>
          <Route 
            path="/documents/:id/create" 
            element={<CreateModal />} 
          />
        </Routes>
      </>
    );
  }
  return(
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}


function App() {
  const token = localStorage.getItem('auth_token');
  return (
      <BrowserRouter>
        {getRoutes(token)}
      </BrowserRouter>
  );
}

export default App;