import React from "react"
import { Link } from "gatsby"

const checkScreenWidthMobile = () => {
  if (typeof window !== `undefined`) {
    return window.screen.width < 1024 ? true : false
  }
}



const Footer = () => {
  return (
    <footer
      style={{ display: "flex", flexDirection: "column", margin: "auto" }}
    >
      <div style={{ margin: "auto" }}>
        
        <Link to="/">Home</Link> {" | "}
        
        <a
          href="https://www.linkedin.com/in/yashbhangale/"
          target="_blank"
          rel="noopener noreferrer"
        >
          contact
        </a>
        {" | "}
        <a
          href="https://www.linkedin.com/in/yashbhangale/"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>
        {" | "}
        <a
          href="https://www.github.com/yashbhangale"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </div>

      <span
        style={{
          margin: "auto",
          fontSize: "xx-small",
          textAlign: "center",
          paddingBottom: "150px",
        }}
        >
        ©2024 Yash Bhangale 
      </span>

    </footer>
  )
}

export default Footer
