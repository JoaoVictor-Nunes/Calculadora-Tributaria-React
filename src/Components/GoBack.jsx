import { IconButton, useTheme } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from "../Tema";


const GoBack = () => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
    return (
        <div>

                < CloseIcon sx={{
                    color: colors.grey[100],
                    "&: hover": {
                        color:colors.redAccent[100],
                    }
                }}/>
        </div>
    )
}
export default GoBack;