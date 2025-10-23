import React from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TabelaTributacao = () => {
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 700, mx: "auto", my: 2 }}
      >
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
  );
};
export default TabelaTributacao;
