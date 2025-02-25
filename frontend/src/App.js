import React, { useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Chat from './Components/Chat/Chat';
import InteractiveGraphic from './Components/InteractiveGraphic/InteractiveGraphic';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('Home');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Chat':
        return <Chat onSelectComponent={setSelectedComponent} />;
      case 'Citizens':
        return <div>Citizens Component</div>;
      case 'Responders':
        return (
          <>
            <InteractiveGraphic />
            <Chat onSelectComponent={setSelectedComponent} />
          </>
        );
      case 'Helpers':
        return (
          <>
            <InteractiveGraphic />
            <Chat onSelectComponent={setSelectedComponent} />
          </>
        );
      default:
        return <Home onSelectComponent={setSelectedComponent} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderComponent()}
      </header>
    </div>
  );
}

export default App;
