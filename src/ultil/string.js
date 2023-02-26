export const stringLimit = (string) => {
  let length = string.length;
  if (length >= 15) {
    return `${string.slice(0, 15)}...`;
  } else {
    return string;
  }
};

export const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
