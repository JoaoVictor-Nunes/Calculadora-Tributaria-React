import * as React from "react";
import { useForm } from "react-hook-form";
import EmailInput from "../../Components/Inputs/EmailInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert, Collapse } from "@mui/material";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import ButtonUsage from "../../Components/ButtonUsage";

const Esqueci = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [alertVisible, setAlertVisible] = React.useState(false);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Email para recuperação:", data);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: "block",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "70px",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          px: 9,
          py: 6,
          maxWidth: 400,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3} sx={{fontWeight: "bold"}}>
          Recuperar senha
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailInput register={register} errors={errors} />


          <ButtonUsage fullWidth variant="contained" sx={{ mt: 3 }} type="submit">
            Enviar link
          </ButtonUsage>
        </form>
        <Box className="text-center mt-4">
          <Typography variant="body2" color="textSecondary">
            <Link
              onClick={() => navigate("/login")}
              sx={{ cursor: "pointer" }}
            >
              Lembrou a senha?
            </Link>

          </Typography>
        </Box>
      </Box>

      {alertVisible && (
        <Box
          sx={{
            display: "block",
            justifyContent: "center",
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            mt: 2,
            mb: 2,
          }}
        >
          <Collapse in={alertVisible}>
            <Alert severity="success" onClose={() => setAlertVisible(false)}>
              Link de recuperação enviado!
            </Alert>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

export default Esqueci;
