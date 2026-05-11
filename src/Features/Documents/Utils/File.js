export const formatFileSize = (bytes) => {
  if (!bytes) return "0 MB";

  const mb = bytes / 1024 / 1024;

  return `${mb.toFixed(1)} MB`;
};

export const getFileExtension = (fileName = "") => {
  return fileName.split(".").pop()?.toUpperCase() || "FILE";
};

export const getFileMetadata = (file) => {
  if (!file) return null;

  return {
    size: formatFileSize(file.size),
    type: getFileExtension(file.name),
  };
};
