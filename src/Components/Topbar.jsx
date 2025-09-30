import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center space-x-6 py-4">
          <li>
        <Link to="/CalculoPF" 
        className="hover:text-blue-200 transition-colors duration-200 font-medium hover:underline">
          Calculo para Pessoa Fisica
          </Link>
        </li>
        <li>
        <Link to="/CalculoPJ" 
        className="hover:text-blue-200 transition-colors duration-200 font-medium hover:underline">
          Calculo para Pessoa Juridica
          </Link>
        </li>
        <li>
        <Link to="/Explicacao" 
        className="hover:text-blue-200 transition-colors duration-200 font-medium hover:underline">Explicacoes necessarias
        </Link>
        </li>
      </ul>
      </div>

    </nav>
  );
};
export default Topbar;