
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path = "/" element = {<Homepage/>}/>
        <Route path = "/editor" element = {<Editor/>}/>
        <Route path = "/login" element = {<Editor/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
