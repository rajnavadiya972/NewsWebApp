import './App.css';
import ApiNewsUser from './Component/User/News'
import ApiNewsMedia from './Component/MediaReporter/News'
import Login from './Component/User/Login';
import SignUp from './Component/User/SignUp';

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import PostNews from './Component/MediaReporter/PostNews';
import MediaReporterLogin from './Component/MediaReporter/MediaReposterLogin';
import MediaReporterSignUp from './Component/MediaReporter/MediaReporterSignUp';
import TermsMedia from './Component/MediaReporter/Terms';
import TermsUser from './Component/User/Terms';
import AllNewsMedia from './Component/MediaReporter/AllNews';
import AllNewsUser from './Component/User/AllNews';
import MyPost from './Component/MediaReporter/MyPost';

import UserProfile from './Component/User/UserProfile';
import UserProfileEdit from './Component/User/UserProfileEdit';

import MediaProfile from './Component/MediaReporter/MediaProfile';
import MediaProfileEdit from './Component/MediaReporter/MediaProfileEdit';
import Subscription from './Component/MediaReporter/Subscription';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login />} />
        <Route path='/UserLogin' element={<Login />} />
        <Route path='/UserSignUp' element={<SignUp />} />
        <Route path='/ApiNewsUser' element={<ApiNewsUser />} />
        <Route path='/ApiNewsMedia' element={<ApiNewsMedia />} />
        <Route path='/PostNews' element={<PostNews />} />
        <Route path='/MediaReporterLogin' element={<MediaReporterLogin />} />
        <Route path='/MediaReporterSignUp' element={<MediaReporterSignUp />} />
        <Route path='/TermsAndConditionUser' element={<TermsUser />} />
        <Route path='/TermsAndConditionMedia' element={<TermsMedia />} />
        <Route path='/LocalNewsUser' element={<AllNewsUser />} />
        <Route path='/LocalNewsMedia' element={<AllNewsMedia />} />
        <Route path='/MyPost' element={<MyPost />} />
        <Route path='/Subscription' element={<Subscription />} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/UserProfileEdit' element={<UserProfileEdit />} />
        <Route path='/MediaProfile' element={<MediaProfile />} />
        <Route path='/MediaProfileEdit' element={<MediaProfileEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
