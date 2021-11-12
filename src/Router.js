import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route expact path="/"></Route>
        <Route expact path="/auth" element={<UserSignIn />}></Route>
        <Route expact path="/register" element={<UserSignUp />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
