import React, { useState } from 'react';

const InteractiveGraphic = ({ title, buttonUrl }) => {
  const [showImage, setShowImage] = useState(false);

  const handleButtonClick = () => {
    setShowImage(true);
  };

  return (
    <div className="InteractiveGraphic">
      <h2>{title}</h2>
      <button className="interactive-button" onClick={handleButtonClick}>
        Show Interactive Graphic
      </button>
      {showImage && (
        <div className="interactive-image">
          <img src={buttonUrl} alt="Interactive Graphic" />
        </div>
      )}
    </div>
  );
};

export default InteractiveGraphic;