import './App.css';
import ApiNews from './ApiNews/News'
import Login from './Component/User/Login';
import SignUp from './Component/User/SignUp';

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import PostNews from './Component/MediaReporter/PostNews';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<PostNews />} />
        <Route path='/UserLogin' element={<Login />} />
        <Route path='/UserSignUp' element={<SignUp />} />
        <Route path='/ApiNews' element={<ApiNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
