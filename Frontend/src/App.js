import './App.css';
import ApiNews from './ApiNews/News'
import Login from './Component/User/Login';
import SignUp from './Component/User/SignUp';

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import PostNews from './Component/MediaReporter/PostNews';
import MediaReporterLogin from './Component/MediaReporter/MediaReposterLogin';
import MediaReporterSignUp from './Component/MediaReporter/MediaReporterSignUp';
import Terms from './Component/CommonComponent/Terms';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login />} />
        <Route path='/UserLogin' element={<Login />} />
        <Route path='/UserSignUp' element={<SignUp />} />
        <Route path='/ApiNews' element={<ApiNews />} />
        <Route path='/PostNews' element={<PostNews />} />
        <Route path='/MediaReporterLogin' element={<MediaReporterLogin />} />
        <Route path='/MediaReporterSignUp' element={<MediaReporterSignUp />} />
        <Route path='/TermsAndCondition' element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
