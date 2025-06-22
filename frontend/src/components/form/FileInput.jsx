import { Download, Trash2 } from "lucide-react";
import { useState, useRef, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

const FileUpload = ({
  onFileSelect,
  label = "Add an Image",
  id,
  name,
  required,
  value,
  acceptedFiles = ".pdf, .doc, .docx",
  error,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const extensions = useMemo(() => {
    return acceptedFiles.split(",").map((ext) => ext.trim());
  }, [acceptedFiles]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = `.${file.name.split(".").pop()}`;
    if (!extensions.includes(fileExt)) {
      toast.error("Invalid file type");
      return;
    }

    onFileSelect?.(file);
  };

  const handleRemoveFile = () => {
    onFileSelect?.(null);
    fileInputRef.current.value = "";
  };

  // Effect to update preview when `value` changes
  useEffect(() => {
    if (value && value.type?.startsWith("image/")) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [value]);

  return (
    <div className="flex flex-col items-start w-full text-secondary">
      {label && (
        <label htmlFor={id} className="text-md font-medium">
          {label}
          {required && (
            <span className="text-danger text-lg font-medium">*</span>
          )}
        </label>
      )}

      {value ? (
        <div className="bg-white flex flex-col items-center justify-center w-full p-5 border border-gray rounded-lg">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-48 rounded-lg pointer-events-none"
            />
          )}
          <div className="flex items-center justify-between w-full mt-3">
            <p className="truncate">{value.name || "Unnamed File"}</p>
            <div className="flex items-center">
              {previewUrl && (
                <a
                  href={previewUrl}
                  download={value.name || "download"}
                  className="p-2 rounded-lg hover:bg-hover cursor-pointer text-secondary"
                >
                  <Download strokeWidth={1.5} size={22} />
                </a>
              )}
              <button
                className="p-2 rounded-lg hover:bg-hover cursor-pointer text-secondary"
                type="button"
                onClick={handleRemoveFile}
              >
                <Trash2 strokeWidth={1.5} size={22} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={` ${
            error
              ? "border-danger"
              : "border-gray hover:border-brand transition"
          } bg-white flex flex-col items-center justify-center w-full p-10 border-2  border-dashed rounded-lg cursor-pointer `}
        >
          <div className="flex flex-col items-center justify-center">
            <p>
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-gray-500 mt-1">Accepted: {acceptedFiles}</p>
          </div>
          <input
            ref={fileInputRef}
            id={id}
            type="file"
            name={name}
            className="hidden"
            accept={extensions.join(",")}
            onChange={handleFileChange}
          />
        </label>
      )}
      {error && <span className="text-danger text-sm ">{error}</span>}
    </div>
  );
};

export default FileUpload;
