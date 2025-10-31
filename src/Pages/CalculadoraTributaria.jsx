import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../Tema";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { Grow } from "@mui/material";

const CalculadoraTributaria = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Estado para controlar a aba ativa
  const [tabValue, setTabValue] = useState(0);

  // Estilos dos alertas
  const getAlertStyles = (severity) => {
    if (severity === "success") {
      return {
        mb: 3,
        backgroundColor: colors.greenAccent[100],
        color: colors.greenAccent[900],
        '& .MuiAlert-icon': {
          color: colors.greenAccent[500],
        },
      };
    } else {
      return {
        mb: 3,
        backgroundColor: colors.redAccent[100],
        color: colors.redAccent[900],
        '& .MuiAlert-icon': {
          color: colors.redAccent[500],
        },
      };
    }
  };

  // Estados do formulário
  const [formData, setFormData] = useState({
    rendaMensal: "",
    custosMensais: "",
    profissao: "",
    enviarEmail: false,
    emailUsuario: "",
    emailNAF: "naf01.dl@unichristus.edu.br",
  });

  // Adicione useEffect para sincronizar com formData
  React.useEffect(() => {
    setValue("profissao", formData.profissao);
  }, [formData.profissao, setValue]);

  // Estados de resultados
  const [resultadoPF, setResultadoPF] = useState(null);
  const [resultadoPJ, setResultadoPJ] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Estados de alerta
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  //enviar email
  const onSubmit = (data) => {
    console.log("Email do usuário:", data);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  // Constantes
  const SALARIO_MINIMO = 1518.0;
  const LIMITE_RENDA = 15000.0;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // Função para formatar valores monetários
  const formatMoney = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Validação do formulário
  const validarFormulario = () => {
    const renda = parseFloat(formData.rendaMensal) || 0;
    const custos = parseFloat(formData.custosMensais) || 0;

    if (!formData.rendaMensal || renda <= 0) {
      showAlert("Por favor, informe a Renda Mensal", "error");
      return false;
    }

    if (renda > LIMITE_RENDA) {
      showAlert(
        `A Renda Mensal não pode exceder ${formatMoney(LIMITE_RENDA)}`,
        "error"
      );
      return false;
    }

    if (!formData.custosMensais || custos < 0) {
      showAlert("Por favor, informe os Custos Mensais", "error");
      return false;
    }

    if (!formData.profissao) {
      showAlert("Por favor, selecione a Profissão", "error");
      return false;
    }

    if (formData.enviarEmail && !formData.emailUsuario) {
      showAlert(
        "Por favor, informe seu e-mail para receber os cálculos",
        "error"
      );
      return false;
    }

    return true;
  };

  // Função para mostrar alerta
  const showAlert = (message, severity = "success") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  // Cálculo de Pessoa Física
  const calcularPF = (renda, custos) => {
    const baseCalculo = renda - custos;
    let imposto = 0;
    let aliquota = 0;
    let parcelaADeduzir = 0;
    let faixa = "";

    // Tabela Progressiva Mensal
    if (baseCalculo <= 2428.8) {
      imposto = 0;
      aliquota = 0;
      parcelaADeduzir = 0;
      faixa = "Até R$ 2.428,80";
    } else if (baseCalculo <= 2826.65) {
      aliquota = 7.5;
      parcelaADeduzir = 182.16;
      imposto = baseCalculo * 0.075 - parcelaADeduzir;
      faixa = "De R$ 2.428,81 até R$ 2.826,65";
    } else if (baseCalculo <= 3751.05) {
      aliquota = 15;
      parcelaADeduzir = 394.16;
      imposto = baseCalculo * 0.15 - parcelaADeduzir;
      faixa = "De R$ 2.826,66 até R$ 3.751,05";
    } else if (baseCalculo <= 4664.68) {
      aliquota = 22.5;
      parcelaADeduzir = 675.49;
      imposto = baseCalculo * 0.225 - parcelaADeduzir;
      faixa = "De R$ 3.751,06 até R$ 4.664,68";
    } else {
      aliquota = 27.5;
      parcelaADeduzir = 908.73;
      imposto = baseCalculo * 0.275 - parcelaADeduzir;
      faixa = "Acima de R$ 4.664,68";
    }

    const rendaLiquida = renda - imposto;
    const aliquotaEfetiva = renda > 0 ? (imposto / renda) * 100 : 0;

    return {
      renda,
      custos,
      baseCalculo,
      faixa,
      aliquota,
      parcelaADeduzir,
      imposto: Math.max(0, imposto),
      rendaLiquida,
      aliquotaEfetiva,
    };
  };

  // Cálculo de Pessoa Jurídica
  const calcularPJ = (renda) => {
    // Simples Nacional - 6%
    const simplesNacional = renda * 0.06;

    // Pró-labore: maior entre 28% da renda ou salário mínimo
    const proLabore28 = renda * 0.28;
    const proLabore = Math.max(proLabore28, SALARIO_MINIMO);

    // INSS sobre pró-labore - 11%
    const inss = proLabore * 0.11;

    // IR sobre pró-labore (aplicar tabela PF)
    let irProLabore = 0;
    if (proLabore <= 2428.8) {
      irProLabore = 0;
    } else if (proLabore <= 2826.65) {
      irProLabore = proLabore * 0.075 - 182.16;
    } else if (proLabore <= 3751.05) {
      irProLabore = proLabore * 0.15 - 394.16;
    } else if (proLabore <= 4664.68) {
      irProLabore = proLabore * 0.225 - 675.49;
    } else {
      irProLabore = proLabore * 0.275 - 908.73;
    }

    irProLabore = Math.max(0, irProLabore);

    // Total PJ
    const totalPJ = simplesNacional + inss + irProLabore;
    const rendaLiquida = renda - totalPJ;

    return {
      renda,
      proLabore,
      simplesNacional,
      inss,
      irProLabore,
      totalPJ,
      rendaLiquida,
    };
  };

  // Função principal de cálculo
  const calcular = () => {
    if (!validarFormulario()) {
      return;
    }

    const renda = parseFloat(formData.rendaMensal);
    const custos = parseFloat(formData.custosMensais);

    // Calcular ambos
    const pf = calcularPF(renda, custos);
    const pj = calcularPJ(renda);

    setResultadoPF(pf);
    setResultadoPJ(pj);
    setMostrarResultados(true);
  };

  // Função para enviar e-mail (simulação)
  const enviarEmail = (pf, pj) => {
    // alerta mensagem 
    console.log("Enviando e-mail de:", formData.emailUsuario);
    console.log("Enviando e-mail para NAF:", formData.emailNAF);
    console.log("Resultados PF:", pf);
    console.log("Resultados PJ:", pj);

    showAlert("Resultados enviados para seu email.", "success");
  };

  // Componente de Tooltip com informações
  const InfoTooltip = ({ title, children }) => (
    <Tooltip
      title={title}
      arrow
      placement="right"
      sx={{
        "& .MuiTooltip-tooltip": {
          fontSize: "0.875rem",
          maxWidth: 350,
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
          padding: 2,
        },
      }}
    >
      {children}
    </Tooltip>
  );

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        p: { xs: 2, md: 4 },
        minHeight: "70vh",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="600"
        sx={{
          mb: 1,
        }}
      >
        Calculadora de Tributação
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          mb: 4,
          color:
            theme.palette.mode === "dark" ? colors.grey[400] : colors.grey[600],
        }}
      >
        Para Profissionais de Psicologia - Comparação PF x PJ
      </Typography>

      {/* Alert de feedback */}
      <Collapse in={alertVisible}>
        <Alert
          severity={alertSeverity}
          onClose={() => setAlertVisible(false)}
          sx={getAlertStyles(alertSeverity)}

        >
          {alertMessage}
        </Alert>
      </Collapse>

      {/* Formulário */}
      <Paper
        elevation={0}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: { xs: 2, md: 3 },
          backgroundColor: colors.primary[500],
          border: "1px solid",
          borderColor:
            theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[300],
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            mb: 3,
            color:
              theme.palette.mode === "dark"
                ? colors.grey[100]
                : colors.grey[800],
          }}
        >
          Dados para Cálculo
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Primeira linha: Renda Mensal, Custos Mensais e Profissão */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "flex-start", // Alinha no topo
              justifyContent: "space-between",
              flexWrap: { xs: "wrap", md: "nowrap" }, // Quebra em mobile
            }}
          >
            {/* Renda Mensal */}
            <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "auto" } }}>
              <TextField
                label="Renda Mensal"
                name="rendaMensal"
                type="number"
                value={formData.rendaMensal}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{
                  min: 0,
                  max: LIMITE_RENDA,
                  step: "0.01",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <InfoTooltip title="É o valor que você espera receber por mês com o seu trabalho. No caso da psicologia, pode ser o total recebido das consultas, atendimentos ou serviços prestados, antes de descontar as despesas.">
                        <IconButton size="small">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </InfoTooltip>
                    </InputAdornment>
                  ),
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
                    color:
                      theme.palette.mode === "dark"
                        ? colors.grey[500]
                        : colors.grey[600],
                  },
                }}
                helperText={`Limite máximo: ${formatMoney(LIMITE_RENDA)}`}
              />
            </Box>

            {/* Custos Mensais */}
            <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "auto" } }}>
              <TextField
                label="Total de Custos Mensais"
                name="custosMensais"
                type="number"
                value={formData.custosMensais}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{
                  min: 0,
                  step: "0.01",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <InfoTooltip title="São os gastos mensais necessários para o seu trabalho acontecer, como aluguel da sala, internet, energia, telefone, material de escritório, entre outros. Essas despesas podem ser usadas para reduzir a base de cálculo do imposto (no caso da pessoa física).">
                        <IconButton size="small">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </InfoTooltip>
                    </InputAdornment>
                  ),
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
                    color:
                      theme.palette.mode === "dark"
                        ? colors.grey[500]
                        : colors.grey[600],
                  },
                }}
              />
            </Box>

            {/* Profissão*/}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "100%", md: "300px" },
                maxWidth: { md: "350px" },
              }}
            >
              <FormControl fullWidth>
                <InputLabel
                  id="profissao-label"
                  sx={{
                    color: colors.grey[300],
                    "&.Mui-focused": {
                      color: colors.blueAccent[500],
                    },
                  }}
                >
                  Profissão
                </InputLabel>
                <Select
                  labelId="profissao-label"
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleChange}
                  label="Profissão"
                  sx={{
                    minHeight: "56px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.grey[300],
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.blueAccent[500],
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.blueAccent[500],
                    },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.primary[500],
                      "& fieldset": { borderColor: colors.grey[300] },
                      "&:hover fieldset": {
                        borderColor: colors.blueAccent[500],
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.blueAccent[500],
                      },
                    },
                    "& .MuiSelect-select": {
                      color: colors.grey[100],
                      padding: "16.5px 14px",
                      display: "flex",
                      alignItems: "center",
                      minHeight: "auto",
                    },
                  }}
                >
                  <MenuItem value="Psicólogo">Psicólogo</MenuItem>
                  <MenuItem value="Psicóloga">Psicóloga</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Terceira linha: Botão Calcular */}
          <Box>
            <Button
              fullWidth
              variant="contained"
              onClick={calcular}
              size="large"
              sx={{
                backgroundColor: colors.redAccent[500],
                color: colors.grey[900],
                fontWeight: "bold",
                py: 1.5,
                "&:hover": {
                  backgroundColor: colors.redAccent[600],
                  color: colors.grey[900],
                  transform: "translateY(-2px)",
                  boxShadow: 3,
                },
                transition: "all 0.3s ease",
                maxWidth: "400px",
                mx: "auto",
                display: "block",
              }}
            >
              Calcular Tributação
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Resultados */}
      {mostrarResultados && resultadoPF && resultadoPJ && (
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            sx={{ mb: 3 }}
          >
            Comparação de Resultados
          </Typography>

          {/* Tabs para alternar entre PF e PJ */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              textColor="inherit"
              sx={{
                "& .MuiTab-root": {
                  color: theme.palette.text.secondary,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                },
                "& .MuiTab-root.Mui-selected": {
                  color: colors.blueAccent[500],
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: colors.blueAccent[500],
                },
              }}
            >
              <Tab label="Pessoa Física (PF)" />
              <Tab label="Pessoa Jurídica (PJ)" />
              <Tab label="Comparação" />
            </Tabs>
          </Box>

          {/* Conteúdo da aba Pessoa Física */}
          {tabValue === 0 && (
            <Paper sx={{ p: 3, backgroundColor: colors.primary[500] }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 3, color: colors.blueAccent[400] }}
              >
                Resultado Pessoa Física (IRPF)
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    Renda Mensal:
                  </Typography>
                  <Typography variant="body1">
                    {formatMoney(resultadoPF.renda)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    Custos Mensais:
                  </Typography>
                  <Typography variant="body1">
                    {formatMoney(resultadoPF.custos)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    Base de Cálculo:
                  </Typography>
                  <Typography variant="body1">
                    {formatMoney(resultadoPF.baseCalculo)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    Faixa de Tributação:
                  </Typography>
                  <Typography variant="body1">{resultadoPF.faixa}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    Alíquota:
                  </Typography>
                  <Typography variant="body1">
                    {resultadoPF.aliquota}%
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    Parcela a Deduzir:
                  </Typography>
                  <Typography variant="body1">
                    {formatMoney(resultadoPF.parcelaADeduzir)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color="error.main"
                  >
                    Imposto de Renda (IR):
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="error.main">
                    {formatMoney(resultadoPF.imposto)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color="success.main"
                  >
                    Renda Líquida:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="success.main"
                  >
                    {formatMoney(resultadoPF.rendaLiquida)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" fontWeight="600">
                    Alíquota Efetiva:
                  </Typography>
                  <Typography variant="body1">
                    {resultadoPF.aliquotaEfetiva.toFixed(2)}%
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Conteúdo da aba Pessoa Jurídica */}
          {tabValue === 1 && (
            <Paper sx={{ p: 3, backgroundColor: colors.primary[500] }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 3, color: colors.greenAccent[400] }}
              >
                Resultado Pessoa Jurídica (PJ)
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    Renda Mensal:
                  </Typography>
                  <Typography variant="body1">
                    {formatMoney(resultadoPJ.renda)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    Pró-labore:
                  </Typography>
                  <Typography variant="body1">
                    {formatMoney(resultadoPJ.proLabore)}
                  </Typography>
                  <Typography variant="caption" color={colors.grey[400]}>
                    Maior entre 28% da renda (
                    {formatMoney(resultadoPJ.renda * 0.28)}) ou salário mínimo (
                    {formatMoney(SALARIO_MINIMO)})
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    Simples Nacional (6%):
                  </Typography>
                  <Typography variant="body1">
                    {formatMoney(resultadoPJ.simplesNacional)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    INSS (11% sobre pró-labore):
                  </Typography>
                  <Typography variant="body1">
                    {formatMoney(resultadoPJ.inss)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">
                    IR sobre pró-labore:
                  </Typography>
                  <Typography variant="body1">
                    {formatMoney(resultadoPJ.irProLabore)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color="error.main"
                  >
                    Total de Tributos:
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="error.main">
                    {formatMoney(resultadoPJ.totalPJ)}
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
                    variant="h6"
                    fontWeight="bold"
                    color="success.main"
                  >
                    {formatMoney(resultadoPJ.rendaLiquida)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          )}
          {/* Conteúdo da aba Comparação */}
          {tabValue === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Paper sx={{
                p: 3,
                backgroundColor: colors.primary[500],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%"
              }}>

                {/* Primeira linha: Título */}
                <Box sx={{ width: "100%", textAlign: "center", mb: 3 }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    Comparação PF x PJ
                  </Typography>
                </Box>

                {/* Segunda linha: Comparação PF, PJ e Recomendação */}
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  gap: 3,
                  mb: 3
                }}>

                    {/* Pessoa Física */}
                    
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor: colors.primary[200],
                          border: `2px solid ${colors.blueAccent[500]}`,
                          textAlign: "center",
                          height: "100%"
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ mb: 2, color: colors.blueAccent[400] }}
                        >
                          Pessoa Física (PF)
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Tributos Totais:{" "}
                          <strong style={{ color: colors.redAccent[400] }}>
                            {formatMoney(resultadoPF.imposto)}
                          </strong>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Renda Líquida:{" "}
                          <strong style={{ color: colors.greenAccent[400] }}>
                            {formatMoney(resultadoPF.rendaLiquida)}
                          </strong>
                        </Typography>
                        <Typography variant="body2">
                          Alíquota Efetiva:{" "}
                          <strong>{resultadoPF.aliquotaEfetiva.toFixed(2)}%</strong>
                        </Typography>
                      </Paper>
                    {/* </Grid> */}

                    {/* Pessoa Jurídica */}
                    <Grid item xs={12} md={4}>
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor: colors.primary[200],
                          border: `2px solid ${colors.greenAccent[500]}`,
                          textAlign: "center",
                          height: "100%"
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ mb: 2, color: colors.greenAccent[400] }}
                        >
                          Pessoa Jurídica (PJ)
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Tributos Totais:{" "}
                          <strong style={{ color: colors.redAccent[400] }}>
                            {formatMoney(resultadoPJ.totalPJ)}
                          </strong>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Renda Líquida:{" "}
                          <strong style={{ color: colors.greenAccent[400] }}>
                            {formatMoney(resultadoPJ.rendaLiquida)}
                          </strong>
                        </Typography>
                        <Typography variant="body2">
                          Alíquota Total:{" "}
                          <strong>
                            {(
                              (resultadoPJ.totalPJ / resultadoPJ.renda) *
                              100
                            ).toFixed(2)}
                            %
                          </strong>
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Recomendação */}
                    <Grid item xs={12} md={4}>
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor:
                            resultadoPF.rendaLiquida > resultadoPJ.rendaLiquida
                              ? colors.blueAccent[800]
                              : colors.greenAccent[800],
                          border: `3px solid ${resultadoPF.rendaLiquida > resultadoPJ.rendaLiquida
                              ? colors.blueAccent[500]
                              : colors.greenAccent[500]
                            }`,
                          textAlign: "center",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center"
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ mb: 1 }}
                        >
                          Recomendação
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {resultadoPF.rendaLiquida > resultadoPJ.rendaLiquida
                            ? `Pessoa Física (PF) é mais vantajosa!`
                            : `Pessoa Jurídica (PJ) é mais vantajosa!`}
                        </Typography>
                        <Typography variant="body2">
                          Economia de:{" "}
                          <strong>
                            {formatMoney(
                              Math.abs(
                                resultadoPF.rendaLiquida - resultadoPJ.rendaLiquida
                              )
                            )}
                          </strong>{" "}
                          por mês
                        </Typography>
                      </Paper>
                    </Grid>
                </Box>

                {/* Terceira linha: Observações */}
                <Box sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}>
                  <Paper sx={{
                    p: 2,
                    backgroundColor: colors.primary[200],
                    border: "1px solid grey",
                    width: "100%",
                    maxWidth: "800px",
                    textAlign: "center"
                  }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      Observações Importantes:
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Typography variant="body2" component="ul" sx={{
                        textAlign: "left",
                        pl: 2,
                        margin: 0
                      }}>
                        <li>Os cálculos são baseados na legislação atual (2025)</li>
                        <li>Pessoa Jurídica terá custos adicionais de contabilidade</li>
                        <li>Consulte um contador para análise personalizada</li>
                        <li>
                          Para dúvidas, entre em contato com o NAF: {formData.emailNAF}
                        </li>
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Paper>
            </Box>
          )}
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
            {/* Checkbox - Largura automática */}
            <Box sx={{ flexShrink: 0 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="enviarEmail"
                    checked={formData.enviarEmail}
                    onChange={handleChange}
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

            {/* Email Input e Button - aparecem condicionalmente */}
            <Grow in={formData.enviarEmail}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column", // Mudei para column
                  gap: 1,
                  alignItems: "center",
                  flex: 2,
                  minWidth: { xs: "100%", md: "auto" },
                }}
              >
                {/* Linha com TextField e Button */}
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
                    name="emailUsuario"
                    size="small"
                    type="email"
                    defaultValue={formData.emailUsuario}
                    required={formData.enviarEmail}
                    sx={{
                      flex: 2,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: colors.primary[500],
                        "& fieldset": { borderColor: colors.grey[300] },
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
                    {...register("email", {
                      required: "Email é obrigatório!",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "E-mail inválido"
                      },
                      onChange: (e) => {
                        setFormData({ ...formData, emailUsuario: e.target.value });
                      }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  <Button
                    onClick={() => {
                      const emailValue = watch("email") || formData.emailUsuario;
                      if (!emailValue || emailValue.trim() === "") {
                        showAlert("Por favor, informe seu e-mail", "error");
                        return;
                      }
                      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                      if (!emailRegex.test(emailValue)) {
                        showAlert("Por favor, informe um e-mail válido", "error");
                        return;
                      }
                      if (resultadoPF && resultadoPJ) {
                        setFormData({ ...formData, emailUsuario: emailValue });
                        enviarEmail(resultadoPF, resultadoPJ);
                      } else {
                        showAlert("Por favor, calcule os resultados primeiro", "error");
                      }
                    }}
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

                {/* Alert */}
                <Collapse in={alertVisible} sx={{ width: "100%", maxWidth: "400px" }}>
                  <Alert
                    severity={alertSeverity}
                    onClose={() => setAlertVisible(false)}
                    sx={{
                      mt: 1,
                      backgroundColor: alertSeverity === "success" ? colors.greenAccent[100] : colors.redAccent[100],
                      color: alertSeverity === "success" ? colors.greenAccent[900] : colors.redAccent[900],
                      '& .MuiAlert-icon': {
                        color: alertSeverity === "success" ? colors.greenAccent[500] : colors.redAccent[500],
                      },
                    }}
                  >
                    {alertMessage}
                  </Alert>
                </Collapse>
              </Box>
            </Grow>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CalculadoraTributaria;
