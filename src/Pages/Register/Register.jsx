import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EmailInput from "../../Components/Inputs/EmailInput";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import TextField from "@mui/material/TextField";
import ButtonUsage from "../../Components/ButtonUsage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";
import "./RegisterStyles.css";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

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
          Registrar
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome"
            variant="outlined"
            sx={{ 
              width: '100%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors.primary[100],
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
                color: colors.grey[600],
                '&.Mui-focused': {
                  color: colors.blueAccent[500],
                },
              },
              '& .MuiOutlinedInput-input': {
                color: colors.grey[900],
              },
            }}
            {...register("name", { required: "Nome é obrigatório" })}
          />
          {errors.name && (
            <p style={{ color: colors.redAccent[500], marginTop: '4px', fontSize: '0.875rem' }}>
              {errors.name.message}
            </p>
          )}

        <EmailInput
          register={register}
          errors={errors}
        />

        <PasswordInput
          register={register}
          errors={errors}
        />

          <TextField
            label="Confirme a Senha"
            variant="outlined"
            type="password"
            sx={{ 
              width: '100%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors.primary[100],
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
                color: colors.grey[600],
                '&.Mui-focused': {
                  color: colors.blueAccent[500],
                },
              },
              '& .MuiOutlinedInput-input': {
                color: colors.grey[900],
              },
            }}
            {...register("confirmPassword", {
              required: "Confirmação obrigatória",
              validate: (value) =>
                value === password || "As senhas não coincidem!"
            })}
          />
          {errors.confirmPassword && (
            <p style={{ color: colors.redAccent[500], marginTop: '4px', fontSize: '0.875rem' }}>
              {errors.confirmPassword.message}
            </p>
          )}

          <ButtonUsage
            type="submit"
          >
            Registrar
          </ButtonUsage>

          <ButtonUsage
            onClick={() => navigate("/")}
          >
            Já possui uma conta?
          </ButtonUsage>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
