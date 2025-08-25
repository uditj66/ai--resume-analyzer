import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";
interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}
/*
Notes:-
 Named typed/interface also called as external typing.
 1.Here, we create a separate type (FileUploaderProps) first.
 2.Then we reuse it when declaring the component.
 3.This is more organized and reusable.

✅ Good when props are bigger, used in multiple places, or when you want code to look cleaner.
*/
const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  // Drag and drop functionality
  const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const next = acceptedFiles[0] || null;
      setFile(next);
      onFileSelect?.(next);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 25 * 1024 * 1024,
    });
  const maxFileSize = 25 * 1024 * 1024;
  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={"/images/pdf.png"} alt="pdf" className="size-10" />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm text-gray-700 font-medium truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-700 font-medium truncate">
                    {file.type}
                  </p>

                  <p className="text-sm  text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  onFileSelect?.(null);
                }}
              >
                <img
                  src={"/icons/cross.svg"}
                  alt="remove"
                  className="w-4 h-4"
                />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500 ">
                <span className="font-semibold"> click to upload</span>
              </p>
              or drag and drop
              <p className="text-lg text-gray-500">
                PDF (max file size{formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
