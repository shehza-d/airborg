// import { cleanText } from "./textCleaning.js";

const isValid = (str: string, length = 250, type = "string") => {
  if (!str || str?.length > length || typeof str !== type) {
    return false;
  }
  return true;
};

export { isValid };
