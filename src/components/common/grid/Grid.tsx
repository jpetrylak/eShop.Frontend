import moment from "moment";
import "./Grid.css";
import { Table } from "reactstrap";
import { IPagedResult, IPaging } from "API/common";
import React, { Dispatch, ReactElement, SetStateAction } from "react";
import Column, { ColumnProps } from "./Column";
import { GridPagination } from "./pagination/GridPagination";
import { ActionsCell } from "./cells/ActionsCell";

type GridProps<T extends Record<string, any>> = {
  children: ReactElement[];
  loading: boolean;
  pagedDataState: IPagedResult<T>;
  pagingState: IPaging;
  setPagingState: Dispatch<SetStateAction<IPaging>>;
};

const defaultProps: GridProps<any> = {
  children: Array.of<ReactElement>(),
  loading: false,
  pagedDataState: {
    currentPage: 0,
    resultsPerPage: 0,
    totalPages: 0,
    totalResults: 0,
    items: [],
    isEmpty: true,
    isNotEmpty: false
  },
  pagingState: {
    currentPage: 0,
    resultsPerPage: 0,
    orderBy: "",
    sortOrder: "",
    pageSizes: []
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPagingState: () => {}
};

export const Grid = <T extends Record<string, any>>({
  children,
  loading,
  pagedDataState,
  pagingState,
  setPagingState,
  ...props
}: GridProps<T> = defaultProps) => {
  function renderCell<T extends Record<string, any>>(
    child: React.ReactElement<ColumnProps>,
    item: T,
    itemId: T[string]
  ) {
    if (!React.isValidElement(child)) return <></>;

    const { fieldName, format, editCallback, deleteCallback } = child.props;
    // @ts-ignore
    let fieldValue = item[fieldName];

    if (editCallback || deleteCallback) {
      fieldValue = (
        <ActionsCell dataItem={{ id: itemId }} editCallback={editCallback} deleteCallback={deleteCallback} />
      );
    } else if (format && fieldValue) {
      fieldValue = moment(fieldValue).format(format);
    }

    return <td key={fieldName}>{fieldValue}</td>;
  }

  function renderRowCells<T extends Record<string, any>>(item: T) {
    const cells: any[] = [];
    children.map(child => {
      const itemId: T[string] = item["id"];

      cells.push(renderCell(child, item, itemId));
    });

    return cells;
  }

  function render() {
    return (
      <div>
        <Table bordered hover>
          <thead>
            <tr>{children}</tr>
          </thead>
          <tbody>
            {pagedDataState.items.map((item, indexRow: number) => {
              return <tr key={indexRow}>{renderRowCells(item)}</tr>;
            })}
          </tbody>
        </Table>

        <GridPagination
          totalPages={pagedDataState.totalPages}
          currentPage={pagedDataState.currentPage}
          pagingState={pagingState}
          setPagingState={setPagingState}
        />
      </div>
    );
  }

  return loading ? <p>Loading...</p> : render();
};

Grid.Column = Column;

export default Grid;

Grid.defaultProps = defaultProps;
