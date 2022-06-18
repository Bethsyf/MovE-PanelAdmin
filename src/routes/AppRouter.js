import { getAuth, onIdTokenChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lenders from "../components/Dashboard/Lenders";
import NavBar from "../components/Dashboard/NavBar";
import Takers from "../components/Dashboard/Takers";
import Users from "../components/Dashboard/Users";
import Vehicles from "../components/Dashboard/Vehicles";
import Login from "../components/Login/Login";
import { app } from "../firebase/firebase.config";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    onIdTokenChanged(auth, (user) => {
      if (localStorage.getItem("user")) {
        setIsLoggedIn(true);
        console.log("logged in");
      } else {
        setIsLoggedIn(false);
        console.log("Not logged");
      }
    });
  }, [setIsLoggedIn, isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoutes isAuth={isLoggedIn}>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoutes isAuth={isLoggedIn}>
              <NavBar />
              <Users />
            </PrivateRoutes>
          }
        />
        <Route
          path="/vehicles"
          element={
            <PrivateRoutes isAuth={isLoggedIn}>
              <NavBar />
              <Vehicles />
            </PrivateRoutes>
          }
        />
        <Route
          path="/lenders"
          element={
            <PrivateRoutes isAuth={isLoggedIn}>
              <NavBar />
              <Lenders />
            </PrivateRoutes>
          }
        />
        <Route
          path="/takers"
          element={
            <PrivateRoutes isAuth={isLoggedIn}>
              <NavBar />
              <Takers />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
