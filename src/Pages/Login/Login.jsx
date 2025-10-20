import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import EmailInput from "../../Components/Inputs/EmailInput";
import ButtonUsage from "../../Components/ButtonUsage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { tokens, ColorModeContext } from "../../Tema";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { IconButton, Checkbox, FormControlLabel } from "@mui/material";
import Footer from "../../Components/Footer";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Dados enviados: ", data);
    navigate("/Home");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
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
          color: "#fff",
          backgroundColor: colors.primary[400],
          "&:hover": {
            backgroundColor: colors.primary[300],
          },
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
          px: 4,
          py: 7,
          backgroundColor: colors.primary[500],
          borderRadius: 2,
          borderColor: "#878787",
          borderWidth: 1,
          boxShadow: 3,
          width: { xs: '92vw', sm: 480, md: 600 },
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
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <FormControlLabel
              label="Lembrar de mim?"
              control={
                <Checkbox
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: colors.grey[300],
                    '&.Mui-checked': {
                      color: colors.blueAccent[500],
                    },
                  }}
                />
              }
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: colors.grey[100],
                },
              }}
            />

            <Box sx={{ textAlign: { xs: 'center', sm: 'right' }, width: { xs: '100%', sm: 'auto' } }}>
              <Typography variant="body2" sx={{ color: colors.grey[600] }}>
                <Link
                  onClick={() => navigate('/login/forgot')}
                  sx={{
                    cursor: 'pointer',
                    color: colors.blueAccent[500],
                    '&:hover': {
                      color: colors.blueAccent[600],
                    },
                    textDecoration: 'underline',
                  }}
                >
                  Esqueceu a senha?
                </Link>
              </Typography>
            </Box>
          </Box>
          <ButtonUsage type="submit">Entrar</ButtonUsage>
          <Box sx={{ 
            display: "flex",
            justifyContent: "center",
            mt: 2,
            gap: 1 
            }}>
            <Typography variant="body2" sx={{ color: colors.grey[100] }}>
              Não possui uma conta?
            </Typography>
            <Typography variant="body2" sx={{ color: colors.grey[600] }}>
              <Link
                onClick={() => navigate("/Register")}
                sx={{
                  cursor: "pointer",
                  color: colors.blueAccent[500],
                  "&:hover": {
                    color: colors.blueAccent[600],
                  },
                  textDecoration: "underline",
                }}
              >
                Registre-se
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Login;
