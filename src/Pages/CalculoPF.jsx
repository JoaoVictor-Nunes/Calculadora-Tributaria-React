import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../Tema";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const CalculoPF = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    rendaBruta: "",
    dependentes: "0",
    despesasDeduciveis: "",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calcularIRPF = () => {
    const rendaBruta = parseFloat(formData.rendaBruta) || 0;
    const dependentes = parseInt(formData.dependentes) || 0;
    const despesasDeduciveis = parseFloat(formData.despesasDeduciveis) || 0;

    // Dedução por dependente (valor usado no projeto)
    const deducaoPorDependente = 2275.08;
    const totalDeducaoDependentes = dependentes * deducaoPorDependente;

    // Base de cálculo
    const baseCalculo =
      rendaBruta - totalDeducaoDependentes - despesasDeduciveis;

    // Alíquotas e faixas (mesma lógica do original)
    let imposto = 0;
    let aliquotaEfetiva = 0;

    if (baseCalculo <= 22847.76) {
      imposto = 0;
      aliquotaEfetiva = 0;
    } else if (baseCalculo <= 33919.8) {
      imposto = (baseCalculo - 22847.76) * 0.075;
      aliquotaEfetiva = (imposto / rendaBruta) * 100;
    } else if (baseCalculo <= 45012.6) {
      imposto = (33919.8 - 22847.76) * 0.075 + (baseCalculo - 33919.8) * 0.15;
      aliquotaEfetiva = (imposto / rendaBruta) * 100;
    } else if (baseCalculo <= 55976.16) {
      imposto =
        (33919.8 - 22847.76) * 0.075 +
        (45012.6 - 33919.8) * 0.15 +
        (baseCalculo - 45012.6) * 0.225;
      aliquotaEfetiva = (imposto / rendaBruta) * 100;
    } else {
      imposto =
        (33919.8 - 22847.76) * 0.075 +
        (45012.6 - 33919.8) * 0.15 +
        (55976.16 - 45012.6) * 0.225 +
        (baseCalculo - 55976.16) * 0.275;
      aliquotaEfetiva = (imposto / rendaBruta) * 100;
    }

    setResultado({
      rendaBruta,
      dependentes,
      despesasDeduciveis,
      totalDeducaoDependentes,
      baseCalculo,
      imposto,
      aliquotaEfetiva: aliquotaEfetiva.toFixed(2),
      rendaLiquida: rendaBruta - imposto,
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, md: 4 }, minHeight: "50vh"}}>
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 3 }}>
        Cálculo de Tributação - Pessoa Física (IRPF)
      </Typography>

      <Paper
        sx={{
          p: 3,
          backgroundColor: colors.primary[500],
          border: "1px solid",
          borderColor: "#878787",
        }}
      >
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Renda Bruta Anual (R$)"
                name="rendaBruta"
                type="number"
                value={formData.rendaBruta}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: colors.primary[500],
                    "& fieldset": {
                      borderColor: colors.grey[300],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.blueAccent[500],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.blueAccent[500],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[300],
                    "&.Mui-focused": {
                      color: colors.blueAccent[500],
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "colors.grey[900]",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número de Dependentes"
                name="dependentes"
                type="number"
                value={formData.dependentes}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: colors.primary[500],
                    "& fieldset": {
                      borderColor: colors.grey[300],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.blueAccent[500],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.blueAccent[500],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[300],
                    "&.Mui-focused": {
                      color: colors.blueAccent[500],
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "colors.grey[900]",
                  },
                }}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Despesas Dedutíveis (R$)"
                name="despesasDeduciveis"
                type="number"
                value={formData.despesasDeduciveis}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: colors.primary[500],
                    "& fieldset": {
                      borderColor: colors.grey[300],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.blueAccent[500],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.blueAccent[500],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[300],
                    "&.Mui-focused": {
                      color: colors.blueAccent[500],
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "colors.grey[900]",
                  },
                }}
                placeholder="Gastos com saúde, educação, etc."
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={calcularIRPF}
                sx={{
                  bgcolor: colors.blueAccent[500],
                  "&:hover": { bgcolor: colors.blueAccent[600] },
                }}
              >
                Calcular IRPF
              </Button>
            </Grid>
          </Grid>
        </Box>

        {resultado && (
          <Paper sx={{ mt: 3, p: 2, backgroundColor: colors.primary[400] }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Resultado do Cálculo:
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Renda Bruta:
                </Typography>
                <Typography variant="body2">
                  R${" "}
                  {resultado.rendaBruta.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Dependentes:
                </Typography>
                <Typography variant="body2">{resultado.dependentes}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Dedução por Dependentes:
                </Typography>
                <Typography variant="body2">
                  R${" "}
                  {resultado.totalDeducaoDependentes.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Despesas Dedutíveis:
                </Typography>
                <Typography variant="body2">
                  R${" "}
                  {resultado.despesasDeduciveis.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Base de Cálculo:
                </Typography>
                <Typography variant="body2">
                  R${" "}
                  {resultado.baseCalculo.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Alíquota Efetiva:
                </Typography>
                <Typography variant="body2">
                  {resultado.aliquotaEfetiva}%
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" fontWeight="600" color="error.main">
                  Imposto Devido:
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="error.main"
                >
                  R${" "}
                  {resultado.imposto.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="success.main"
                >
                  Renda Líquida:
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="success.main"
                >
                  R${" "}
                  {resultado.rendaLiquida.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default CalculoPF;
