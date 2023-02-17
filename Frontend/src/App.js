import './App.css';
import ApiNews from './ApiNews/News'
import Login from './Component/User/Login';
import SignUp from './Component/User/SignUp';

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import PostNews from './Component/MediaReporter/PostNews';
import Navbar from './Component/User/Navbar';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login />} />
        <Route path='/UserLogin' element={<Login />} />
        <Route path='/UserSignUp' element={<SignUp />} />
        <Route path='/ApiNews' element={<ApiNews />} />
        <Route path='/PostNews' element={<PostNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
