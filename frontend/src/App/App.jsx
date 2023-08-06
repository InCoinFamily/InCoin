import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Budget from '../Pages/Budget/Budget';
import Statistic from '../Pages/Statistic/Statistic';
import Help from '../Pages/Help/Help';
import Profile from '../Pages/Profile/Profile';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';

function App() {
  const location = useLocation();

  const isProfilePage = location.pathname === '/profile';
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistic"
          element={
            <ProtectedRoute>
              <Statistic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isProfilePage && !isHomePage && <Footer />}
    </>
  );
}

export default App;
