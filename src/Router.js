import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route expact path="/"></Route>
        <Route expact path="/auth" element={<LoginForm />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
