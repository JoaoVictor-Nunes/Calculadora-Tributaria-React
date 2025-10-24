import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import ModalTabelaTributacao from "./ModalTabelaTributacao";
import GoBack from "../GoBack";

const ModalExplicacoes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

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
      <Button
        onClick={handleOpen}
        sx={{
          color: colors.grey[100],
          border: `1px solid ${colors.blueAccent[500]}`,
          backgroundColor: colors.blueAccent[500],
          "&:hover": {
            backgroundColor: colors.blueAccent[600],
            borderColor: colors.blueAccent[600],
          },
          borderRadius: 1,
          px: 2,
          py: 1,
        }}
      >
        Como são feitos os cálculos?
      </Button>
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
              Como são feitos os cálculos?
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

            {/* Resumo dos Cálculos */}
            <Box sx={{ mb: 4 }}>
              <Paper sx={{ p: 3, mb: 3, backgroundColor: colors.primary[500] }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: colors.greenAccent[400] }}
                >
                  📊 Resumo dos Cálculos
                </Typography>

                {/* Pessoa Física */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: colors.blueAccent[300] }}
                  >
                    PESSOA FÍSICA (PF)
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Box component="li">
                      <Typography>
                        <Box component="span" fontWeight="bold">
                          Base de Cálculo:
                        </Box>{" "}
                        Renda Mensal - Custos Mensais
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 0.5,
                        }}
                      >
                        <Box component="span" fontWeight="bold">
                          Consulta na
                        </Box>
                        <ModalTabelaTributacao />
                        <Box component="span">
                          para identificar a faixa correspondente
                        </Box>
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography>
                        <Box component="span" fontWeight="bold">
                          Fórmula:
                        </Box>{" "}
                        (Base de Cálculo × Alíquota) - Parcela a Deduzir
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Pessoa Jurídica */}
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: colors.blueAccent[300] }}
                  >
                    PESSOA JURÍDICA (PJ)
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <Box component="li">
                      <Typography>
                        <Box component="span" fontWeight="bold">
                          Pró-labore:
                        </Box>{" "}
                        MAIOR valor entre (28% da Renda) e (Salário Mínimo)
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography>
                        <Box component="span" fontWeight="bold">
                          Simples Nacional:
                        </Box>{" "}
                        6% sobre a Renda Mensal total
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography>
                        <Box component="span" fontWeight="bold">
                          INSS:
                        </Box>{" "}
                        11% sobre o valor do pró-labore
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography>
                        <Box component="span" fontWeight="bold">
                          IR sobre pró-labore:
                        </Box>{" "}
                        Aplica tabela da PF (se houver tributação)
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography>
                        <Box component="span" fontWeight="bold">
                          Total PJ:
                        </Box>{" "}
                        Simples Nacional + INSS + IR (se aplicável)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>

            <Box
              id="descricao"
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            >
              <Typography variant="body1" sx={{ color: colors.grey[100] }}>
                Para mais informações, acesse a página de{" "}
                <Link
                  onClick={() => navigate("/detalhes")}
                  sx={{
                    cursor: "pointer",
                    color: colors.blueAccent[500],
                    "&:hover": { color: colors.blueAccent[600] },
                    textDecoration: "underline",
                  }}
                >
                  Detalhes
                </Link>{" "}
                ou{" "}
                <Link
                  onClick={() => navigate("/contatos")}
                  sx={{
                    cursor: "pointer",
                    color: colors.blueAccent[500],
                    "&:hover": { color: colors.blueAccent[600] },
                    textDecoration: "underline",
                  }}
                >
                  entre em contato conosco
                </Link>
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalExplicacoes;
