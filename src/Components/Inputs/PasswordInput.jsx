import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({ register, errors }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [show, setShow] = useState(false);

  const errorMessage = errors.password ? errors.password.message : "Mensagem de erro";

  return (
    <div>
      <TextField
        label="Senha"
        variant="outlined"
        size="small"
        type={show ? "text" : "password"}
        fullWidth
        slotProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShow(!show)} edge="end">
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: "100%",
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.primary[500],
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
        {...register("password", {
          required: "Senha é obrigatória",
          minLength: { value: 6, message: "Senha deve ter ao menos 6 caracteres" },
        })}
      />
      <Typography
        variant="caption"
        sx={{
          minHeight: "20px",
          fontWeight: "bold",
          color: errors.password ? colors.redAccent[100] : "transparent",
          visibility: errors.password ? "visible" : "hidden",
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

export default PasswordInput;