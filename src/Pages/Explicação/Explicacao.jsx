import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens, ColorModeContext } from "../../Tema";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";

const Explicacao = () => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);

  return (
    <Box py={6}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Sobre a tributação:
      </Typography>
      <Typography variant="h6" px={6} py={3} align="center">
        A tributação serve para a arrecadação de tributos com a finalidade de financiar seus gastos públicos como saúde, educação, segurança etc.
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} py={4} mx={3} justifyContent="center">
        <Paper variant="outlined" elevation={4} sx={{ p: 3, minWidth: 280, backgroundColor: colors.primary[400] }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Renda Mensal:
          </Typography>
          <Typography>
            "É o valor que você espera receber por mês com o seu trabalho. No caso da psicologia, pode ser o total recebido das consultas, atendimentos ou serviços prestados, antes de descontar as despesas."
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 3, minWidth: 280, backgroundColor: colors.primary[400] }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Custos Mensais:
          </Typography>
          <Typography>
            "São os gastos mensais necessários para o seu trabalho acontecer, escritório, entre outros. Essas despesas podem ser usadas para reduzir a base de cálculo do imposto (no caso da pessoa física)."
          </Typography>
        </Paper>
      </Stack>
      <Box>
        <Typography variant="h5" fontWeight="bold" align="center" py={2}>
          Tabela mensal do Imposto de Renda
        </Typography>
        <Typography variant="h6" align="center" py={1}>
          Tabela Progressiva Mensal
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 700, mx: "auto", my: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Base do Cálculo (R$)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Alíquota (%)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Parcela a Deduzir do IR (R$)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">Até 2.428,80</TableCell>
                <TableCell align="center">0</TableCell>
                <TableCell align="center">0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">De 2.428,81 até 2.826,65</TableCell>
                <TableCell align="center">7,5</TableCell>
                <TableCell align="center">182,16</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">De 2.826,66 até 3.751,05</TableCell>
                <TableCell align="center">15</TableCell>
                <TableCell align="center">394,16</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">De 3.751,06 até 4.664,68</TableCell>
                <TableCell align="center">22,5</TableCell>
                <TableCell align="center">675,49</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell align="center">Acima de 4.664,68</TableCell>
                <TableCell align="center">27,5</TableCell>
                <TableCell align="center">908,73</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Typography variant="h5" fontWeight="bold" align="center" py={2}>
          Como são realizadas as contas?
        </Typography>
        <Paper variant="outlined" sx={{ p: 3, mx: { xs: 0, md: 6 }, my: 3, backgroundColor: colors.primary[400] }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
            Para Pessoa Física:
          </Typography>
          <Box px={2}>
            <Typography>Vamos entender por meio de um exemplo:</Typography>
            <Typography>
              Hipoteticamente, vamos dizer que você ganha R$ 3.000,00 e seus custos mensais são R$ 750,00, Ok?
            </Typography>
            <Typography>
              Com isso, o site vai começar subtraindo os seus{" "}
              <Box component="span" sx={{color: colors.blueAccent[900]}} fontWeight="bold">Custos mensais</Box> da sua{" "}
              <Box component="span" sx={{color: colors.blueAccent[900]}} fontWeight="bold">Renda mensal</Box>
            </Typography>
            <Typography>
              Depois, a Base vai dar R$ 2.250, o programa vai comparar com as bases de cálculo da tabela, para ver se o valor é maior ou menor. No caso, é menor que R$ 2.428,80, portanto, você seria isento.
            </Typography>
            <Typography>
              Agora, que vocês já entenderam como se calcula uma Base (Renda mensal - Custos mensais), vamos imaginar uma situação onde a Base seja maior e que seja tributada.
            </Typography>
            <Typography>
              Iremos usar de exemplo uma Base de R$ 3.000,00, neste caso, o programa compararia e perceberia que está entre 2.826,66 e 3.751,05, ou seja, ele será taxado.
            </Typography>
            <Typography>
              Tendo isso em mente, o programa irá fazer (3.000(Base) * 0,15(Alíquota em %)) - 394,16 = R$ 55,84
            </Typography>
            <Typography>
              Portanto, neste caso, você pagaria R$ 55,84 de Imposto de Renda!
            </Typography>
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ p: 3, mx: { xs: 0, md: 6 }, my: 3, backgroundColor: colors.primary[400] }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
            Para Pessoa Jurídica:
          </Typography>
          <Box component="ul" pl={3}>
            <Box component="li">
              {/* Adicione explicação para pessoa jurídica aqui */}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Explicacao;
