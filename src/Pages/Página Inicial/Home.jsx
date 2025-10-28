import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import ModalCalculoPF from "../../Components/Modals/ModalCalculoPF";
import ModalCalculoPJ from "../../Components/Modals/ModalCalculoPJ";
import ModalExplicacoes from "../../Components/Modals/ModalExplicacoes";
import useUserStore from "../../store/useUserStore";
import ModalRendaMensal from "../../Components/Modals/ModalRendaMensal";

const Home = () => {
  const userName = useUserStore((state) => state.userName);

  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto", // margin inline auto
        px: 4,
        py: 8,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        gutterBottom
      >
        Bem-vindo, {userName || "visitante"}, à sua Calculadora de Tributação
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Escolha qual a sua modalidade para calcular seu IR: 
      </Typography>
      <Stack
      direction="column"
      spacing={3}
      alignItems="center"
      justifyContent="center"
      > 
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        >
        <ModalCalculoPF />
        <ModalCalculoPJ />
      </Stack>
      <Typography sx={{pt: 5}}>
        Dúvidas sobre os cálculos?
      </Typography>
       <ModalExplicacoes />
        </Stack>
    </Box>
  );
};

export default Home;
