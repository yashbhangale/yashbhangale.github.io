// DesktopIcons.js
import React from 'react';
import '../styles/desktopicon.css';

const DesktopIcons = () => {
  return (
    <div className="desktop-icons">
<div className="desktop-icon">
  <a href="https://github.com/yashbhangale" target="_blank" rel="noopener noreferrer">
    <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" width={50} draggable="false" alt="Icon 1" />
  </a>
      <br/>
      <br/>
</div>

      <div className="desktop-icon">
  <a href="https://in.linkedin.com/in/yashbhangale" target="_blank" rel="noopener noreferrer">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" draggable="false" width={50} alt="Icon 2" />
  </a>
      <br/>
      <br/>
</div>

<div className="desktop-icon">
  <a href="https://leetcode.com/bhangale/" target="_blank" rel="noopener noreferrer">
    <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" draggable="false" width={50} alt="Icon 2" />
  </a>
<br/>
</div>

<div className="desktop-icon">
  <a href="googlegmail://co?to=yashbhangale9@gmail.com" target="_blank" rel="noopener noreferrer">
    <img src="https://static.vecteezy.com/system/resources/previews/020/964/377/original/gmail-mail-icon-for-web-design-free-png.png" width={50} draggable="false" alt="Icon 2" />
  </a>
<br/>
</div>


<div className="desktop-icon">
  <a href="https://x.com/ttrubleshooter" target="_blank" rel="noopener noreferrer">
    <img src="https://www.freepnglogos.com/x-logo-twitter-transparent-logo-download-3.png" width={50} draggable="false" alt="Icon 2" />
  </a>
</div>

      {/* Add more icons as needed */}
    </div>
  );
};

export default DesktopIcons;
