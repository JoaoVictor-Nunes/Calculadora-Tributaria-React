import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  useTheme,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { tokens } from "../../Tema";
import ModalRendaMensal from "../../Components/Modals/ModalRendaMensal";
import ModalCustosMensais from "../../Components/Modals/ModalCustosMensais";

const CalculoPF = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    rendaMensal: "",
    custosMensais: "",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calcularIRPF = () => {
    const rendaMensal = parseFloat(formData.rendaMensal) || 0;
    const custosMensais = parseFloat(formData.custosMensais) || 0;

    // Base de cálculo (conforme PDF)
    const baseCalculo = rendaMensal - custosMensais;

    // Tabela IRPF mensal (PDF)
    const faixas = [
      { limite: 2428.8, aliquota: 0, deducao: 0 },
      { limite: 2826.65, aliquota: 0.075, deducao: 182.16 },
      { limite: 3751.05, aliquota: 0.15, deducao: 394.16 },
      { limite: 4664.68, aliquota: 0.225, deducao: 675.49 },
      { limite: Infinity, aliquota: 0.275, deducao: 908.73 },
    ];

    let aliquota = 0;
    let deducao = 0;

    // Identifica a faixa correta
    for (let faixa of faixas) {
      if (baseCalculo <= faixa.limite) {
        aliquota = faixa.aliquota;
        deducao = faixa.deducao;
        break;
      }
    }

    // Cálculo do IR (após aplicar a alíquota e dedução)
    let imposto = baseCalculo * aliquota - deducao;
    if (imposto < 0) imposto = 0;

    setResultado({
      rendaMensal,
      custosMensais,
      baseCalculo,
      aliquota: aliquota * 100,
      deducao,
      imposto,
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, md: 4 } }}>
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
        <Grid container spacing={2}>
          {/* Campo Renda Mensal */}

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                label="Renda Mensal (R$)"
                name="rendaMensal"
                type="number"
                value={formData.rendaMensal}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  marginBottom: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: colors.primary[500],
                    "& fieldset": { borderColor: colors.grey[300] },
                    "&:hover fieldset": { borderColor: colors.blueAccent[500] },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.blueAccent[500],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[300],
                    "&.Mui-focused": { color: colors.blueAccent[500] },
                  },
                  "& .MuiOutlinedInput-input": { color: colors.grey[100] },
                }}
              />
              <ModalRendaMensal />
            </Box>
          </Grid>

          {/* Campo Custos Mensais */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                label="Custos Mensais (R$)"
                name="custosMensais"
                type="number"
                value={formData.custosMensais}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="Despesas dedutíveis mensais"
                sx={{
                  marginBottom: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: colors.primary[500],
                    "& fieldset": { borderColor: colors.grey[300] },
                    "&:hover fieldset": { borderColor: colors.blueAccent[500] },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.blueAccent[500],
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[300],
                    "&.Mui-focused": { color: colors.blueAccent[500] },
                  },
                  "& .MuiOutlinedInput-input": { color: colors.grey[100] },
                }}
              />
              <ModalCustosMensais />
            </Box>
          </Grid>

          {/* Botão Calcular */}
          <Grid item xs={12} md={2} display="flex" alignItems="stretch">
            <Button
              fullWidth
              variant="contained"
              onClick={calcularIRPF}
              sx={{
                bgcolor: colors.blueAccent[500],
                "&:hover": { bgcolor: colors.blueAccent[600] },
                height: "100%",
                fontWeight: "bold",
              }}
            >
              Calcular
            </Button>
          </Grid>
        </Grid>

        {/* Exibição dos resultados */}
        {resultado && (
          <Paper
            variant="outlined"
            sx={{ mt: 3, p: 2, backgroundColor: colors.primary[200] }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Resultado do Cálculo:
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Renda Mensal:
                </Typography>
                <Typography variant="body2">
                  R${" "}
                  {resultado.rendaMensal.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Custos Mensais:
                </Typography>
                <Typography variant="body2">
                  R${" "}
                  {resultado.custosMensais.toLocaleString("pt-BR", {
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
                  Alíquota:
                </Typography>
                <Typography variant="body2">{resultado.aliquota}%</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Parcela Dedutível:
                </Typography>
                <Typography variant="body2">
                  R${" "}
                  {resultado.deducao.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
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
            </Grid>
             
          </Paper>
        )}
     <FormControlLabel
        label="Deseja receber os resultados via email?"
        control={
          <Checkbox
            sx={{
              display: "inline-flex",
              alignItems: "center",
              color: colors.grey[300],
              "&.Mui-checked": {
                color: colors.blueAccent[500],
              },
            }}
          />
        }
        sx={{
          "& .MuiFormControlLabel-label": {
            color: colors.grey[100],
          },
        }}
      />
      </Paper>
    </Box>
  );
};

export default CalculoPF;
