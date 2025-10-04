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

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Routes>
          <Route element={<TopbarLayout />}>
            <Route path="/CalculoPF" element={<CalculoPF />} />
            <Route path="/CalculoPJ" element={<CalculoPJ />} />
            <Route path="/Explicacao" element={<Explicacao />} />
            <Route path="/Home" element={<Home />} /> 
          </Route>
          <Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
