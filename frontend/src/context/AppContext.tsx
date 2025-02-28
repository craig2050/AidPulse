import { createContext, useState, useEffect, ReactNode } from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import victimData from "../victimdata.json";
import responderData from "../responderData.json";
export interface AppContextType {
  userType: string;
  hasGraphic: boolean;
  setHasGraphic: (hasGraphic: boolean) => void;
  setUserType: (component: string) => void;
  theme: Theme;
  userIdentifier: string;
  configureNewUserSetup: () => void;
  currentQuestion: number;
  setCurrentQuestion: (question: number) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<string>(
    localStorage.getItem("userType") || ""
  );
  const [hasGraphic, setHasGraphic] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [userIdentifier, setUderIdentifier] = useState(
    localStorage.getItem("userIdentifier") || ""
  );

  const configureNewUserSetup = () => {
    console.log("Configuring new user setup...");
    const identifier = uuidv4();
    localStorage.setItem("userIdentifier", identifier);

    if(userType === "victim") localStorage.setItem("questionData", JSON.stringify(victimData));
    if(userType === "responder") localStorage.setItem("questionData", JSON.stringify(responderData));
    
    setUderIdentifier(identifier);
  };

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
    <AppContext.Provider
      value={{
        userType,
        setUserType,
        theme,
        hasGraphic,
        setHasGraphic,
        userIdentifier,
        configureNewUserSetup,
        currentQuestion,
        setCurrentQuestion
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};
