import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import Roulette from './components/roulette/Roulette';
import ScratchTicket from './components/scratch-ticket/ScratchTicket';
import Slots from './components/slots/Slots';
import NavBar from './NavBar';

function Router() {
  const [username, setUsername] = useState('larry');

  return (
    <BrowserRouter>
      <NavBar username={username} />
      <Routes>
        <Route
          path="/roulette"
          element={<Roulette />}
        />
        <Route
          path="/scratch-ticket"
          element={<ScratchTicket />}
        />
        <Route
          path="/slots"
          element={<Slots />}
        />
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
