// Loading.js
import React, { useEffect, useState } from 'react';
import '../styles/loading.css';
import LinuxPackagesLoading from './LinuxPackagesLoading'; // Import the LinuxPackagesLoading component

const Loading = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set the loading time as needed

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="debian-loading">            
          {/* Use the LinuxPackagesLoading component here */}
          <LinuxPackagesLoading />
        </div>
      )}
      {!isLoading && children} {/* Display the content once loading is complete */}
    </>
  );
};

export default Loading;
