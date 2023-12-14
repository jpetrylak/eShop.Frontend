import React from "react";

export type GridColumnProps = {
  fieldName: string;
  title: string;
};

export const Column = ({ fieldName, title }: GridColumnProps) => {
  return <th key={fieldName}>{title}</th>;
};
