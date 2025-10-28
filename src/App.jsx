import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import { ColorModeContext, useMode } from "./Tema";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./Pages/Página Inicial/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CalculoPF from "./Pages/CalculoPF";
import CalculoPJ from "./Pages/CalculoPJ";
import CalculadoraTributaria from "./Pages/CalculadoraTributaria";
import Explicacao from "./Pages/Explicação/Explicacao";
import TopbarLayout from "./Layout/TopbarLayout";
import Esqueci from "./Pages/Esqueci a senha/Esqueci";
import Contatos from "./Pages/Contatos";
import Error from "./Pages/Error";

function App() {
  const [theme, colorMode] = useMode();


  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
    <BrowserRouter>
      <div className="app">
        <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/forgot" element={<Esqueci />} />
          <Route path="*" element={<Error />} />
          <Route element={<TopbarLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/calculadora" element={<CalculadoraTributaria />} />
            <Route path="/calculopf" element={<CalculoPF />} />
            <Route path="/calculopj" element={<CalculoPJ />} />
            <Route path="/detalhes" element={<Explicacao />} />
            <Route path="/contatos" element={<Contatos />} />

          </Route>
          
        </Routes>

         </main>
      </div>
    </BrowserRouter>
 
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
