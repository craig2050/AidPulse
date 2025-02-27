import { useContext } from "react";
import { AppContext } from "./context/AppContext"; // Import the global context
import RealMessageList from "Components/Chat/MessageList";
import logo from "./assets/logo.webp";
import "./App.css";
import Chat from "./Components/Chat/Chat";
import Home from "./Components/Home/Home";
import InteractiveGraphic from "./Components/InteractiveGraphic/InteractiveGraphic";

function App() {
  const context = useContext(AppContext);
  if (!context) throw new Error("App must be used within an AppProvider");

  const { userType, setUserType } = context;

  const renderComponent = () => {
    switch (userType) {
      case "civilian":
        return <RealMessageList />;
      case "volunteer":
        return <div>Volunteer Component</div>;
      case "responder":
        return (
          <>
            <InteractiveGraphic title={"graphic"} buttonUrl={""} />
            <Chat onSelectComponent={setUserType} />
          </>
        );
      default:
        return <Home onSelectComponent={setUserType} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div>{renderComponent()}</div>
    </div>
  );
}

export default App;
