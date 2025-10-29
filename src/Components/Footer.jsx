import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../Tema";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        p: 2,
        gap: 1,
        borderTop: "1px solid gray",
        mt: "auto", // Importante para funcionar com flexbox
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: colors.grey[100],
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {"© "}
        NAF - Núcleo de Apoio Fiscal da Unichristus {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: colors.grey[100],
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <EmailIcon />
        naf01.dl@unichristus.edu.br
      </Typography>
    </Box>
  );
};
export default Footer;
