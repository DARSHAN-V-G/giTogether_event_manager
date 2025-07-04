import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/ViewData.jsx';
import StudentGrouping from './pages/StudentGroup.jsx';
import BoxOfLies from './components/BoxOfLies.jsx';
import Speedrun from './components/Speedrun.jsx';
import Marketing from './components/Marketing.jsx';
import Score from './pages/scorePage.jsx';
import TeamList from './pages/TeamList.jsx';
import Mail from './components/mail.jsx';
const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/group" element={<StudentGrouping />} />
          <Route path="/speedrun" element={<Speedrun />} />
          <Route path="/boxoflies" element={<BoxOfLies />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/score" element={<Score />} />
          <Route path="/leaderboard" element={<TeamList />} />
          <Route path="/mail" element={<Mail />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
