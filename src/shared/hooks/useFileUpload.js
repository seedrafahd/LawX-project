import { useRef } from "react";

export const useFileUpload = (setFile) => {
  const fileInputRef = useRef(null);

  const chooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const nextFile = event.target.files?.[0];

    if (!nextFile) return;

    setFile(nextFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const nextFile = event.dataTransfer.files?.[0];

    if (!nextFile) return;

    setFile(nextFile);
  };

  return {
    fileInputRef,
    chooseFile,
    handleFileChange,
    handleDrop,
  };
};
