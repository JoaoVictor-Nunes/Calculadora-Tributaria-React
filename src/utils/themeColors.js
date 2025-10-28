// Cores centralizadas para todo o aplicativo
export const appColors = {
  light: {
    // Inputs e campos de formulário
    input: {
      background: "#f9fafb",
      border: "#d1d5db",
      borderHover: "#9ca3af",
      borderFocus: "#3b82f6",
      text: "#111827",
      label: "#6b7280",
      labelFocus: "#3b82f6",
      helper: "#6b7280"
    },
    // Botões
    button: {
      primary: {
        background: "#3b82f6",
        backgroundHover: "#2563eb",
        text: "#ffffff"
      },
      secondary: {
        background: "#10b981",
        backgroundHover: "#059669",
        text: "#ffffff"
      },
      danger: {
        background: "#ef4444",
        backgroundHover: "#dc2626",
        text: "#ffffff"
      }
    },
    // Papers e containers
    paper: {
      background: "#ffffff",
      border: "#e5e7eb"
    },
    // Textos
    text: {
      primary: "#111827",
      secondary: "#6b7280",
      disabled: "#9ca3af"
    },
    // Tabs
    tabs: {
      text: "#6b7280",
      textActive: "#3b82f6",
      indicator: "#3b82f6"
    }
  },
  dark: {
    // Inputs e campos de formulário
    input: {
      background: "#1f2937",
      border: "#4b5563",
      borderHover: "#6b7280",
      borderFocus: "#60a5fa",
      text: "#f3f4f6",
      label: "#9ca3af",
      labelFocus: "#60a5fa",
      helper: "#9ca3af"
    },
    // Botões
    button: {
      primary: {
        background: "#3b82f6",
        backgroundHover: "#2563eb",
        text: "#ffffff"
      },
      secondary: {
        background: "#10b981",
        backgroundHover: "#059669",
        text: "#ffffff"
      },
      danger: {
        background: "#ef4444",
        backgroundHover: "#dc2626",
        text: "#ffffff"
      }
    },
    // Papers e containers
    paper: {
      background: "#1f2937",
      border: "#374151"
    },
    // Textos
    text: {
      primary: "#f3f4f6",
      secondary: "#9ca3af",
      disabled: "#6b7280"
    },
    // Tabs
    tabs: {
      text: "#9ca3af",
      textActive: "#60a5fa",
      indicator: "#60a5fa"
    }
  }
};

// Função helper para obter as cores baseado no modo do tema
export const getAppColors = (theme) => {
  return theme.palette.mode === "dark" ? appColors.dark : appColors.light;
};
