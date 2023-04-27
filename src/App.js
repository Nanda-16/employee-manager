import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginLayout from "./components/LoginLayout/LoginLayout";
import Home from "./components/Home/Home";
import Employee from "./components/Employee/Employee";
import Designation from "./components/Designation/Designation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginLayout />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/designation" element={<Designation />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
