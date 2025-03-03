"use client";

import { Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { WelcomeScreen } from "./app-components/WelcomeScreen/WelcomeScreen";
import MessageList from "./app-components/Chat/MessageList";
import ResponderMessageList from "./app-components/Chat/ResponderMessageList";

export default function App() {
  const context = useContext(AppContext);
  if (!context) throw new Error("App must be used within an AppProvider");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null

  const { userType } = context;

  const renderComponent = () => {
    switch (userType) {
      case "victim":
        return <MessageList />;
      case "volunteer":
        return <ResponderMessageList />;
      case "responder":
        return <ResponderMessageList />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="App">
      <Paper elevation={0}>
        <div>{renderComponent()}</div>
      </Paper>
    </div>
  );
}
