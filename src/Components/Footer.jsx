import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
        <Box component="footer" sx={{ 
            width: "100%", 
            p: 2, 
            borderTop: '1px solid gray',
            mt: 'auto' // Importante para funcionar com flexbox
        }}>
            <Typography variant="body2" color="text.secondary" align="center">
                {'© '}
                NAF - Núcleo de Apoio Fiscal da Unichristus {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    )
}
export default Footer;