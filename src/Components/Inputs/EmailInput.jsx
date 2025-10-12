import React from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";

const EmailInput = ({ register, errors }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <TextField
        label="Email"
        variant="outlined"
        sx={{ 
          width: "100%",
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
        {...register("email", {
          required: "Email é obrigatório",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Formato de email inválido",
          },
        })}
      />
      {errors.email && (
        <p style={{ color: colors.redAccent[500], marginTop: '4px', fontSize: '0.875rem' }}>
          {errors.email.message}
        </p>
      )}
    </div>
  );
};
export default EmailInput;
