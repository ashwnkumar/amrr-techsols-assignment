import { AlertCircle } from "lucide-react";
import React from "react";

const Textarea = ({
  className = "",
  name,
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  onKeyDown,
  required = false,
  disabled = false,
  rows = 3,
}) => {
  return (
    <div className={`flex flex-col w-full text-secondary ${className}`}>
      {label && (
        <label className="text-md text-heading">
          {label}
          {required && (
            <span className="text-danger text-lg font-medium"> *</span>
          )}
        </label>
      )}

      <div className="relative w-full">
        <textarea
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          rows={rows}
          className={`bg-white mt-2 w-full text-secondary placeholder:text-placeholder border rounded-xl px-2 py-2 transition-colors duration-150 font-normal focus:outline-none focus:border-brand 
            ${error ? "border-danger" : "border-gray"} 
            ${disabled ? "bg-disabled cursor-not-allowed" : ""}`}
        ></textarea>

        {error && (
          <AlertCircle
            strokeWidth={1.5}
            stroke="var(--color-danger)"
            className="absolute right-2 top-3"
          />
        )}
      </div>

      {error && (
        <span className="text-danger text-sm font-medium">{error}</span>
      )}
    </div>
  );
};

export default Textarea;
