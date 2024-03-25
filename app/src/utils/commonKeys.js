export const commonKeys = (obj1, obj2) =>
  Object.keys(obj1).filter((key) => obj2.hasOwnProperty(key));
