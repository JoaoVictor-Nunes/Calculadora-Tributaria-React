import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import CalculoPJ from "../../Pages/CalculoPJ"
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";
import GoBack from "../GoBack"

const ModalCalculoPJ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // make the modal responsive: full width on small screens, constrained on larger screens
        width: { xs: '90vw', md: 800 },
        bgcolor: colors.primary[500],
        border: `2px solid ${colors.blueAccent[500]}`,
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: '80vh',
        maxWidth: '90vw',
        overflowY: 'auto',
    }

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
                    '&:hover': {
                        backgroundColor: colors.blueAccent[600],
                        borderColor: colors.blueAccent[600],
                    },
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                }}
            >
                Calcular Tributação de Pessoa Jurídica
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
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="tituloModalPJ"
                            variant="h6"
                            component="h2"
                            sx={{
                                color: colors.grey[100],
                                fontWeight: 600,
                                mb: 2
                            }}
                        >
                            Calcular Tributação de Pessoa Jurídica
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
                        <Typography id="conteudoModalPJ" sx={{ mt: 2 }}>
                            <CalculoPJ />
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
export default ModalCalculoPJ;