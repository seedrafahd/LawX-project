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

export const getFileName = (file) => {
  if (file.name) return file.name;

  if (!file.file_url) return "مستند";

  const fileName = file.file_url.split("/").pop();

  return decodeURIComponent(fileName || "مستند");
};

export const normalizeFile = (file) => {
  return {
    name: getFileName(file),
    type: file.type?.toUpperCase() || "FILE",
    size:
      file.size ||
      file.file_size ||
      file.fileSize ||
      "غير متوفر",

    date: file.uploaded_AT || file.uploaded_at || "-",

    url: file.file_url.replace(
      "http://localhost",
      "http://127.0.0.1:8000"
    ),
  };
};