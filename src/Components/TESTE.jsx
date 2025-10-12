import React, { useState } from "react";
import { X, Menu } from "lucide-react";

const Teste = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = ["Home", "About", "Services", "Contact"];

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2x1 font-extrabold text-blue-700 tracking-tight">Tes<span className="text-gray-800">te</span></h1>
        <div className="hidden md:flex gap-8">
          {navItems.map((item ) => (
            <a 
            key={item}
            href="#"
            className="text-gray-700 font-medium relative group transition"
            >
              {item}
              <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full duration-300"></span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
export default Teste;