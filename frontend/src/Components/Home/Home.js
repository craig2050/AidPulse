import React from 'react';

function Home({ onSelectComponent }) {
  return (
    <div className="Home">
      <button className="home-button" onClick={() => onSelectComponent('Chat')}>Victim</button>
      <button className="home-button" onClick={() => onSelectComponent('Citizens')}>Citizens</button>
      <button className="home-button" onClick={() => onSelectComponent('Responders')}>Responders</button>
      <button className="home-button" onClick={() => onSelectComponent('Helpers')}>Helpers</button>
    </div>
  );
}

export default Home;