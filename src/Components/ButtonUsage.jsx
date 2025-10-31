import { Button, useTheme } from "@mui/material";
import { tokens } from "../Tema";

const ButtonUsage = ({ children, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Button
            {...props}
            sx={{
                width: "100%",
                backgroundColor: colors.redAccent[500],
                color: colors.grey[900],
                paddingTop: "0.375rem",
                paddingBottom: "0.375rem",
                marginTop: "0.5rem",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                    backgroundColor: colors.redAccent[600],
                    color: colors.grey[900],
                    transform: "translateY(-1px)",
                    boxShadow: `0 4px 8px ${colors.blueAccent[500]}40`,
                },
                "&:active": {
                    transform: "translateY(0)",
                },
            }}
        >
            {children}
        </Button>
    )
}
export default ButtonUsage;