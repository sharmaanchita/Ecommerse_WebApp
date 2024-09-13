import React from "react";
import flipkart from "../../../Images/flipkart.jpg";
import amazon from "../../../Images/amazon.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>SHOP OUR PRODUCTS</h4>
        <img src={flipkart} alt="flipkart" />
        <img src={amazon} alt="amazon" />
      </div>

      <div className="midFooter">
        <h1>SHOPISY</h1>
        <h4>Everything for Everyone</h4>

        <p>Copyrights 2024 &copy; AnchitaSharma</p>
      </div>

      <div className="rightFooter">
        <h4>More from Founder</h4>
        <a href="https://www.linkedin.com/in/anchita-sharmaa/">LinkedIn</a>
        <a href="https://github.com/sharmaanchita">GitHub</a>
        <a href="https://www.anchitasharma.in/">Website</a>
      </div>
    </footer>
  );
};

export default Footer;