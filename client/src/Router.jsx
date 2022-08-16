import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Homepage from './components/homepage/Homepage';
import Roulette from './components/roulette/Roulette';
import ScratchTicket from './components/scratch-ticket/ScratchTicket';
import Slots from './components/slots/Slots';
import NavBar from './NavBar';
import '../dist/sidebar.css';
import '../dist/bootstrap.min.css';

const dummyData = {
  id: 1,
  username: 'LarryLucky',
  balance: 999999999,
};

function Router() {
  const [user, setUser] = useState(dummyData); // user data
  const [loggedIn, setLoggedIn] = useState(true); // is user logged in?

  useEffect(() => {
    setUser(dummyData);
    setLoggedIn(true);
  }, []);

  return (
    <BrowserRouter>
      <NavBar
        user={user}
        setUser={setUser}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
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
          path="/sidebar"
          element={(
            <Sidebar
              user={user}
            />
          )}
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
