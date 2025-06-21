import { Download, Trash2 } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";

const FileUpload = ({
  onFileSelect,
  label = "Add an Image",
  id,
  name,
  required,
  existingImage,
  acceptedFiles = ".pdf, .doc, .docx",
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(existingImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null); // Ref to reset file input

  const fileIcons = {
    pdf: "/icons/pdf.png",
    doc: "/icons/doc.png",
    docx: "/icons/doc.png",
    xls: "/icons/xls.png",
    xlsx: "/icons/xls.png",
    jpeg: "/icons/jpg.png",
    jpg: "/icons/jpg.png",
    png: "/icons/png.png",
    svg: "/icons/svg.png",
    gif: "/icons/gif.png",
  };

  const getFileIcon = (file) => {
    if (!file) return "/default.png";
    const ext = file.name.split(".").pop().toLowerCase();
    return fileIcons[ext] || "/default.png";
  };

  const formatFileSize = (size) => {
    if (!size) return "Unknown Size";
    return size < 1024
      ? `${size} B`
      : size < 1048576
      ? `${(size / 1024).toFixed(1)} KB`
      : `${(size / 1048576).toFixed(1)} MB`;
  };

  const { extensions, mimeTypes } = useMemo(() => {
    const extToMime = {
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      svg: "image/svg+xml",
    };

    const extList = acceptedFiles
      .split(",")
      .map((ext) => ext.trim().replace(".", "").toLowerCase());

    return {
      extensions: extList.map((ext) => `.${ext}`),
      mimeTypes: extList.map((ext) => extToMime[ext]).filter(Boolean),
    };
  }, [acceptedFiles]);

  const handleFile = (file) => {
    if (!file) return;

    const fileExt = `.${file.name.split(".").pop().toLowerCase()}`;
    const isValid =
      mimeTypes.includes(file.type) || extensions.includes(fileExt);

    if (isValid) {
      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);
      setSelectedFile(file);
      onFileSelect?.(file);
      toast.success("File uploaded successfully");
    } else {
      setPreview(existingImage || null);
      setSelectedFile(null);
      onFileSelect?.(null);
      toast.error(`Invalid file format. Allowed: ${acceptedFiles}`);
    }
  };

  const handleFileChange = (event) => {
    if (!event.target.files.length) return;
    handleFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    handleFile(event.dataTransfer.files[0]);
  };

  const handleRemoveFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(existingImage || null);
    setSelectedFile(null);
    onFileSelect?.(null);
    toast.success("File removed successfully");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col  items-start w-full text-secondary">
      {label && (
        <label htmlFor={id} className="text-md font-medium">
          {label}{" "}
          {required && (
            <span className="text-danger text-lg font-medium">*</span>
          )}
        </label>
      )}
      <label
        htmlFor={id}
        className={`bg-white flex flex-col items-center justify-center w-full p-10 border-2 ${
          isDragging ? "border-brand bg-brand" : "border-gray"
        } border-dashed rounded-lg cursor-pointer hover:border-brand transition`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-col items-center justify-center ">
            <p className="">
              {selectedFile ? (
                <span>File Uploaded Successfully</span>
              ) : (
                <span>
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </span>
              )}
            </p>
            <p className="text- text-gray-500 mt-1">
              {selectedFile ? null : `  Accepted: ${acceptedFiles}`}
            </p>
          </div>
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
      {selectedFile && (
        <div className="bg-white w-full mt-2 rounded-lg border border-gray py-2 px-4 flex items-center gap-3">
          <div className="flex gap-3 items-center min-w-0 flex-grow">
            <img
              src={getFileIcon(selectedFile)}
              alt={`${selectedFile?.name || "Unknown File"} logo`}
              className="w-8 h-8 flex-shrink-0"
            />
            <span className="flex flex-col min-w-0">
              <span className="text-secondary text-base truncate max-w-[150px] md:max-w-[250px]">
                {selectedFile?.name || "Unnamed File"}
              </span>
              <span className="text-sm text-[#667085]">
                {formatFileSize(selectedFile?.size)}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            {preview ? (
              <a
                href={preview}
                download={selectedFile?.name || "download"}
                className="p-2 rounded-lg hover:bg-hover cursor-pointer text-secondary"
              >
                <Download strokeWidth={1.5} size={22} />
              </a>
            ) : (
              <span className="text-sm text-[#667085]">
                No preview available
              </span>
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
      )}
    </div>
  );
};

export default FileUpload;
