import React, { useState } from 'react';

const DesktopIcon = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFolderClick = (folderName) => {
    // Handle folder click, you can navigate to a page or perform other actions
    console.log(`Opening folder: ${folderName}`);
  };

  return (
    <div>
      <div className="desktop-icon" onClick={handleIconClick}>
        {/* Your desktop icon content */}
        <span role="img" aria-label="Folder Icon">
          📁
        </span>
        Desktop Icon
      </div>
      {isMenuOpen && (
        <div className="folder-menu">
          {/* Subfolders with links to projects */}
          <div onClick={() => handleFolderClick('Project1')}>Project 1</div>
          <div onClick={() => handleFolderClick('Project2')}>Project 2</div>
          <div onClick={() => handleFolderClick('Project3')}>Project 3</div>
          {/* Add more folders as needed */}
        </div>
      )}
    </div>
  );
};

export default DesktopIcon;
