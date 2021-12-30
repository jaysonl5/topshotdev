
import './App.css';
import './components/UserProfile';
import './components/MomentsMaster';
import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MomentsMaster from './components/MomentsMaster';
import Admin from './components/Admin'
import PromiseTest from './components/PromiseTest';

const MomentDisplay = () => (
<div>
  <div className='brand'></div>
  <div className='container'>        
      <MomentsMaster />                  
  </div>
</div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MomentDisplay />} />
      <Route path="admin" element={<Admin />} />
      <Route path="PromiseTest" element={<PromiseTest />} />
    </Routes>
  </Router>

);

export default App;


