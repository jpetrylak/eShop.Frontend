import React from "react";

export type ActionsCellProps = {
  dataItem: {
    id: number;
  };
  editCallback?: ((key: number) => void) | null;
  deleteCallback?: ((key: number) => void) | null;
};

const defaultProps: ActionsCellProps = {
  dataItem: {
    id: 0
  },
  editCallback: (key: number) => {},
  deleteCallback: (key: number) => {}
};

export const ActionsCell = (Component: ActionsCellProps): JSX.Element => {
  const { dataItem, editCallback, deleteCallback } = Component;
  const renderEdit = !!editCallback;
  const renderDelete = !!deleteCallback;

  return (
    <>
      <div>
        {renderEdit && (
          <div className={"action-button"} style={{ marginRight: "4px" }}>
            <a href="#" onClick={() => editCallback(dataItem.id)}>
              Edit
            </a>
          </div>
        )}

        {renderDelete && (
          <div className={"action-button"}>
            <a href="#" onClick={() => deleteCallback(dataItem.id)}>
              Delete
            </a>
          </div>
        )}
      </div>
    </>
  );
};

ActionsCell.props = defaultProps;
