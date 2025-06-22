import React, { useState, useRef, useEffect } from "react";
// import SearchInput from "./SearchInput";
import { Check, ChevronDown } from "lucide-react";

const Dropdown = ({
  className = "",
  outerClassName = "",
  name,
  id,
  label,
  placeholder = "Select an option",
  options = [],
  value,
  onChange,
  required = false,
  disabled = false,
  showSelected = true,
  helper,
  canSearch = false,
  optionKey = "option",
  optionValue = "value",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (option) => {
    if (!disabled) {
      onChange(option);
      setIsOpen(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const search = e.target.value.toLowerCase();

    const filteredData = options.filter((opt) => {
      return opt.option.toLowerCase().includes(search);
    });

    setFilteredOptions(filteredData);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <div
      className={`relative w-full text-secondary whitespace-nowrap ${outerClassName}`}
      ref={dropdownRef}
    >
      {label && (
        <label className="text-md  text-heading">
          {label}
          {required && (
            <span className="text-danger text-lg font-medium">*</span>
          )}
        </label>
      )}

      <button
        type="button"
        id={id}
        name={name}
        className={`w-full border rounded-xl  px-2 py-2 mt-2 bg-white transition-colors duration-150 font-normal flex justify-between items-center focus:border-brand focus:outline-none focus:ring-0 
          ${disabled ? "bg-disabled cursor-not-allowed" : "cursor-pointer"} 
          ${error ? "border-danger" : "border-gray"}
          ${isOpen && "border-brand"} ${className}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={selectedOption ? "" : "text-placeholder"}>
          {showSelected && selectedOption ? selectedOption.option : placeholder}
        </span>
        <span
          className={`transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full min-w-[200px]  bg-white border divide-y divide-gray border-gray rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
          {canSearch && (
            <div className="p-2">
              <SearchInput value={searchTerm} onChange={handleSearch} />
            </div>
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <button
                key={opt.value}
                className={`px-3 py-2 cursor-pointer transition-colors duration-150 w-full flex items-center justify-between  focus:outline-brand focus:ring-0
                  ${
                    value === opt.value
                      ? "bg-brand-faded text-brand font-medium"
                      : " hover:bg-hover font-normal"
                  }`}
                onClick={() => handleSelect(opt)}
              >
                <div className="flex flex-row items-center justify-center gap-2">
                  {opt.icon && <span>{opt.icon}</span>}
                  {opt.option}
                </div>
                {value === opt.value && (
                  <span className="text-brand">
                    <Check />
                  </span>
                )}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-placeholder">
              No options available
            </div>
          )}
        </div>
      )}
      {helper && <span className="text-sm text-placeholder ">{helper}</span>}
      {error && <span className="text-danger text-sm ">{error}</span>}
    </div>
  );
};

export default Dropdown;
