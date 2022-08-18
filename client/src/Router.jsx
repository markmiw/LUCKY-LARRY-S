import React, { useState } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import NavBar from './NavBar';
import LoginModal from './components/modal/LoginModal';
import '../dist/sidebar.css';
import '../dist/leaderboard.css';
import Gamepage from './components/gamepage/Gamepage';

function Router() {
  const [user, setUser] = useState({
    id: 1,
    username: 'Bruce',
    balance: 12345,
  }); // user data
  const [loggedIn, setLoggedIn] = useState(true); // is user logged in?
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
        {loggedIn && (
          <>
            <Route
              path="/roulette"
              element={<Gamepage user={user} setUser={setUser} game="roulette" />}
            />
            <Route
              path="/scratch-ticket"
              element={<Gamepage user={user} setUser={setUser} game="scratch-ticket" />}
            />
            <Route
              path="/slots"
              element={<Gamepage user={user} setUser={setUser} game="slots" />}
            />
          </>
        )}
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
