import { createRoot } from 'react-dom/client'
import './global.css'
import Console from './Console';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorScreen from './ErrorScreen';
import BiosScreen from './BiosScreen';

const root = createRoot(document.getElementById('root')!);


root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Console></Console>}/>
      <Route path="/error-screen" element={<ErrorScreen/>}/>
      <Route path="/bios-screen" element={<BiosScreen/>}/>
    </Routes>
  </Router>
)