import { getAppColors } from './themeColors';

// Estilos padronizados para inputs do formulário
export const getInputStyles = (theme) => {
  const c = getAppColors(theme);
  return {
    "& .MuiOutlinedInput-root": {
      backgroundColor: c.input.background,
      "& fieldset": {
        borderColor: c.input.border
      },
      "&:hover fieldset": {
        borderColor: c.input.borderHover
      },
      "&.Mui-focused fieldset": {
        borderColor: c.input.borderFocus
      }
    },
    "& .MuiInputLabel-root": {
      color: c.input.label,
      "&.Mui-focused": {
        color: c.input.labelFocus
      }
    },
    "& .MuiOutlinedInput-input": {
      color: c.input.text
    },
    "& .MuiFormHelperText-root": {
      color: c.input.helper
    }
  };
};

export const getSelectStyles = (theme) => {
  const c = getAppColors(theme);
  return {
    backgroundColor: c.input.background,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: c.input.border
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: c.input.borderHover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: c.input.borderFocus
    },
    "& .MuiSelect-select": {
      color: c.input.text
    }
  };
};

export const getPaperStyles = (theme) => {
  const c = getAppColors(theme);
  return {
    backgroundColor: c.paper.background,
    border: "1px solid",
    borderColor: c.paper.border,
    borderRadius: 2
  };
};

export const getButtonStyles = (theme, variant = "primary") => {
  const c = getAppColors(theme);
  const btnColors = c.button[variant] || c.button.primary;

  return {
    bgcolor: btnColors.background,
    color: btnColors.text,
    fontWeight: "600",
    py: 1.5,
    "&:hover": {
      bgcolor: btnColors.backgroundHover,
      transform: "translateY(-1px)",
      boxShadow: 2
    },
    transition: "all 0.2s ease"
  };
};

export const getTabsStyles = (theme) => {
  const c = getAppColors(theme);
  return {
    "& .MuiTab-root": {
      color: c.tabs.text,
      fontWeight: "600",
      fontSize: "0.95rem",
      textTransform: "none"
    },
    "& .Mui-selected": {
      color: c.tabs.textActive
    },
    "& .MuiTabs-indicator": {
      backgroundColor: c.tabs.indicator,
      height: 3
    }
  };
};
