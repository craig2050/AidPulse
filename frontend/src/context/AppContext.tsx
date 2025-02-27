import { createContext, useState, useEffect, ReactNode } from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
export interface AppContextType {
  userType: string;
  setUserType: (component: string) => void;
  theme: Theme;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<string>(
    localStorage.getItem("userType") || ""
  );

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  const getTheme = () => {
    let primaryColor = "#1976d2"; // Volunteer
    if (userType === "responder") primaryColor = "#d32f2f";
    if (userType === "civilian") primaryColor = "#388e3c";

    return createTheme({
      palette: {
        mode: "dark",
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
