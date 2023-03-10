
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Questions from './components/Questions/Questions';
import Content from './components/Questions/Content';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import UserQuestionContent from './components/Profile/Content';
import AdminUser from './components/Admin/user';
import AdminQestion from './components/Admin/question';
import AdminHome from './components/Admin/AdminHome';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path = "/" element = {<Homepage/>}/>    
        <Route path = "/editor" element = {<Editor/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path="/questions" element = {<Questions />}></Route>
        <Route path="/question/:type" element = {<Content />}></Route>
        <Route path="/answer/:type" element = {<UserQuestionContent />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/adminHome' element={<AdminHome />}></Route>
        <Route path='/adminuser' element={<AdminUser />}></Route>
        <Route path='/adminquestion' element={<AdminQestion/>}> </Route>

      </Routes>
      {/* <Footer /> */}
     </BrowserRouter>
    </div>
  );
}

export default App;
