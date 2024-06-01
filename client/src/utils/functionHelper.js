import { allowedFileTypes } from "../constants/fileTypes";

export const handleDragEnter = (e, setDragging) => {
  e.preventDefault();
  e.stopPropagation();
  setDragging(true);
};

export const handleDragLeave = (e, setDragging) => {
  e.preventDefault();
  e.stopPropagation();
  setDragging(false);
};

export const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export const handleDrop = (e, setDragging, setErrorMessage, setFiles) => {
  e.preventDefault();
  e.stopPropagation();

  const droppedFiles = [...e.dataTransfer.files];

  const types = allowedFileTypes;
  const validTypes = [];
  const invalidFileExtensions = new Set();

  droppedFiles.forEach((file) => {
    if (types.includes(file.type)) {
      validTypes.push(file);
    } else {
      invalidFileExtensions.add(file.name.split(".").pop());
    }
  });

  if (invalidFileExtensions.size > 0) {
    const invalidFileTypes = Array.from(invalidFileExtensions).join(", ");
    setErrorMessage(
      `Some files you choose are not valid. like ${invalidFileTypes} are not allowed`
    );
  } else {
    setErrorMessage("");
  }

  setFiles((prevFiles) => [...prevFiles, ...validTypes]);
  setDragging(false);
};

export const handleFiles = (e, setFiles, setErrorMessage) => {
  const types = allowedFileTypes;

  const selectedFiles = [...e.target.files];
  const validTypes = [];
  const invalidFileExtensions = new Set();

  selectedFiles.forEach((file) => {
    if (types.includes(file.type)) {
      validTypes.push(file);
    } else {
      invalidFileExtensions.add(file.name.split(".").pop());
    }
  });

  if (invalidFileExtensions.size > 0) {
    const invalidFileTypes = Array.from(invalidFileExtensions).join(", ");
    setErrorMessage(
      `Some files you choose are not valid. like ${invalidFileTypes} are not allowed`
    );
  } else {
    setErrorMessage("");
  }
  setFiles((prevFiles) => [...prevFiles, ...validTypes]);
};
