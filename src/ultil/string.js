export const stringLimit = (string) => {
  let length = string.length;
  if (length >= 15) {
    return `${string.slice(0, 15)}...`;
  } else {
    return string;
  }
};

