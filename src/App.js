
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>

        <Route path = "/" element = {<Homepage/>}/>
        <Route path = "/editor" element = {<Editor/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
