import * as React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../Tema";


const GoBack = () => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
    return (
        <div>
            <IconButton >
                < CloseIcon sx={{
                    color: colors.grey[100],
                    "&: hover": {
                        color:colors.redAccent[100],
                    }
                }}/>
            </IconButton>
        </div>
    )
}
export default GoBack;