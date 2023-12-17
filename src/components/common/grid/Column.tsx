import React, { FunctionComponent } from "react";

export type ColumnProps = {
  fieldName?: string;
  title?: string;
  sortable?: boolean;
  format?: string | null;
  editCallback?: ((key: number) => void) | null;
  deleteCallback?: ((key: number) => void) | null;
};

const defaultProps: ColumnProps = {
  fieldName: "",
  title: "",
  sortable: false,
  format: null,
  editCallback: null,
  deleteCallback: null
};

const Column: FunctionComponent<ColumnProps> = ({ fieldName, title, sortable }: ColumnProps = defaultProps) => {
  const render = !!fieldName;
  const onClick = (fieldName: string | undefined) => {
    console.log(fieldName);
  };

  return (
    <>
      {render && (
        <th className={sortable ? "clickable-column-header" : ""} key={fieldName} onClick={() => onClick(fieldName)}>
          <div>
            {title}
            <span className="order">
              <span className="dropdown">
                <span className="caret" style={{ margin: "10px 0px 10px 5px", color: "rgb(204, 204, 204" }}></span>
              </span>
              <span className="dropup">
                <span className="caret" style={{ margin: "10px 0px", color: "rgb(204, 204, 204" }}></span>
              </span>
            </span>
          </div>
        </th>
      )}
    </>
  );
};

export default Column;

Column.defaultProps = defaultProps;
Column.propTypes = {};
