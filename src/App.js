
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Questions from './components/Questions/Questions';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path = "/" element = {<Homepage/>}/>
        <Route path = "/editor" element = {<Editor/>}/>
        <Route path = "/login" element = {<Editor/>}/>
        <Route path="/questions" element = {<Questions />}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
