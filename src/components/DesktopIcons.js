// DesktopIcons.js
import React from 'react';
import '../styles/Desktopicons.css';

const DesktopIcons = () => {
  return (
    <div className="desktop-icons">
      <div className="desktop-icon">
        <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" width={50} alt="Icon 1" />
      </div>
      <br/>
      <div className="desktop-icon">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" width={50} alt="Icon 2" />
      </div>
      <br/>
      <div className="desktop-icon">
        <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" width={50} alt="Icon 2" />
      </div>
      <br/>
      <div className="desktop-icon">
        <img src="https://static.vecteezy.com/system/resources/previews/020/964/377/original/gmail-mail-icon-for-web-design-free-png.png" width={50} alt="Icon 2" />
      </div>
      <br/>
      <div className="desktop-icon">
        <img src="https://www.freepnglogos.com/x-logo-twitter-transparent-logo-download-3.png" width={50} alt="Icon 2" />
      </div>
      {/* Add more icons as needed */}
    </div>
  );
};

export default DesktopIcons;
