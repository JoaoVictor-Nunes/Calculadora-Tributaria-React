import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./Pages/Página Inicial/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CalculoPF from "./Pages/CalculoPF";
import CalculoPJ from "./Pages/CalculoPJ";
import Explicacao from "./Pages/Explicação/Explicacao";
import TopbarLayout from "./Layout/TopbarLayout";
import Esqueci from "./Pages/Esqueci a senha/Esqueci";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/forgot" element={<Esqueci />} />
          <Route element={<TopbarLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/calculopf" element={<CalculoPF />} />
            <Route path="/calculopj" element={<CalculoPJ />} />
            <Route path="/explicacao" element={<Explicacao />} />

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
