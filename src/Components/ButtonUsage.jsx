import { Button, useTheme } from "@mui/material";
import { tokens } from "../Tema";

const ButtonUsage = ({ children, disabled = false, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <Button
            {...props}
            disabled={disabled} 
            variant="contained"
            sx={{
                width: "100%",
                backgroundColor: disabled 
                    ? colors.grey[600] 
                    : colors.redAccent[500],
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
                    backgroundColor: disabled 
                      ? colors.grey[600] 
                      : colors.blueAccent[600],
                    transform: disabled ? "none" : "translateY(-1px)",
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