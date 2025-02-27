import { createContext, useState, useEffect, ReactNode } from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Define the shape of the context
interface AppContextType {
  userType: string;
  setUserType: (component: string) => void;
  theme: Theme;
}

// Create Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Load selectedComponent from localStorage or default to empty string
  const [userType, setUserType] = useState<string>(
    localStorage.getItem("userType") || ""
  );

  // Save selection to localStorage
  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  // Dynamically update the primary theme color
  const getTheme = () => {
    let primaryColor = "#1976d2"; // Default Blue (Volunteer)
    if (userType === "responder") primaryColor = "#d32f2f"; // Red (Error)
    if (userType === "civilian") primaryColor = "#388e3c"; // Green

    return createTheme({
      palette: {
        primary: {
          main: primaryColor,
        },
      },
    });
  };

  const theme = getTheme();

  return (
    <AppContext.Provider value={{ userType, setUserType, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};
