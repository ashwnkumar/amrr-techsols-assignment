import React from "react";

const Footer = () => {
  return (
    <div className="border border-t-gray flex flex-row items-center justify-center ">
      <p>© {new Date().getFullYear()} All rights reserved. </p>
    </div>
  );
};

export default Footer;
