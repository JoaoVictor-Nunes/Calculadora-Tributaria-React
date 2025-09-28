import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CalculoPF from "./Pages/CalculoPF";
import CalculoPJ from "./Pages/CalculoPJ";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <ul className="flex flex-wrap justify-center space-x-6 py-4">
              <li>
                <Link 
                  to="/Home"
                  className="hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/CalculoPessoaFisica"
                  className="hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  Calcular Tributação de Pessoa Física
                </Link>
              </li>
              <li>
                <Link 
                  to="/CalculoPessoaJuridica"
                  className="hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  Calcular Tributação de Pessoa Jurídica
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CalculoPessoaFisica" element={<CalculoPF />} />
          <Route path="/CalculoPessoaJuridica" element={<CalculoPJ />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="*" element={<h1>ERROR 404: PAGE NOT FOUND</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
