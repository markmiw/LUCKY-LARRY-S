import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
// import Homepage from './components/homepage/Homepage';
// import Roulette from './components/roulette/Roulette';
// import ScratchTicket from './components/scratch-ticket/ScratchTicket';
// import Slots from './components/slots/Slots';
import Sidebar from './components/sidebar/Sidebar';
import Homepage from './components/homepage/Homepage';
import Roulette from './components/roulette/Roulette';
import ScratchTicket from './components/scratch-ticket/ScratchTicket';
import Slots from './components/slots/Slots';
import NavBar from './NavBar';

function Router() {
  const [user, setUser] = useState(); // user data
  const [loggedIn, setLoggedIn] = useState(false); // is user logged in?

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
          element={<Sidebar />}
        />
        <Route
          path="/"
          element={(
            <Homepage
              user={user}
              setUser={setUser}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          )}
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
