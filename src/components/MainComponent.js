// MainComponent.js
import React from 'react';
import Taskbar from './Taskbar';
import "../styles/maincomponent.css"
const MainComponent = () => {
  return (
    <div className="main-container">
      {/* Your other components go here */}
      <Taskbar />
    </div>
  );
};

export default MainComponent;
