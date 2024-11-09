export const createFileUrl = (file: File): string => {
  return URL.createObjectURL(file);
};