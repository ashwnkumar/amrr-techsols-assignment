import React from "react";
import Button from "./form/Button";

const PageHeader = ({ title, desc, buttons = [] }) => {
  return (
    <div className="flex items-center justify-between w-full border-b border-gray pb-2">
      <div className="flex flex-col items-start justify-center">
        <h3 className="font-medium text-2xl">{title}</h3>
        <p className="text-secondary text-lg">{desc}</p>
      </div>
      {buttons.length > 0 && (
        <div className="flex gap-2">
          {buttons.map((button, index) => (
            <Button key={index} {...button} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
