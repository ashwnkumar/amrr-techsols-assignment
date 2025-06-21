import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const buttons = [
    {
      label: "Btn 1",
    },
    {
      label: "Btn 2",
    },
    {
      label: "Btn 3",
    },
  ];
  return (
    <div className="sticky top-0 w-full  flex flex-row items-center justify-around p-2">
      <div className="">
        <Link to="/">Logo</Link>
      </div>
      <div className="flex flex-row items-center justify-evenly gap-40">
        {buttons.map((button, index) => (
          <NavLink key={index} className={({ isActive }) => ""}>
            {button.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
