import { Box, Typography, Stack } from "@mui/material";
import ModalCalculoPF from "../../Components/Modals/ModalCalculoPF";
import ModalCalculoPJ from "../../Components/Modals/ModalCalculoPJ";
import ModalExplicacoes from "../../Components/Modals/ModalExplicacoes";
import useUserStore from "../../store/useUserStore";
import ModalComparacao from "../../Components/Modals/ModalComparacao";

const Home = () => {
  const userName = useUserStore((state) => state.userName);


  return (
    <Box
      sx={{
        mx: "auto", // margin inline auto
        px: 4,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        gutterBottom
      >
        Bem-vindo(a), {userName || "visitante"}, à sua Calculadora de Tributação
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, fontSize: "18px" }}>
        Compare a tributação entre Pessoa Física e Pessoa Jurídica para profissionais de psicologia
      </Typography>

      <Box sx={{ mb: 5 }}>
        < ModalComparacao />
        <Typography
          sx={{
            mt: 3,
            fontSize: "18px" 
          }}
        >
          Calcule e compare PF x PJ em uma única página
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 2, fontSize: "18px" }}>
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
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          <ModalCalculoPF />
          <ModalCalculoPJ />
        </Stack>
        <Typography sx={{ pt: 5, fontSize: "18px" }}>
          Dúvidas sobre os cálculos?
        </Typography>
        <ModalExplicacoes />
      </Stack>
    </Box>
  );
};

export default Home;
