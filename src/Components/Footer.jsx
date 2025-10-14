import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
        <Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ width: "100%", p: 2, mt: 4, borderTop: '1px solid gray' }}>
                {'© '}
                NAF - Núcleo de Apoio Fiscal da Unichristus {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    )
}
export default Footer;