import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Alert, Collapse, Link, useTheme, IconButton } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import ButtonUsage from "../../Components/ButtonUsage";
import EmailInput from "../../Components/Inputs/EmailInput";
import Footer from "../../Components/Footer";
import { tokens, ColorModeContext } from "../../Tema";

const Esqueci = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // Configuração do formulário com react-hook-form
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  
  // Estado para controlar visibilidade do alerta de sucesso
  const [alertVisible, setAlertVisible] = useState(false);

  const navigate = useNavigate();

  // Watch dos campos para validação do botão
  const watchedFields = watch();

  // Verifica se o campo obrigatório está preenchido
  const areAllFieldsFilled = watchedFields.email
  const isButtonDisabled = !areAllFieldsFilled;

  // Handler de submit do formulário
  const onSubmit = (data) => {
    console.log("Link enviado para:", data);
    setAlertVisible(true);
    // Auto-esconde o alerta após 2 segundos
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  return (
    <Box
      // ESTILIZAÇÃO DA PÁGINA
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        paddingTop: "100px"
      }}
    >
      {/* Botão de alternar tema */}
      <IconButton
        onClick={colorMode.toggleColorMode}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          ml: 1,
          color: colors.grey[100],
        }}
      >
        {theme.palette.mode === "dark" ? (
          <LightModeOutlined />
        ) : (
          <DarkModeOutlined />
        )}
      </IconButton>
      
      {/* Container do formulário */}
      <Box
        sx={{
          mx: "auto",
          my: "auto",
          px: 4,
          py: 7,
          backgroundColor: colors.primary[500],
          borderRadius: 2,
          borderColor: "#878787",
          borderWidth: 1,
          boxShadow: 3,
        }}
      >
        {/* TÍTULO DA PÁGINA */}
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            mb: 8,
            color: colors.grey[100],
            fontWeight: "bold",
          }}
        >
          Recuperar senha
        </Typography>

        {/* FORMULÁRIO DE RECUPERAÇÃO */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <EmailInput register={register} errors={errors} />

          <ButtonUsage type="submit" disabled={isButtonDisabled} sx={{ mt: 3 }}>
            Enviar link
          </ButtonUsage>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: colors.grey[600] }}>
            <Link
              onClick={() => navigate("/login")}
              sx={{
                cursor: "pointer",
                color: colors.blueAccent[500],
                '&:hover': {
                  color: colors.blueAccent[600]
                }
              }}
            >
              Lembrou a senha?
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "block",
          justifyContent: "center",
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          mt: 2,
          mb: 2,
        }}
      >
        <Collapse in={alertVisible}>
          <Alert
            severity="success"
            onClose={() => setAlertVisible(false)}
            sx={{
              backgroundColor: colors.greenAccent[100],
              color: colors.greenAccent[900],
              '& .MuiAlert-icon': {
                color: colors.greenAccent[500],
              },
            }}
          >
            Link de recuperação enviado!
          </Alert>
        </Collapse>
      </Box>


      <Footer />

    </Box>
  );
};

export default Esqueci;
