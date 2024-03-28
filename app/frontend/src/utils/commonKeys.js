/*
 * Helper function to find common keys between two objects
 */

export const commonKeys = (obj1, obj2) =>
  Object.keys(obj1).filter(
    (key) => obj2.hasOwnProperty(key) && key !== "Datasheet" // 'Datesheet' is added to prevent it getting displayed, because it contains 'View Now' without any hyperlink info
  );
