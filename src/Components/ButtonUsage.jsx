import { Button } from "@mui/material";
import React from "react";

const ButtonUsage = ({ children, ...props }) => {
    return (

        <Button
            {...props}
            sx={{
                width: "100%",
                backgroundColor: "#fff",
                color: "black",
                paddingTop: "0.375rem",
                paddingBottom: "0.375rem",
                marginTop: "0.5rem",
                borderRadius: "8px",
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                    backgroundColor: "#000",
                },
            }}
        >
            {children}
        </Button>
    )
}
export default ButtonUsage;