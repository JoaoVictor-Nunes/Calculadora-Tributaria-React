import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useTheme,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
  Grow,
  Collapse,
  Alert,
  FormControlLabel,
  Checkbox,
  Link
} from "@mui/material";
import RendaTooltip from "../../Components/RendaTooltip";
import { tokens } from "../../Tema";

const CalculoPJ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const LIMITE_RENDA = 15000.0;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rendaMensal: "",
      salarioMinimo: "1518.0", // Mudei de custosMensais para salarioMinimo
      enviarEmail: false,
      emailUsuario: "",
    }
  });

  // Watch dos campos para validação do botão
  const watchedFields = watch();
  const areAllFieldsFilled =
    watchedFields.rendaMensal &&
    watchedFields.salarioMinimo; // Mudei para salarioMinimo

  const isButtonDisabled = !areAllFieldsFilled;

  const [resultado, setResultado] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const enviarEmail = (resultadoPJ) => {
    const emailUsuario = watch("emailUsuario");
    console.log("Enviando email...", { resultadoPJ, email: emailUsuario });
    showAlert("E-mail enviado com sucesso!", "success");
  };

  // Função principal de cálculo - agora recebe os dados do react-hook-form
  const calcularPJ = (data) => {
    const renda = parseFloat(data.rendaMensal) || 0;
    const salarioMinimo = parseFloat(data.salarioMinimo) || 1518.0;

    // Validação adicional
    if (renda > LIMITE_RENDA) {
      showAlert(
        `A Renda Mensal não pode exceder ${formatMoney(LIMITE_RENDA)}`,
        "error"
      );
      return;
    }

    // Pró-labore: maior entre 28% da renda e salário mínimo
    const proLabore = Math.max(renda * 0.28, salarioMinimo);

    // Simples Nacional (exemplo): 6% sobre a renda mensal
    const simples = renda * 0.06;

    // INSS sobre pró-labore (exemplo): 11%
    const inss = proLabore * 0.11;

    // Total PJ (simples + INSS)
    const totalPJ = simples + inss;

    setResultado({
      renda,
      proLabore,
      simples,
      inss,
      totalPJ,
      rendaLiquidaPJ: renda - totalPJ,
    });
    showAlert("Cálculo realizado com sucesso!", "success");
  };

  const handleEnviarEmail = () => {
    const emailValue = watch("emailUsuario");

    if (!emailValue || emailValue.trim() === "") {
      showAlert("Por favor, informe seu e-mail", "error");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(emailValue)) {
      showAlert("Por favor, informe um e-mail válido", "error");
      return;
    }

    if (resultado) {
      enviarEmail(resultado);
    } else {
      showAlert("Por favor, calcule os resultados primeiro", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 3 }}>
        Cálculo de Tributação - Pessoa Jurídica (PJ)
      </Typography>

      {/* Formulário com handleSubmit integrado */}
      <Paper sx={{
        p: 3,
        backgroundColor: colors.primary[500],
        border: "1px solid",
        borderColor: "#878787",
      }}>
        <Box component="form" onSubmit={handleSubmit(calcularPJ)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: { xs: "wrap", md: "nowrap" },
              }}
            >
              {/* Renda Mensal */}
              <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "auto" } }}>
                <TextField
                  label="Renda Mensal"
                  type="number"
                  fullWidth
                  required
                  {...register("rendaMensal", {
                    required: "Renda mensal é obrigatória!",
                    min: { value: 0, message: "Renda não pode ser negativa" },
                    max: { value: LIMITE_RENDA, message: `Renda não pode exceder ${formatMoney(LIMITE_RENDA)}` },
                    valueAsNumber: true
                  })}
                  error={!!errors.rendaMensal}
                  helperText={errors.rendaMensal?.message || `Limite máximo: ${formatMoney(LIMITE_RENDA)}`}
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      max: LIMITE_RENDA,
                      step: "0.01",
                    },
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <RendaTooltip />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
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
                    "& .MuiFormHelperText-root": {
                      color: errors.rendaMensal
                        ? colors.redAccent[400]
                        : theme.palette.mode === "dark"
                          ? colors.grey[500]
                          : colors.grey[600],
                    },
                  }}
                />
              </Box>

              {/* Salário Mínimo (em vez de Custos Mensais) */}
              <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "auto" } }}>
                <TextField
                  label="Salário Mínimo (pró-labore)"
                  type="number"
                  fullWidth
                  required
                  {...register("salarioMinimo", {
                    required: "Salário mínimo é obrigatório!",
                    min: { value: 0, message: "Salário não pode ser negativo" },
                    valueAsNumber: true
                  })}
                  error={!!errors.salarioMinimo}
                  helperText={errors.salarioMinimo?.message}
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      step: "0.01",
                    },
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    },
                  }}
                  sx={{
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
                    "& .MuiFormHelperText-root": {
                      color: errors.salarioMinimo
                        ? colors.redAccent[400]
                        : theme.palette.mode === "dark"
                          ? colors.grey[500]
                          : colors.grey[600],
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Botão Calcular - agora é type="submit" */}
            <Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isButtonDisabled}
                sx={{
                  backgroundColor: isButtonDisabled
                    ? colors.grey[600]
                    : colors.blueAccent[500],
                  color: colors.grey[900],
                  fontWeight: "bold",
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: isButtonDisabled
                      ? colors.grey[600]
                      : colors.blueAccent[600],
                  },
                  maxWidth: "400px",
                  mx: "auto",
                  display: "block",
                }}
              >
                Calcular PJ
              </Button>
            </Box>
          </Box>
        </Box>

        {resultado && (
          <Paper
            variant="outlined"
            sx={{ mt: 3, p: 2, backgroundColor: colors.primary[200] }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Resultado PJ:
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Renda Mensal:
                </Typography>
                <Typography variant="body2">
                  {formatMoney(resultado.renda)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Pró-labore:
                </Typography>
                <Typography variant="body2">
                  {formatMoney(resultado.proLabore)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  Simples Nacional (6%):
                </Typography>
                <Typography variant="body2">
                  {formatMoney(resultado.simples)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600">
                  INSS (11% sobre pró-labore):
                </Typography>
                <Typography variant="body2">
                  {formatMoney(resultado.inss)}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" fontWeight="600">
                  Total PJ (Simples + INSS):
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="error.main"
                >
                  {formatMoney(resultado.totalPJ)}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="success.main"
                >
                  Renda Líquida aproximada:
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="success.main"
                >
                  {formatMoney(resultado.rendaLiquidaPJ)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Paper>

      {/* Seção de email */}
      {resultado && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: { xs: "wrap", md: "nowrap" },
            mt: 2,
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("enviarEmail")}
                  sx={{
                    color: colors.grey[300],
                    "&.Mui-checked": {
                      color: colors.blueAccent[500],
                    },
                  }}
                />
              }
              label="Deseja receber os cálculos por e-mail?"
              sx={{ color: colors.grey[100] }}
            />
          </Box>

          <Grow in={watch("enviarEmail")}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
                flex: 2,
                minWidth: { xs: "100%", md: "auto" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TextField
                  label="E-mail"
                  size="small"
                  type="email"
                  fullWidth
                  {...register("emailUsuario", {
                    required: watch("enviarEmail") ? "E-mail é obrigatório" : false,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "E-mail inválido"
                    }
                  })}
                  error={!!errors.emailUsuario}
                  sx={{
                    flex: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.primary[500],
                      "& fieldset": {
                        borderColor: errors.emailUsuario
                          ? colors.redAccent[400]
                          : colors.grey[300]
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
                      "&.Mui-focused": { color: colors.blueAccent[500] },
                    },
                    "& .MuiOutlinedInput-input": { color: colors.grey[100] },
                  }}
                />
                <Button
                  onClick={handleEnviarEmail}
                  sx={{
                    flex: 1,
                    minWidth: "140px",
                    height: "40px",
                    backgroundColor: colors.redAccent[500],
                    color: colors.grey[900],
                    borderRadius: "8px",
                    transition: "all 0.2s ease-in-out",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: colors.redAccent[600],
                      color: colors.grey[900],
                      transform: "translateY(-1px)",
                      boxShadow: `0 4px 8px ${colors.blueAccent[500]}40`,
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  }}
                >
                  Enviar resultados
                </Button>
              </Box>
            </Box>
          </Grow>
        </Box>
      )}

      {/* Alert */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Collapse in={alertVisible} sx={{ width: "100%", maxWidth: "400px" }}>
          <Alert
            severity={alertSeverity}
            onClose={() => setAlertVisible(false)}
            sx={{
              backgroundColor:
                alertSeverity === "success"
                  ? colors.greenAccent[100]
                  : colors.redAccent[100],
              color:
                alertSeverity === "success"
                  ? colors.greenAccent[900]
                  : colors.redAccent[900],
              "& .MuiAlert-icon": {
                color:
                  alertSeverity === "success"
                    ? colors.greenAccent[500]
                    : colors.redAccent[500],
              },
            }}
          >
            {alertMessage}
          </Alert>
        </Collapse>
      </Box>
      
      <Box marginTop={3}>
        <Typography variant="body1" sx={{ color: colors.grey[100] }}>
          Para fazer a comparação entre PF e PJ, acesse <Link sx={{
            color: colors.blueAccent[500],
            "&:hover": {
              color: colors.blueAccent[600],
            }, cursor: "pointer"
          }} onClick={() => navigate("/calculadora")}>Calculadora Comparativa</Link>
        </Typography>
      </Box>

    </Box>
  );
};

export default CalculoPJ;