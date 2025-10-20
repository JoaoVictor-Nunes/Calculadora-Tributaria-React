import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EmailInput from "../../Components/Inputs/EmailInput";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import TextField from "@mui/material/TextField";
import ButtonUsage from "../../Components/ButtonUsage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import "./RegisterStyles.css";
import { tokens, ColorModeContext } from "../../Tema";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Footer from "../../Components/Footer";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "@mui/material";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [showPassword, setShowPassword] = useState(false);


  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const errorName = errors.name ? errors.name.message : "Mensagem de erro";
  const errorConfirmPassword = errors.confirmPassword ? errors.confirmPassword.message : "Mensagem de erro";


  const onSubmit = (data) => {
    console.log("Dados enviados: ", data);
    navigate("/Home");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Botão de alternar tema */}
      <IconButton
        onClick={colorMode.toggleColorMode}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "#fff",
          ml: 1,
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
          mx: "auto",
          px: 4,
          py: 5,
          // make the form wider on larger screens so inputs appear bigger (matches Login)
          width: { xs: '92vw', sm: 480, md: 600 },
          backgroundColor: colors.primary[500],
          borderRadius: 2,
          borderColor: "#878787",
          borderWidth: 1,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            mb: 5,
            color: colors.grey[100],
            fontWeight: "bold",
          }}
        >
          Registrar
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <TextField
              label="Nome"
              variant="outlined"
              sx={{
                width: "100%",
                '& .MuiOutlinedInput-root': {
                  backgroundColor: "##F0F8EA",
                  '& fieldset': {
                    borderColor: colors.grey[300],
                  },
                  '&:hover fieldset': {
                    borderColor: colors.blueAccent[500],
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.blueAccent[500],
                  },
                },
                '& .MuiInputLabel-root': {
                  color: colors.grey[300],
                  '&.Mui-focused': {
                    color: colors.blueAccent[500],
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: "colors.grey[900]",
                },
              }}
              {...register("name", { required: "Nome é obrigatório" })}
            />
            <Typography
              variant="caption"
              sx={{
                minHeight: "20px",
                fontWeight: "bold",
                color: errors.name ? colors.redAccent[100] : "transparent",
                visibility: errors.name ? "visible" : "hidden",
                marginTop: "1px",
                display: "block",
              }}
            >
              {errorName}

            </Typography>
          </Box>

          <EmailInput
            register={register}
            errors={errors}
          />

          <PasswordInput
            register={register}
            errors={errors}
          />
          <Box>

            <TextField
              label="Confirme a Senha"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                '& .MuiOutlinedInput-root': {
                  backgroundColor: "##F0F8EA",
                  '& fieldset': {
                    borderColor: colors.grey[300],
                  },
                  '&:hover fieldset': {
                    borderColor: colors.blueAccent[500],
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.blueAccent[500],
                  },
                },
                '& .MuiInputLabel-root': {
                  color: colors.grey[300],
                  '&.Mui-focused': {
                    color: colors.blueAccent[500],
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: "colors.grey[900]",
                },
              }}
              {...register("confirmPassword", {
                required: "Confirmação obrigatória",
                validate: (value) =>
                  value === password || "As senhas não coincidem!"
              })}
            />
            <Typography
              variant="caption"
              sx={{
                minHeight: "10px",
                fontWeight: "bold",
                color: errors.confirmPassword ? colors.redAccent[100] : "transparent",
                visibility: errors.confirmPassword ? "visible" : "hidden",
                marginTop: "1px",
                display: "block",
              }}
            >
              {errorConfirmPassword}
            </Typography>
          </Box>

          <ButtonUsage
            type="submit"
          >
            Registrar
          </ButtonUsage>

          <Box sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            gap: 1
          }}
          >
            <Typography variant="body2" sx={{ color: colors.grey[100] }}>
              Já possui uma conta?
            </Typography>
            <Typography variant="body2" sx={{ color: colors.grey[600] }}>
              <Link
                onClick={() => navigate("/login")}
                sx={{
                  cursor: "pointer",
                  color: colors.blueAccent[500],
                  "&:hover": {
                    color: colors.blueAccent[600],
                  },
                  textDecoration: "underline",
                }}
              >
                Faça Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <Footer /> */}

    </Box>
  );
};

export default Register;
