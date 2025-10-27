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
import { tokens, ColorModeContext } from "../../Tema";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useUserStore from "../../store/useUserStore";
import Footer from "../../Components/Footer";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [showPassword, setShowPassword] = useState(false);
  const [profissao, setProfissao] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (event) => {
    setProfissao(event.target.value);
    setValue("profissao", event.target.value);
  };

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const setUserName = useUserStore((state) => state.setUserName);

  // Observar todos os campos
  const watchedFields = watch();
  
  // Verificar se todos os campos obrigatórios estão preenchidos
  const areAllFieldsFilled = 
    watchedFields.name && 
    watchedFields.profissao && 
    watchedFields.email && 
    watchedFields.password && 
    watchedFields.confirmPassword;

  // Botão habilitado apenas se todos os campos estiverem preenchidos
  const isButtonDisabled = !areAllFieldsFilled;

  const errorName = errors.name ? errors.name.message : "Mensagem de erro";
  const errorProfissao = errors.profissao ? errors.profissao.message : "Mensagem de erro";

  const onSubmit = (data) => {
    // Verificar se as senhas coincidem
    if (data.password !== data.confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem!");
      return; // Não prossegue se as senhas não coincidem
    }

    // Se chegou aqui, as senhas coincidem - limpa o erro
    setConfirmPasswordError("");
    console.log("Dados enviados: ", data);
    setUserName(data.name);
    navigate("/home");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingTop: "100px"
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
          my:"auto",
          px: 4,
          py: 5,
          // width: { xs: '92vw', sm: 480, md: 600 },
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
              size="small"
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
              {...register("name", { required: "Nome é obrigatório" })}
            />
            <Typography
              variant="caption"
              sx={{
                minHeight: "10px",
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

          <Box>
            <FormControl fullWidth size="small">
              <InputLabel
                id="profissao"
                sx={{
                  color: colors.grey[300],
                  '&.Mui-focused': {
                    color: colors.blueAccent[500],
                  },
                }}
              >
                Profissão
              </InputLabel>
              <Select
                labelId="profissao"
                id="profissao"
                label="Profissão"
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.grey[300],
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.blueAccent[500],
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.blueAccent[500],
                  },
                  '& .MuiSelect-select': {
                    color: colors.grey[100],
                    backgroundColor: colors.primary[500],
                  },
                }}
                {...register("profissao", { required: "Profissão é obrigatória" })}
              >
                <MenuItem value="Psicólogo">Psicólogo</MenuItem>
                <MenuItem value="Psicóloga">Psicóloga</MenuItem>
              </Select>
            </FormControl>
            <Typography
              variant="caption"
              sx={{
                minHeight: "10px",
                fontWeight: "bold",
                color: errors.profissao ? colors.redAccent[100] : "transparent",
                visibility: errors.profissao ? "visible" : "hidden",
                marginTop: "1px",
                display: "block",
              }}
            >
              {errorProfissao}
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
              size="small"
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
                  color: "colors.grey[900]",
                },
              }}
              {...register("confirmPassword", {
                required: "Confirmação obrigatória",
              })}
            />
            <Typography
              variant="caption"
              sx={{
                minHeight: "10px",
                fontWeight: "bold",
                color: confirmPasswordError ? colors.redAccent[100] : "transparent",
                visibility: confirmPasswordError ? "visible" : "hidden",
                marginTop: "1px",
                display: "block",
              }}
            >
              {confirmPasswordError}
            </Typography>
          </Box>

          <ButtonUsage
            type="submit"
            disabled={isButtonDisabled}
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
      < Footer />
    </Box>
  );
};

export default Register;