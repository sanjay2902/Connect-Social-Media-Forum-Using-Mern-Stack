import { createTheme } from "@mui/material";

const getDesignTokens = (mode) => ({
  palette: {
    mode, // Dynamically set to "light" or "dark"
    primary: {
      main: "#3f51b5",
      light: "#6573c3",
      dark: "#2c387e",
    },
    secondary: {
      main: "#ff4081",
      light: "#ff79b0",
      dark: "#c60055",
    },
    ...(mode === "light"
      ? {
          background: {
            default: "#f5f7fa", // Light background
            paper: "#ffffff",
          },
          text: {
            primary: "#2d2d2d",
            secondary: "#666666",
          },
        }
      : {
          background: {
            default: "#121212", // Dark background
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
            secondary: "#bbbbbb",
          },
        }),
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h2: {
      fontWeight: 700,
      fontSize: "2.2rem",
      color: mode === "light" ? "#3f51b5" : "#6573c3",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.3rem",
      color: mode === "light" ? "#333333" : "#ffffff",
    },
    body1: {
      fontSize: "1.05rem",
      lineHeight: 1.7,
      color: mode === "light" ? "#444444" : "#dddddd",
    },
    button: {
      fontWeight: 600,
      textTransform: "capitalize",
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "elevation",
      },
      styleOverrides: {
        root: {
          padding: 16,
          borderRadius: 12,
          boxShadow: mode === "light"
            ? "0px 6px 18px rgba(0, 0, 0, 0.1)"
            : "0px 6px 18px rgba(0, 0, 0, 0.5)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: mode === "light"
              ? "0px 8px 20px rgba(0, 0, 0, 0.15)"
              : "0px 8px 20px rgba(0, 0, 0, 0.7)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: "10px 20px",
          background:
            mode === "light"
              ? "linear-gradient(135deg, #3f51b5, #6573c3)"
              : "linear-gradient(135deg, #6573c3, #3f51b5)",
          color: "#ffffff",
          boxShadow:
            mode === "light"
              ? "0px 4px 10px rgba(0, 0, 0, 0.15)"
              : "0px 4px 10px rgba(0, 0, 0, 0.5)",
          transition: "all 0.3s ease",
          "&:hover": {
            background:
              mode === "light"
                ? "linear-gradient(135deg, #6573c3, #3f51b5)"
                : "linear-gradient(135deg, #3f51b5, #6573c3)",
            boxShadow:
              mode === "light"
                ? "0px 6px 12px rgba(0, 0, 0, 0.2)"
                : "0px 6px 12px rgba(0, 0, 0, 0.7)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#3f51b5" : "#2c387e",
          color: "#ffffff",
          boxShadow:
            mode === "light"
              ? "0px 3px 10px rgba(0, 0, 0, 0.1)"
              : "0px 3px 10px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});

export const theme = (mode) => createTheme(getDesignTokens(mode));
