import React from "react";
import Input from "./Input";
import Button from "./Button";
import FileUpload from "./FileInput";
import Textarea from "./Textarea";
import Dropdown from "./Dropdown";

const DynamicForm = ({
  options = [],
  submitText = "Submit",
  onSubmit,
  title,
  formDirection = "column",
  className,
}) => {
  const flexDir = formDirection === "row" ? "flex-row" : "flex-col";
  const renderFormItem = (item, index) => {
    switch (item.formType) {
      case "input":
        return (
          <Input
            key={index}
            label={item.label}
            name={item.name}
            required={item.required}
            type={item.type}
            placeholder={item.placeholder || item.label}
            value={item.value}
            onChange={item.onChange}
            onKeyDown={item.onKeyDown}
            disabled={item.disabled}
            helper={item.helper}
            error={item.error}
          />
        );
      case "file":
        return (
          <FileUpload
            key={index}
            label={item.label}
            name={item.name}
            id={item.id}
            value={item.value}
            required={item.required}
            onFileSelect={item.onChange}
            existingImage={item.existingImage}
            acceptedFiles={item.acceptedFiles}
            helper={item.helper}
            error={item.error}
          />
        );
      case "textarea":
        return (
          <Textarea
            key={index}
            label={item.label}
            name={item.name}
            required={item.required}
            placeholder={item.placeholder || item.label}
            value={item.value}
            onChange={item.onChange}
            error={item.error}
          />
        );
      case "dropdown":
        return (
          <Dropdown
            key={index}
            label={item.label}
            name={item.name}
            options={item.options}
            placeholder={item.placeholder || `Click to select ${item.label}`}
            value={item.value}
            onChange={item.onChange}
            required={item.required}
            helper={item.helper}
            valueKey={item.valueKey}
            optionKey={item.optionKey}
            error={item.error}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-start justify-center text-secondary`}
    >
      {title && (
        <h4 className="text-lg font-medium mt-2 text-heading">{title}</h4>
      )}
      <form
        className={`w-full flex flex-col  gap-4 text-start divide-y divide-gray ${className}`}
        onSubmit={(e) => e.preventDefault()}
      >
        {options.map((section, idx) => (
          <div
            key={idx}
            className={`flex flex-row items-start justify-between gap-2 rounded-lg`}
          >
            <h5 className="text-lg w-1/3 font-semibold text-heading">
              {section.title}
            </h5>

            {section.columns ? (
              // Multi-column layout
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                {section.columns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-2 ">
                    {col.title && (
                      <h6 className="text-sm font-medium mb-1">{col.title}</h6>
                    )}
                    {col.fields.map(renderFormItem)}
                  </div>
                ))}
              </div>
            ) : (
              // Single-column layout
              <div className="flex flex-col gap-2 w-1/2 pb-2">
                {section.fields?.map(renderFormItem)}
              </div>
            )}
          </div>
        ))}
        {onSubmit && (
          <Button
            onClick={onSubmit}
            // disabled={!allFilled}
            type="button"
            className="w-full mt-2"
          >
            {submitText}
          </Button>
        )}
      </form>
    </div>
  );
};

export default DynamicForm;
