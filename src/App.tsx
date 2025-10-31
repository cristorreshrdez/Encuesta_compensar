import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import {Register} from "./pages/Register";
import { Survey } from "./pages/survey";

export const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/survey" element={<Survey/>} />



    </Routes>

  
  );
};