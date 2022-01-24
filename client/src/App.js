
import './App.css';
import './components/UserProfile';
import './components/MomentsMaster';
import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MomentsMaster from './components/MomentsMaster';

import Admin from './components/Admin'
import MomentBadges from './components/MomentBadges/MomentBadges';

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
      <Route path="/badges" element={<MomentBadges />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  </Router>

);

export default App;


