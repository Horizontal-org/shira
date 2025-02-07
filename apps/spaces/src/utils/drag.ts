import { Component } from "./dynamicComponents";

export const reorder = (list, startIndex, endIndex) => {
  const result: Component[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
