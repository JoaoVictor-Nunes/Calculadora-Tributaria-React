import { useState } from "react";
import { Backdrop, Box, Fade, Typography, Modal, Button, Link, useTheme } from "@mui/material";
import { tokens } from "../../Tema";
import GoBack from "../GoBack";

const ModalRendaMensal = () => {
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
        O que é renda mensal?
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
              <Typography variant="h3">
                "São os gastos mensais necessários para o seu trabalho
                acontecer, como aluguel da sala, internet, energia, telefone,
                material de escritório, entre outros. Essas despesas podem ser
                usadas para reduzir a base de cálculo do imposto (no caso da
                pessoa física)."
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default ModalRendaMensal;
