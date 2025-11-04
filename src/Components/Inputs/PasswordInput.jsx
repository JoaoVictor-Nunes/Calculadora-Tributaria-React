import { useState } from "react";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { tokens } from "../../Tema";

const PasswordInput = ({ register, errors }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Estado para alternar entre mostrar/ocultar a senha
  const [show, setShow] = useState(false);

  // Mostra mensagem de erro específica ou mensagem padrão invisível para manter layout
  const errorMessage = errors.password
    ? errors.password.message
    : "Mensagem de erro";

  return (
    <div>
      {/* CAMPO DE INPUT DE SENHA */}
      <TextField
        label="Senha"
        variant="outlined"
        size="small"
        type={show ? "text" : "password"} // Alterna entre texto visível e password
        fullWidth
        // BOTÃO TOGGLE DE VISIBILIDADE
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShow(!show)} // Alterna estado de visibilidade
                  edge="end"
                  aria-label={show ? "Ocultar senha" : "Mostrar senha"} // Acessibilidade
                  sx={{ color: colors.grey[300] }}
                >
                  {show ? <VisibilityOff /> : <Visibility />}{" "}
                  {/* Ícone dinâmico */}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        // ESTILIZAÇÃO DO CAMPO DE SENHA
        sx={{
          width: "100%",
          //  ESTILIZAÇÃO DO CONTAINER DO INPUT
          "& .MuiOutlinedInput-root": {
            backgroundColor: colors.primary[500], // Fundo com cor do tema
            "& fieldset": {
              borderColor: colors.grey[300], // Borda padrão cinza
            },
            "&:hover fieldset": {
              borderColor: colors.blueAccent[500], // Borda azul no hover
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.blueAccent[500], // Borda azul quando focado
            },
          },
          // ESTILIZAÇÃO DO LABEL
          "& .MuiInputLabel-root": {
            color: colors.grey[300], // Cor padrão do label
            "&.Mui-focused": {
              color: colors.blueAccent[500], // Cor azul quando focado
            },
          },
          // ESTILIZAÇÃO DO TEXTO DIGITADO
          "& .MuiOutlinedInput-input": {
            color: colors.grey[100], // Cor do texto digitado
          },
        }}
        // REGISTRO NO REACT-HOOK-FORM COM VALIDAÇÕES
        {...register("password", {
          required: "Senha é obrigatória", // Validação de campo obrigatório
          minLength: {
            value: 6, // Comprimento mínimo de 6 caracteres
            message: "Senha deve ter ao menos 6 caracteres", // Mensagem de erro específica
          },
        })}
      />

      {/* MENSAGEM DE ERRO DINÂMICA */}
      <Typography
        variant="caption"
        sx={{
          minHeight: "20px", // Altura mínima para manter espaço mesmo sem erro
          fontWeight: "bold",
          color: errors.password ? colors.redAccent[100] : "transparent", // Vermelho se erro, transparente se não
          visibility: errors.password ? "visible" : "hidden", // Visível apenas quando há erro
          marginTop: "4px", // Espaço acima da mensagem
          display: "block", // Garante que ocupa toda a largura
          fontSize: "12px", // Tamanho de fonte menor para mensagens de erro
        }}
      >
        {errorMessage}
      </Typography>
    </div>
  );
};

export default PasswordInput;
