import { Tooltip, IconButton, useTheme } from "@mui/material";
import Info from "@mui/icons-material/Info";
import { tokens } from "../Tema";

const CustosTooltip = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Tooltip
      title="É o valor que você espera receber por mês com o seu trabalho.
                No caso da psicologia, pode ser o total recebido das consultas,
                atendimentos ou serviços prestados, antes de descontar as
                despesas."
      arrow
      placement="right"
      sx={{
        "& .MuiTooltip-tooltip": {
          fontSize: "0.875rem",
          maxWidth: 350,
          backgroundColor: colors.primary[400],
          color: colors.grey[100],
          padding: 2,
        },
      }}
    >
      <IconButton size="small">
        <Info fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default CustosTooltip;
