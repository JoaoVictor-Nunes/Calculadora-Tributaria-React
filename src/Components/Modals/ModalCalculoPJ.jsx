import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import CalculoPJ from "../../Pages/CalculoPJ"
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  
const ModalCalculoPJ = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} sx={{color: "#111827", border: "1px solid #111827"}}>Calcular Tributação de Pessoa Jurídica</Button>
            <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 1000,
            },
          }}
        >
            <Fade in={open}>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" color="inherit">
                  Calcular Tributação de Pessoa Jurídica
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                  <CalculoPJ />
                </Typography>
              </Box>
            </Fade>
            </Modal>
        </div>
    )
}
export default ModalCalculoPJ;