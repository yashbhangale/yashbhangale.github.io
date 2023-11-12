// StartMenu.js
import React from 'react';

const StartMenu = () => {
  return (
    <div className="start-menu">
      <div className="start-menu-header">
        <h3>Welcome to Start Menu</h3>
      </div>
      <div className="start-menu-content">
        <button onClick={() => console.log('Settings clicked')}>Settings</button>
        <button onClick={() => console.log('Explorer clicked')}>Explorer</button>
        <button onClick={() => console.log('Internet clicked')}>Internet</button>
      </div>
    </div>
  );
};

export default StartMenu;
