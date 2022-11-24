import React from 'react';
import { Button } from 'antd';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { CreateModal } from './components/CreateModal';
import { Login, Register, Documents, Editor } from './pages';

import styles from './pages/Login/Login.module.css';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/:id/*" element={<Editor />} />
        </Routes>
        <Routes>
          <Route 
            path="/documents/:id/create" 
            element={<CreateModal />} 
          />
        </Routes>
      </BrowserRouter>
  );
}


const Main = () => (
<div className='border'>
  <div className={styles.wrapper}>
  <img 
    height={40}
    width={40}
    src="pngtree-astronaut-full-color-set-png-image_5071525.jpg" 
  />
  <p>
       
  </p>
    <Link to="/login">
      <Button type="primary"> 
        Вход
      </Button>
    </Link> 
    <p> 
      или
    </p>
    <Link to="/register">
      <Button type="primary"> 
        Регистрация
      </Button>
    </Link> 
  </div>
</div>
);

export default App;