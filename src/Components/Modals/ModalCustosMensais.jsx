import { useState } from "react";
import { Backdrop, Box, Fade, Typography, Modal, Button, Link, useTheme } from "@mui/material";
import { tokens } from "../../Tema";
import GoBack from "../GoBack";

const ModalCustosMensais = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90vw", md: 800 },
    bgcolor: colors.primary[500],
    border: `2px solid ${colors.blueAccent[500]}`,
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "80vh",
    maxWidth: "90vw",
    overflowY: "auto",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Link
        onClick={handleOpen}
        sx={{
          color: colors.blueAccent[500],
          "&:hover": { color: colors.blueAccent[600] },
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        O que são Custos Mensais?
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1000,
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                color: colors.grey[100],
                fontWeight: 600,
                mb: 3,
                textAlign: "center",
              }}
            >
              Renda Mensal
            </Typography>
            <Button
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                ml: 1,
                bgcolor: "transparent",
                // quando passar o mouse, colore qualquer SVG dentro do Button (ícone do GoBack)
                "&:hover svg": {
                  color: colors.redAccent[400],
                },
              }}
            >
              <GoBack />
            </Button>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
              >
                "É o valor que você espera receber por mês com o seu trabalho.
                No caso da psicologia, pode ser o total recebido das consultas,
                atendimentos ou serviços prestados, antes de descontar as
                despesas."
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default ModalCustosMensais;