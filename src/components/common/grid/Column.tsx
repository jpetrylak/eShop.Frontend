import React, { FunctionComponent } from "react";

export type ColumnProps = {
  fieldName?: string;
  title?: string;
  sortable?: boolean;
  selectable?: boolean;
  format?: string | null;
  editCallback?: ((key: number) => void) | null;
  deleteCallback?: ((key: number) => void) | null;
};

const defaultProps: ColumnProps = {
  fieldName: "",
  title: "",
  selectable: false,
  sortable: false,
  format: null,
  editCallback: null,
  deleteCallback: null
};

const Column: FunctionComponent<ColumnProps> = ({
  fieldName,
  title,
  selectable,
  sortable
}: ColumnProps = defaultProps) => {
  const render = !!fieldName || selectable;
  const key = selectable ? "_selectable_" : fieldName;
  const onClick = (fieldName: string | undefined) => {
    console.log(fieldName);
  };

  return <>{render && <th key={key}>{title}</th>}</>;
};

export default Column;

Column.defaultProps = defaultProps;
Column.propTypes = {};
