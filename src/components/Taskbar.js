// Taskbar.js
import React, { useState } from 'react';
import StartMenu from './StartMenu';

const Taskbar = () => {
  const [startMenuVisible, setStartMenuVisible] = useState(false);

  const handleStartButtonClick = () => {
    setStartMenuVisible(!startMenuVisible);
  };

  // Get current date and time
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  const formattedDate = currentDate.toLocaleDateString();

  return (
    <div className="taskbar">
      <button onClick={handleStartButtonClick}>Start</button>
      <div className="date-time">
        {currentTime}  / {formattedDate} 
      </div>
      
      {startMenuVisible && <StartMenu />}
    </div>
  );
};

export default Taskbar;

