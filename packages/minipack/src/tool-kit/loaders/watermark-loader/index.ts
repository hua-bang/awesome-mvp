import { Loader } from "../../../typings";

export const watermarkLoader: Loader = (content, filePath) => {
  return `
    ${content}

    // This is a watermark loader Generated by Minipack.
    // Log Time: ${new Date().toLocaleString()}
  `;
};
