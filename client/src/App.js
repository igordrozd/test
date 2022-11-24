import './App.css';
import { Login, Register, Documents } from './pages';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Button } from 'antd';
import styles from './pages/Login/Login.module.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </BrowserRouter>
  );
}


const Main = () => (
<div className='border'>
  <div className={styles.wrapper}>
  <img src="pngtree-astronaut-full-color-set-png-image_5071525.jpg" />
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