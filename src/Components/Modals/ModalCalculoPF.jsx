import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography, Backdrop, useTheme, Grow, Link } from "@mui/material"
import CalculoPF from "../../Pages/Cálculos/CalculoPF";
import { tokens } from "../../Tema";
import GoBack from "../GoBack";
import PersonIcon from '@mui/icons-material/Person';

const ModalCalculoPJ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [transformOrigin, setTransformOrigin] = useState('center center');


    const handleOpen = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const origin = `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
        setTransformOrigin(origin);
        setOpen(true);
    };

    const navigate = useNavigate();

    const handleClose = () => setOpen(false);

    const style = {
        width: { xs: "90vw", md: 800 },
        bgcolor: colors.primary[500],
        border: `2px solid ${colors.blueAccent[500]}`,
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: "80vh",
        maxWidth: "90vw",
        overflowY: "auto",
        zIndex: 1300,
        position: "relative",
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                size="large"
                startIcon={<PersonIcon />}
                sx={{
                    color: colors.grey[900],
                    backgroundColor: colors.redAccent[500],
                    fontSize: "1.1rem",
                    px: 2,
                    py: 1,
                    // width: "300px",
                    // height: "80px",
                    // Transições para o efeito hover
                    transition: "all 0.3s ease-in-out",
                    transitionDelay: "30ms",
                    // Estilo normal
                    transform: "translateY(0) scale(1)",
                    // Efeito hover
                    '&:hover': {
                        backgroundColor: colors.redAccent[600],
                        transform: "translateY(-4px) scale(1.02)",
                        boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.3)`,
                    },
                }}
            >
                Pessoa Física (PF)
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 300,
                        sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                    },
                }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Grow
                    in={open}
                    timeout={400}
                    style={{ transformOrigin }}
                >
                    <Box sx={style}>
                        <Typography
                            id="tituloModalPJ"
                            variant="h5"
                            component="h2"
                            sx={{
                                color: colors.grey[100],
                                fontWeight: 600,
                                mb: 2
                            }}
                        >
                            Calcular Tributação de Pessoa Física
                        </Typography>
                        <Button
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                ml: 1,
                                bgcolor: "transparent",
                                "&:hover svg": {
                                    color: colors.redAccent[400],
                                },
                            }}
                        >
                            <GoBack />
                        </Button>
                        <CalculoPF />
                    </Box>
                </Grow>
            </Modal>
        </div>
    )
}

export default ModalCalculoPJ;