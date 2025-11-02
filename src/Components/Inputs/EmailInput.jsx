import { TextField, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";

const EmailInput = ({ register, errors }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Mostra mensagem de erro específica ou mensagem padrão invisível para manter layout
  const errorMessage = errors.email ? errors.email.message : "Mensagem de erro";

  return (
    <div>
      {/* INPUT EMAIL */}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          width: "100%",
          // ESTILIZAÇÃO DO CONTAINER DO INPUT
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.grey[300], // Borda padrão cinza
            },
            '&:hover fieldset': {
              borderColor: colors.blueAccent[500], // Borda azul no hover
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.blueAccent[500], // Borda azul quando focado
            },
          },
          //  ESTILIZAÇÃO DO LABEL
          '& .MuiInputLabel-root': {
            color: colors.grey[300], // Cor padrão do label
            '&.Mui-focused': {
              color: colors.blueAccent[500], // Cor azul quando focado
            },
          },
          // ESTILIZAÇÃO DO TEXTO DIGITADO
          '& .MuiOutlinedInput-input': {
            color: colors.grey[100], // Cor do texto digitado
          },
        }}
        // REGISTRO NO REACT-HOOK-FORM COM VALIDAÇÕES
        {...register("email", {
          required: "Email é obrigatório!", // Validação de campo obrigatório
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Regex para validar formato de email
            message: "Formato de email inválido.", // Mensagem de erro para formato inválido
          },
        })}
      />
      
      {/* MENSAGEM DE ERRO DINÂMICA */}
      <Typography
        variant="caption"
        sx={{
          minHeight: "20px", // Altura mínima para manter espaço mesmo sem erro
          fontWeight: "bold",
          color: errors.email ? colors.redAccent[100] : "transparent", // Vermelho se erro, transparente se não
          visibility: errors.email ? "visible" : "hidden", // Visível apenas quando há erro
          marginTop: "4px", // Espaço acima da mensagem
          display: "block", // Garante que ocupa toda a largura
          fontSize: "12px" // Tamanho de fonte menor para mensagens de erro
        }}
      >
        {errorMessage}
      </Typography>
    </div>
  );
};

export default EmailInput;