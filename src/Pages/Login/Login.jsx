import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTheme, Link, Box, Typography, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import EmailInput from "../../Components/Inputs/EmailInput";
import ButtonUsage from "../../Components/ButtonUsage";
import { tokens, ColorModeContext } from "../../Tema";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Footer from "../../Components/Footer";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const watchedFields = watch();

  const areAllFieldsFilled =
    watchedFields.email &&
    watchedFields.password;

  const isButtonDisabled = !areAllFieldsFilled;


  const onSubmit = (data) => {
    console.log("Dados enviados: ", data);
    navigate("/home");
  };

  return (
    // Box para armazenar o conteúdo da página
    <Box

    // estilização da página
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        paddingTop: "100px",
      }}
    >
      {/* Botão de alternar tema */}
      <IconButton
        onClick={colorMode.toggleColorMode} // quando clicar, muda de tema escuro para claro
        // Estilização para manter o botão na parte superior direita
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          ml: 1,
          color: colors.grey[100],
        }}
      >
        {theme.palette.mode === "dark" ? ( 
          <LightModeOutlinedIcon /> // se o tema for "escuro" aparece o sol
        ) : (
          <DarkModeOutlinedIcon /> // se o tema for "claro" aparece a lua
        )}
      </IconButton>

      {/*Box para armazenar o form*/}
      <Box
        sx={{
          mx: "auto", // centraliza a box horizontalmente
          my: "auto", // centraliza a box verticalmente
          px: 4, // padding na horizontal de 4
          py: 7, // padding na vertical de 7
          backgroundColor: colors.primary[500], // deixa o background da box com a mesma cor da página
          borderRadius: 2, // arredonda a borda da box
          borderColor: "#878787", // borda cinza
          borderWidth: 1, // coloca a grossura da borda
          boxShadow: 3, // adiciona uma sombra na box 
          // width: { xs: "92vw", sm: 480, md: 600 }, // altera o tamanho horizontal da box
        }}
      >
        {/*Cria o título de login do form*/}
        <Typography
          variant="h1" // tamanho da fonte (h1)
          // estilização da escrita
          sx={{
            textAlign: "center", // alinha o texto horizontalmente
            mb: 8, // margem inferior de 8
            color: colors.grey[100], // cor fica branca no modo escuro e preta no modo claro
            fontWeight: "bold", // fonte negrito
          }}
        >
          Login
        </Typography>

        {/*Formulário em si*/}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 2 
          }}
        >
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <FormControlLabel
              label="Lembrar de mim?"
              control={
                <Checkbox
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    color: colors.grey[300],
                    "&.Mui-checked": {
                      color: colors.blueAccent[500],
                    },
                  }}
                />
              }
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: colors.grey[100],
                },
              }}
            />

            <Box
              sx={{
                textAlign: { xs: "center", sm: "right" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Typography variant="body2" sx={{ color: colors.grey[600] }}>
                <Link
                  onClick={() => navigate("/login/forgot")}
                  sx={{
                    cursor: "pointer",
                    color: colors.blueAccent[500],
                    "&:hover": {
                      color: colors.blueAccent[600],
                    },
                    textDecoration: "underline",
                  }}
                >
                  Esqueceu a senha?
                </Link>
              </Typography>
            </Box>
          </Box>
          <ButtonUsage
            type="submit"
            disabled={isButtonDisabled}
          >
            Entrar
          </ButtonUsage>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              gap: 1,
            }}
          >
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
      <Footer />
    </Box>
  );
};

export default Login;
