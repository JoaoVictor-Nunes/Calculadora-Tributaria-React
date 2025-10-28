import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";
import { getButtonStyles } from "../../utils/formStyles";
import ModalCalculoPF from "../../Components/Modals/ModalCalculoPF";
import ModalCalculoPJ from "../../Components/Modals/ModalCalculoPJ";
import ModalExplicacoes from "../../Components/Modals/ModalExplicacoes";
import useUserStore from "../../store/useUserStore";
import CalculateIcon from "@mui/icons-material/Calculate";

const Home = () => {
  const userName = useUserStore((state) => state.userName);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        Compare a tributação entre Pessoa Física e Pessoa Jurídica para profissionais de psicologia
      </Typography>

      {/* Botão Principal - Nova Calculadora Completa */}
      <Box sx={{ mb: 5 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<CalculateIcon />}
          onClick={() => navigate("/calculadora")}
          sx={{
            ...getButtonStyles(theme, "primary"),
            px: 4,
            fontSize: "1.1rem"
          }}
        >
          Acessar Calculadora Completa
        </Button>
        <Typography
          variant="caption"
          display="block"
          sx={{
            mt: 1,
            color: theme.palette.mode === "dark" ? colors.grey[400] : colors.grey[600]
          }}
        >
          Calcule e compare PF x PJ em uma única página
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 2, color: colors.grey[300] }}>
        Ou escolha uma modalidade específica:
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
