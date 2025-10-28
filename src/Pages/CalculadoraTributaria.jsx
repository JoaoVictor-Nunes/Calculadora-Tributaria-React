import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../Tema";
import { getInputStyles, getSelectStyles, getPaperStyles, getButtonStyles, getTabsStyles } from "../utils/formStyles";
import { getAppColors } from "../utils/themeColors";
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

const CalculadoraTributaria = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const appColors = getAppColors(theme);

  // Estado para controlar a aba ativa
  const [tabValue, setTabValue] = useState(0);

  // Estados do formulário
  const [formData, setFormData] = useState({
    rendaMensal: "",
    custosMensais: "",
    profissao: "",
    enviarEmail: false,
    emailUsuario: "",
    emailNAF: "naf01.dl@unichristus.edu.br"
  });

  // Estados de resultados
  const [resultadoPF, setResultadoPF] = useState(null);
  const [resultadoPJ, setResultadoPJ] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Estados de alerta
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  // Constantes
  const SALARIO_MINIMO = 1518.00;
  const LIMITE_RENDA = 15000.00;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Função para formatar valores monetários
  const formatMoney = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
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
      showAlert(`A Renda Mensal não pode exceder ${formatMoney(LIMITE_RENDA)}`, "error");
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
      showAlert("Por favor, informe seu e-mail para receber os cálculos", "error");
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
    }, 5000);
  };

  // Cálculo de Pessoa Física
  const calcularPF = (renda, custos) => {
    const baseCalculo = renda - custos;
    let imposto = 0;
    let aliquota = 0;
    let parcelaADeduzir = 0;
    let faixa = "";

    // Tabela Progressiva Mensal
    if (baseCalculo <= 2428.80) {
      imposto = 0;
      aliquota = 0;
      parcelaADeduzir = 0;
      faixa = "Até R$ 2.428,80";
    } else if (baseCalculo <= 2826.65) {
      aliquota = 7.5;
      parcelaADeduzir = 182.16;
      imposto = (baseCalculo * 0.075) - parcelaADeduzir;
      faixa = "De R$ 2.428,81 até R$ 2.826,65";
    } else if (baseCalculo <= 3751.05) {
      aliquota = 15;
      parcelaADeduzir = 394.16;
      imposto = (baseCalculo * 0.15) - parcelaADeduzir;
      faixa = "De R$ 2.826,66 até R$ 3.751,05";
    } else if (baseCalculo <= 4664.68) {
      aliquota = 22.5;
      parcelaADeduzir = 675.49;
      imposto = (baseCalculo * 0.225) - parcelaADeduzir;
      faixa = "De R$ 3.751,06 até R$ 4.664,68";
    } else {
      aliquota = 27.5;
      parcelaADeduzir = 908.73;
      imposto = (baseCalculo * 0.275) - parcelaADeduzir;
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
      aliquotaEfetiva
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
    if (proLabore <= 2428.80) {
      irProLabore = 0;
    } else if (proLabore <= 2826.65) {
      irProLabore = (proLabore * 0.075) - 182.16;
    } else if (proLabore <= 3751.05) {
      irProLabore = (proLabore * 0.15) - 394.16;
    } else if (proLabore <= 4664.68) {
      irProLabore = (proLabore * 0.225) - 675.49;
    } else {
      irProLabore = (proLabore * 0.275) - 908.73;
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
      rendaLiquida
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

    // Se solicitado, enviar e-mail
    if (formData.enviarEmail) {
      enviarEmail(pf, pj);
    }
  };

  // Função para enviar e-mail (simulação)
  const enviarEmail = (pf, pj) => {
    // Aqui você implementaria a lógica real de envio de e-mail
    // Por enquanto, apenas mostra um alerta
    console.log("Enviando e-mail para:", formData.emailUsuario);
    console.log("Enviando e-mail para NAF:", formData.emailNAF);
    console.log("Resultados PF:", pf);
    console.log("Resultados PJ:", pj);

    showAlert("E-mail enviado com sucesso! (simulação)", "success");
  };

  // Componente de Tooltip com informações
  const InfoTooltip = ({ title, children }) => (
    <Tooltip
      title={title}
      arrow
      placement="right"
      sx={{
        '& .MuiTooltip-tooltip': {
          fontSize: '0.875rem',
          maxWidth: 350,
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
          padding: 2
        }
      }}
    >
      {children}
    </Tooltip>
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, md: 4 }, minHeight: "70vh" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="600"
        sx={{
          mb: 1,
          color: theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[800]
        }}
      >
        Calculadora de Tributação
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          mb: 4,
          color: theme.palette.mode === "dark" ? colors.grey[400] : colors.grey[600]
        }}
      >
        Para Profissionais de Psicologia - Comparação PF x PJ
      </Typography>

      {/* Alert de feedback */}
      <Collapse in={alertVisible}>
        <Alert
          severity={alertSeverity}
          onClose={() => setAlertVisible(false)}
          sx={{ mb: 3 }}
        >
          {alertMessage}
        </Alert>
      </Collapse>

      {/* Formulário */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : "#ffffff",
          border: "1px solid",
          borderColor: theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[300],
          borderRadius: 2,
          mb: 4
        }}
      >
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            mb: 3,
            color: theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[800]
          }}
        >
          Dados para Cálculo
        </Typography>

        <Grid container spacing={3}>
          {/* Renda Mensal */}
          <Grid item xs={12} md={6}>
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
                step: "0.01"
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <InfoTooltip title="É o valor que você espera receber por mês com o seu trabalho. No caso da psicologia, pode ser o total recebido das consultas, atendimentos ou serviços prestados, antes de descontar as despesas.">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </InfoTooltip>
                  </InputAdornment>
                )
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : "#fafafa",
                  "& fieldset": {
                    borderColor: theme.palette.mode === "dark" ? colors.grey[600] : colors.grey[400]
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.mode === "dark" ? colors.grey[500] : colors.grey[600]
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.mode === "dark" ? "#5b9bd5" : "#2563eb"
                  }
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.mode === "dark" ? colors.grey[400] : colors.grey[600],
                  "&.Mui-focused": {
                    color: theme.palette.mode === "dark" ? "#5b9bd5" : "#2563eb"
                  }
                },
                "& .MuiOutlinedInput-input": {
                  color: theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[800]
                },
                "& .MuiFormHelperText-root": {
                  color: theme.palette.mode === "dark" ? colors.grey[500] : colors.grey[600]
                }
              }}
              helperText={`Limite máximo: ${formatMoney(LIMITE_RENDA)}`}
            />
          </Grid>

          {/* Custos Mensais */}
          <Grid item xs={12} md={6}>
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
                step: "0.01"
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <InfoTooltip title="São os gastos mensais necessários para o seu trabalho acontecer, como aluguel da sala, internet, energia, telefone, material de escritório, entre outros. Essas despesas podem ser usadas para reduzir a base de cálculo do imposto (no caso da pessoa física).">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </InfoTooltip>
                  </InputAdornment>
                )
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: colors.primary[400],
                  "& fieldset": {
                    borderColor: colors.grey[300]
                  },
                  "&:hover fieldset": {
                    borderColor: colors.blueAccent[500]
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.blueAccent[500]
                  }
                },
                "& .MuiInputLabel-root": {
                  color: colors.grey[300],
                  "&.Mui-focused": {
                    color: colors.blueAccent[500]
                  }
                },
                "& .MuiOutlinedInput-input": {
                  color: colors.grey[100]
                }
              }}
            />
          </Grid>

          {/* Profissão */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel
                sx={{
                  color: colors.grey[300],
                  "&.Mui-focused": {
                    color: colors.blueAccent[500]
                  }
                }}
              >
                Profissão
              </InputLabel>
              <Select
                name="profissao"
                value={formData.profissao}
                onChange={handleChange}
                label="Profissão"
                sx={{
                  backgroundColor: colors.primary[400],
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.grey[300]
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.blueAccent[500]
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.blueAccent[500]
                  },
                  "& .MuiSelect-select": {
                    color: colors.grey[100]
                  }
                }}
              >
                <MenuItem value="Psicólogo(a)">Psicólogo</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Checkbox Enviar Email */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="enviarEmail"
                  checked={formData.enviarEmail}
                  onChange={handleChange}
                  sx={{
                    color: colors.grey[300],
                    "&.Mui-checked": {
                      color: colors.blueAccent[500]
                    }
                  }}
                />
              }
              label="Deseja receber os cálculos por e-mail?"
              sx={{ color: colors.grey[100] }}
            />
          </Grid>

          {/* Email do usuário (condicional) */}
          {formData.enviarEmail && (
            <Grid item xs={12} md={6}>
              <TextField
                label="Seu E-mail"
                name="emailUsuario"
                type="email"
                value={formData.emailUsuario}
                onChange={handleChange}
                fullWidth
                required={formData.enviarEmail}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: colors.primary[400],
                    "& fieldset": {
                      borderColor: colors.grey[300]
                    },
                    "&:hover fieldset": {
                      borderColor: colors.blueAccent[500]
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.blueAccent[500]
                    }
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[300],
                    "&.Mui-focused": {
                      color: colors.blueAccent[500]
                    }
                  },
                  "& .MuiOutlinedInput-input": {
                    color: colors.grey[100]
                  }
                }}
              />
            </Grid>
          )}

          {/* Email NAF */}
          <Grid item xs={12} md={formData.enviarEmail ? 6 : 12}>
            <TextField
              label="E-mail para contato NAF"
              name="emailNAF"
              type="email"
              value={formData.emailNAF}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: colors.primary[400],
                  "& fieldset": {
                    borderColor: colors.grey[300]
                  },
                  "&:hover fieldset": {
                    borderColor: colors.blueAccent[500]
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.blueAccent[500]
                  }
                },
                "& .MuiInputLabel-root": {
                  color: colors.grey[300],
                  "&.Mui-focused": {
                    color: colors.blueAccent[500]
                  }
                },
                "& .MuiOutlinedInput-input": {
                  color: colors.grey[100]
                }
              }}
              helperText="E-mail do Núcleo de Apoio Contábil e Fiscal (NAF)"
            />
          </Grid>

          {/* Botão Calcular */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={calcular}
              size="large"
              sx={{
                bgcolor: colors.greenAccent[600],
                color: colors.grey[900],
                fontWeight: "bold",
                py: 1.5,
                "&:hover": {
                  bgcolor: colors.greenAccent[700],
                  transform: "translateY(-2px)",
                  boxShadow: 3
                },
                transition: "all 0.3s ease"
              }}
            >
              Calcular Tributação
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Resultados */}
      {mostrarResultados && resultadoPF && resultadoPJ && (
        <Box>
          <Typography variant="h4" fontWeight="bold" align="center" sx={{ mb: 3 }}>
            Comparação de Resultados
          </Typography>

          {/* Tabs para alternar entre PF e PJ */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{
                "& .MuiTab-root": {
                  color: colors.grey[300],
                  fontWeight: "bold",
                  fontSize: "1rem"
                },
                "& .Mui-selected": {
                  color: colors.blueAccent[500]
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: colors.blueAccent[500]
                }
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
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: colors.blueAccent[400] }}>
                Resultado Pessoa Física (IRPF)
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">Renda Mensal:</Typography>
                  <Typography variant="body1">{formatMoney(resultadoPF.renda)}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">Custos Mensais:</Typography>
                  <Typography variant="body1">{formatMoney(resultadoPF.custos)}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">Base de Cálculo:</Typography>
                  <Typography variant="body1">{formatMoney(resultadoPF.baseCalculo)}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">Faixa de Tributação:</Typography>
                  <Typography variant="body1">{resultadoPF.faixa}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">Alíquota:</Typography>
                  <Typography variant="body1">{resultadoPF.aliquota}%</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">Parcela a Deduzir:</Typography>
                  <Typography variant="body1">{formatMoney(resultadoPF.parcelaADeduzir)}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600" color="error.main">Imposto de Renda (IR):</Typography>
                  <Typography variant="h6" fontWeight="bold" color="error.main">
                    {formatMoney(resultadoPF.imposto)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600" color="success.main">Renda Líquida:</Typography>
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    {formatMoney(resultadoPF.rendaLiquida)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" fontWeight="600">Alíquota Efetiva:</Typography>
                  <Typography variant="body1">{resultadoPF.aliquotaEfetiva.toFixed(2)}%</Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Conteúdo da aba Pessoa Jurídica */}
          {tabValue === 1 && (
            <Paper sx={{ p: 3, backgroundColor: colors.primary[500] }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: colors.greenAccent[400] }}>
                Resultado Pessoa Jurídica (PJ)
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">Renda Mensal:</Typography>
                  <Typography variant="body1">{formatMoney(resultadoPJ.renda)}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">Pró-labore:</Typography>
                  <Typography variant="body1">{formatMoney(resultadoPJ.proLabore)}</Typography>
                  <Typography variant="caption" color={colors.grey[400]}>
                    Maior entre 28% da renda ({formatMoney(resultadoPJ.renda * 0.28)}) ou salário mínimo ({formatMoney(SALARIO_MINIMO)})
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">Simples Nacional (6%):</Typography>
                  <Typography variant="body1">{formatMoney(resultadoPJ.simplesNacional)}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">INSS (11% sobre pró-labore):</Typography>
                  <Typography variant="body1">{formatMoney(resultadoPJ.inss)}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600">IR sobre pró-labore:</Typography>
                  <Typography variant="body1">{formatMoney(resultadoPJ.irProLabore)}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600" color="error.main">Total de Tributos:</Typography>
                  <Typography variant="h6" fontWeight="bold" color="error.main">
                    {formatMoney(resultadoPJ.totalPJ)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" fontWeight="600" color="success.main">Renda Líquida:</Typography>
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    {formatMoney(resultadoPJ.rendaLiquida)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Conteúdo da aba Comparação */}
          {tabValue === 2 && (
            <Paper sx={{ p: 3, backgroundColor: colors.primary[500] }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }} align="center">
                Comparação PF x PJ
              </Typography>

              <Grid container spacing={3}>
                {/* Comparação de Tributos */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, backgroundColor: colors.primary[400], border: `2px solid ${colors.blueAccent[500]}` }}>
                    <Typography variant="h6" fontWeight="bold" align="center" sx={{ mb: 2, color: colors.blueAccent[400] }}>
                      Pessoa Física (PF)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Tributos Totais: <strong style={{ color: colors.redAccent[400] }}>{formatMoney(resultadoPF.imposto)}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Renda Líquida: <strong style={{ color: colors.greenAccent[400] }}>{formatMoney(resultadoPF.rendaLiquida)}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Alíquota Efetiva: <strong>{resultadoPF.aliquotaEfetiva.toFixed(2)}%</strong>
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, backgroundColor: colors.primary[400], border: `2px solid ${colors.greenAccent[500]}` }}>
                    <Typography variant="h6" fontWeight="bold" align="center" sx={{ mb: 2, color: colors.greenAccent[400] }}>
                      Pessoa Jurídica (PJ)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Tributos Totais: <strong style={{ color: colors.redAccent[400] }}>{formatMoney(resultadoPJ.totalPJ)}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Renda Líquida: <strong style={{ color: colors.greenAccent[400] }}>{formatMoney(resultadoPJ.rendaLiquida)}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Alíquota Total: <strong>{((resultadoPJ.totalPJ / resultadoPJ.renda) * 100).toFixed(2)}%</strong>
                    </Typography>
                  </Paper>
                </Grid>

                {/* Recomendação */}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 3,
                      backgroundColor: resultadoPF.rendaLiquida > resultadoPJ.rendaLiquida
                        ? colors.blueAccent[900]
                        : colors.greenAccent[900],
                      border: `3px solid ${resultadoPF.rendaLiquida > resultadoPJ.rendaLiquida
                        ? colors.blueAccent[500]
                        : colors.greenAccent[500]}`
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 2 }}>
                      Recomendação
                    </Typography>
                    <Typography variant="h6" align="center">
                      {resultadoPF.rendaLiquida > resultadoPJ.rendaLiquida
                        ? `Pessoa Física (PF) é mais vantajosa!`
                        : `Pessoa Jurídica (PJ) é mais vantajosa!`}
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                      Economia de: <strong>
                        {formatMoney(Math.abs(resultadoPF.rendaLiquida - resultadoPJ.rendaLiquida))}
                      </strong> por mês
                    </Typography>
                  </Paper>
                </Grid>

                {/* Observações */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, backgroundColor: colors.primary[400] }}>
                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                      Observações Importantes:
                    </Typography>
                    <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
                      <li>Os cálculos são baseados na legislação atual (2025)</li>
                      <li>Pessoa Jurídica terá custos adicionais de contabilidade</li>
                      <li>Consulte um contador para análise personalizada</li>
                      <li>Para dúvidas, entre em contato com o NAF: {formData.emailNAF}</li>
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CalculadoraTributaria;
