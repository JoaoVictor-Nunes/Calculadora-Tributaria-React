import React from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";
import Typography from "@mui/material/Typography";

const EmailInput = ({ register, errors }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Mensagem padrão invisível para manter o espaço
  const errorMessage = errors.email ? errors.email.message : "Mensagem de erro";

  return (
    <div>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          width: "100%",
          '& .MuiOutlinedInput-root': {
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
            color: colors.grey[100],
          },
        }}
        {...register("email", {
          required: "Email é obrigatório!",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Formato de email inválido.",
          },
        })}
      />
      <Typography
        variant="caption"
        sx={{
          minHeight: "20px",
          fontWeight: "bold",
          color: errors.email ? colors.redAccent[100] : "transparent",
          visibility: errors.email ? "visible" : "hidden",
          marginTop: "4px",
          display: "block",
          fontSize: "12px"
        }}
      >
        {errorMessage}
      </Typography>
    </div>
  );
};
export default EmailInput;
