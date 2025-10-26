import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../Tema";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const CalculoPJ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    rendaMensal: "",
    salarioMinimo: "1382.50" // valor padrão, ajuste se quiser
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calcularPJ = () => {
    const renda = parseFloat(formData.rendaMensal) || 0;
    const salarioMinimo = parseFloat(formData.salarioMinimo) || 0;

    // Pró-labore: maior entre 28% da renda e salário mínimo
    const proLabore = Math.max(renda * 0.28, salarioMinimo);

    // Simples Nacional (exemplo): 6% sobre a renda mensal
    const simples = renda * 0.06;

    // INSS sobre pró-labore (exemplo): 11%
    const inss = proLabore * 0.11;

    // Total PJ (simples + INSS) - IR sobre pró-labore não incluído aqui (pode aplicar tabela PF se desejar)
    const totalPJ = simples + inss;

    setResultado({
      renda,
      proLabore,
      simples,
      inss,
      totalPJ,
      rendaLiquidaPJ: renda - totalPJ
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 3 }}>
        Cálculo de Tributação - Pessoa Jurídica (PJ)
      </Typography>

      <Paper sx={{ p: 3, backgroundColor: colors.primary[500] }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Renda Mensal (R$)"
              name="rendaMensal"
              type="number"
              value={formData.rendaMensal}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: colors.primary[400] }}
              placeholder="Digite a receita mensal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Salário Mínimo (para pró-labore)"
              name="salarioMinimo"
              type="number"
              value={formData.salarioMinimo}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: colors.primary[400] }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={calcularPJ}
              sx={{
                bgcolor: colors.greenAccent[600],
                "&:hover": { bgcolor: colors.greenAccent[700] }
              }}
            >
              Calcular PJ
            </Button>
          </Grid>
        </Grid>

        {resultado && (
          <Paper sx={{ mt: 3, p: 2, backgroundColor: colors.primary[400] }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Resultado PJ:
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">Renda Mensal:</Typography>
                <Typography variant="body2">
                  R$ {resultado.renda.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">Pró-labore:</Typography>
                <Typography variant="body2">
                  R$ {resultado.proLabore.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">Simples Nacional (6%):</Typography>
                <Typography variant="body2">
                  R$ {resultado.simples.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">INSS (11% sobre pró-labore):</Typography>
                <Typography variant="body2">
                  R$ {resultado.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" fontWeight="600">Total PJ (Simples + INSS):</Typography>
                <Typography variant="body1" fontWeight="bold" color="error.main">
                  R$ {resultado.totalPJ.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" fontWeight="600" color="success.main">Renda Líquida aproximada:</Typography>
                <Typography variant="body1" fontWeight="bold" color="success.main">
                  R$ {resultado.rendaLiquidaPJ.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default CalculoPJ;