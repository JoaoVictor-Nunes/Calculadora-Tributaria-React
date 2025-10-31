import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Alert, Collapse, Link, useTheme, IconButton } from "@mui/material";
import { tokens, ColorModeContext } from "../../Tema";
import ButtonUsage from "../../Components/ButtonUsage";
import EmailInput from "../../Components/Inputs/EmailInput";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Footer from "../../Components/Footer";

const Esqueci = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);


  const { register, handleSubmit, formState: { errors } } = useForm();
  const [alertVisible, setAlertVisible] = React.useState(false);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Email para recuperação:", data);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        paddingTop: "100px"
      }}
    >
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
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
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
          // width: { xs: "92vw", sm: 480, md: 600 }, // altera o tamanho horizontal da box

        }}
      >
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

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <EmailInput register={register} errors={errors} />

          <ButtonUsage type="submit" sx={{ mt: 3 }}>
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
