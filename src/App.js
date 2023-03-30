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
import Profile from './components/MyProfile/Profile/Profile';
import UserQuestionContent from './components/MyProfile/Profile/Content';
import Admin from './components/Admin/user';
import Chart from './components/charts/Chart';
import MyQuestions from './components/MyProfile/MyQuestions/MyQuestions';
import UpdateQuestion from './components/MyProfile/MyQuestions/UpdateQuestion';
import UpdateAnswer from './components/MyProfile/MyAnswers/UpdateAnswer';
import MyAnswers from './components/MyProfile/MyAnswers/MyAnswers';
import Analysis from './components/MyProfile/Analysis/Analysis';
import Tags from './components/Tags/Tags';
import AdminAnalysis from './components/Admin/analysis';
import QuestionOnTags from './components/Tags/QuestionOnTags';
import Search from './components/Questions/Search';
import AdminUser from './components/Admin/user';
import AdminQuestions from './components/Admin/Adminquestion';
import AdminHome from './components/Admin/AdminHome';
import Adminanswer from './components/Admin/AdminAnswer';
import UserProfileAnalysis from './components/Admin/Analysis/UserProfileAnalysis';

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
       
       {/* profile routes */}
        <Route path='/chart' element={<Chart />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/myquestions' element={<MyQuestions />}></Route>
        <Route path='/updateque/:type' element = {<UpdateQuestion/>}/>
        <Route path='/myanswers' element={<MyAnswers />}></Route>
        <Route path='/analysis' element={<Analysis />}></Route>
        <Route path="/tags" element={<Tags />}></Route>
        
        {/* admin routes  */}
        <Route path='/adminHome' element={<AdminHome />}></Route>
        <Route path='/adminuser' element={<AdminUser />}></Route>
        <Route path='/adminanalysis' element={<AdminAnalysis/>}> </Route>
        <Route path='/adminquestions' element={<AdminQuestions />}></Route>
        <Route path='/adminanswer' element={<Adminanswer />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/UserProfileAnalysis/:username' element={<UserProfileAnalysis />}></Route>
        
        <Route path='/myquestions' element={<MyQuestions />}></Route>
        <Route path='/updateque/:type' element = {<UpdateQuestion/>}/>
        <Route path='/updateans/:type' element= {<UpdateAnswer/>}></Route>
        <Route path='/myanswers' element={<MyAnswers />}></Route>
        <Route path='/analysis' element={<Analysis />}></Route>
        <Route path="/tags" element={<Tags />}></Route>

        {/* <Route path="/tags" element={<Tags />}></Route> */}

        {/* tags routers */}
        <Route path='/tags' element= {<Tags />}></Route>
        <Route path = '/questionOntags/:type' element = {<QuestionOnTags/>}></Route>

        {/* Search Question */}
        <Route path = "/search" element={<Search/>}></Route>
        
        
      </Routes>
      {/* <Footer /> */}
     </BrowserRouter>
    </div>
  );
}

export default App;