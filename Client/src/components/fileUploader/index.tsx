import { useState, useRef, useCallback, useEffect } from "react";
import { OutputFileEntry } from "@uploadcare/blocks";
import { FileEntry } from "@/types";
import {
  FileUploaderRegular,
  type UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
  fileEntry,
  onChange,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    OutputFileEntry<"success">[]
  >([]);
  const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);

  const handleRemoveClick = useCallback(
    (uuid: OutputFileEntry["uuid"]) =>
      onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
    [fileEntry.files, onChange]
  );

  const handleChangeEvent = (items) => {
    console.log("The uploade event is", items.allEntries);
    setUploadedFiles([
      ...items.allEntries.filter((file) => file.status === "success"),
    ]);
  };

  const resetUploaderState = () =>
    ctxProviderRef.current?.uploadCollection.clearAll();

  const handleModalCloseEvent = () => {
    resetUploaderState();

    onChange({ files: [...uploadedFiles] });

    setUploadedFiles([]);
  };

  console.log("/file entry:", fileEntry.files);

  return (
    <div>
      <FileUploaderRegular
        onChange={handleChangeEvent}
        onModalClose={handleModalCloseEvent}
        imgOnly
        multiple
        removeCopyright
        pubkey="f0c429166137f8545923"
        apiRef={ctxProviderRef}
      />

      <div className="grid grid-cols-2 gap-4 mt-8">
        {fileEntry.files.map((file) => (
          <div key={file.uuid} className="relative">
            <img
              key={file.uuid}
              src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/
              `}
            />

            <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800  rounded-full w-7 h-7">
              <button
                className="text-slate-800 text-center"
                type="button"
                onClick={() => handleRemoveClick(file.uuid)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
