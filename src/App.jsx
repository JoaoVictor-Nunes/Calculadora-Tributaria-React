import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./Tema";
import Home from "./Pages/Página Inicial/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CalculoPF from "./Pages/Cálculos/CalculoPF";
import CalculoPJ from "./Pages/Cálculos/CalculoPJ";
import CalculadoraTributaria from "./Pages/Cálculos/CalculadoraTributaria";
import Explicacao from "./Pages/Explicação/Explicacao";
import PageLayout from "./Layout/PageLayout";
import Esqueci from "./Pages/Esqueci a senha/Esqueci";
import Contatos from "./Pages/Contatos";
import Error from "./Pages/Error";
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [theme, colorMode] = useMode();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Pequeno atraso para garantir que o tema foi carregado
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    )
  }

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
                <Route element={<PageLayout />}>
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
