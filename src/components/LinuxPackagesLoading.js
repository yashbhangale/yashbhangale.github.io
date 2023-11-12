import React, { useEffect, useState } from 'react';
import '../styles/linux-packages-loading.css';

const LinuxPackagesLoading = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const loadingText = 'Loading Packages...';

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set the loading time as needed

    // Typewriter effect
    let i = 0;
    const typewriterTimer = setInterval(() => {
      setMessage((prevMessage) => prevMessage + loadingText[i]);
      i++;
      if (i === loadingText.length) {
        clearInterval(typewriterTimer);
      }
    }, 100); // Set the typewriter speed as needed

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(typewriterTimer);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="linux-packages-loading">
          <div className="loading-bar">
            <div className="loading-bar-progress"></div>
          </div>
          <div className="loading-message">{message}</div>
        </div>
      )}
      {!isLoading && children} {/* Display the content once loading is complete */}
    </>
  );
};

export default LinuxPackagesLoading;
