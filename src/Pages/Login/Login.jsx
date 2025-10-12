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
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Dados enviados: ", data);
    navigate("/Home");
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        backgroundColor: colors.primary[500]
      }}
    >
      {/* Botão de alternar tema */}
      <IconButton 
        onClick={colorMode.toggleColorMode} 
        sx={{ 
          position: "absolute", 
          top: 16, 
          right: 16, 
          color: colors.grey[100],
          backgroundColor: colors.primary[400],
          '&:hover': {
            backgroundColor: colors.primary[300],
          }
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
          container: true,
          mx: 'auto',
          px: 4,
          py: 8,
          maxWidth: 'md',
          backgroundColor: colors.primary[100],
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            textAlign: 'center', 
            mb: 8,
            color: colors.grey[900],
            fontWeight: 'bold'
          }}
        >
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <EmailInput
            register={register}
            errors={errors}
          />
          <PasswordInput
            register={register}
            errors={errors}
          />
          <ButtonUsage
            type="submit"
          >
            Entrar
          </ButtonUsage>
          <ButtonUsage
            onClick={() => navigate("/Register")}
          >
            Nao possui uma conta?
          </ButtonUsage>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" sx={{ color: colors.grey[600] }}>
              <Link
                onClick={() => navigate("/login/forgot")}
                sx={{ 
                  cursor: "pointer",
                  color: colors.blueAccent[500],
                  '&:hover': {
                    color: colors.blueAccent[600]
                  }
                }}
              >
                Esqueceu a senha?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
