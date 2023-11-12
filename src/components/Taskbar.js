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
      <button
  onClick={handleStartButtonClick}
  style={{
    backgroundColor: 'cyan', // Green background color
    color:'black', // White text color
    padding: '8px 12px', // Padding
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Cursor on hover
    fontSize: '16px', // Font size
    borderColor: 'blue',
  }}
>
  Start
</button>

      <div className="date-time">
        {currentTime}  / {formattedDate} 
      </div>
      
      {startMenuVisible && <StartMenu />}
    </div>
  );
};

export default Taskbar;

