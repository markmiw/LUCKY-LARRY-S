import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Homepage from './components/homepage/Homepage';
import Roulette from './components/roulette/Roulette';
import ScratchTicket from './components/scratch-ticket/ScratchTicket';
import Slots from './components/slots/Slots';
import NavBar from './NavBar';
import LoginModal from './components/modal/LoginModal';
import '../dist/sidebar.css';

function Router() {
  const [user, setUser] = useState(); // user data
  const [loggedIn, setLoggedIn] = useState(false); // is user logged in?
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <BrowserRouter>
      {showLoginModal && (
        <LoginModal
          setModal={setShowLoginModal}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
        />
      )}
      <NavBar
        user={user}
        setUser={setUser}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setShowLoginModal={setShowLoginModal}
      />
      <Routes>
        <Route
          path="/roulette"
          element={<Roulette userID={user.id} />}
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
              setShowLoginModal={setShowLoginModal}
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
