import "./Grid.css";
import { Input, Table } from "reactstrap";
import { IPagedResult, IPagingWithPageSizes } from "API/common";
import React, { Dispatch, ReactElement, SetStateAction } from "react";
import DateTimeUtils from "utility/dateTimeUtils";
import Column, { ColumnProps } from "./Column";
import { GridPagination } from "./pagination/GridPagination";
import { ActionsCell } from "./cells/ActionsCell";

type GridProps<T extends Record<string, any>> = {
  children: ReactElement[];
  loading: boolean;
  selectable?: boolean;
  selectCallback?: ((key: number, checked: boolean) => void) | null;
  selectedKeys?: number[] | null;
  pagedDataState: IPagedResult<T>;
  pagingState: IPagingWithPageSizes;
  setPagingState: Dispatch<SetStateAction<IPagingWithPageSizes>>;
};

const defaultProps: GridProps<any> = {
  children: Array.of<ReactElement>(),
  loading: false,
  selectable: false,
  selectCallback: null,
  selectedKeys: null,
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
  setPagingState: () => {}
};

export const Grid = <T extends Record<string, any>>({
  children,
  loading,
  selectable,
  selectCallback,
  selectedKeys,
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
      fieldValue = DateTimeUtils.format(fieldValue, format);
    }

    return <td key={fieldName}>{fieldValue}</td>;
  }

  const isRowSelected = (itemKey: number) => !!selectedKeys?.find(k => k == itemKey);

  function renderRowCells<T extends Record<string, any>>(rowItem: T) {
    const itemId: T[string] = rowItem["id"];
    const cells: any[] = [];

    if (selectable && selectCallback) {
      cells.push(
        <td key={`${itemId}_select`}>
          <Input
            type="checkbox"
            checked={isRowSelected(itemId)}
            onChange={e => selectCallback(itemId, e.target.checked)}
          />
        </td>
      );
    }

    children.map(child => {
      cells.push(renderCell(child, rowItem, itemId));
    });

    return cells;
  }

  function render() {
    return (
      <div>
        <Table bordered hover>
          <thead>
            <tr>
              {selectable && selectCallback && <Grid.Column selectable={true} />}
              {children}
            </tr>
          </thead>
          <tbody>
            {pagedDataState.items.map((rowItem, indexRow: number) => {
              return <tr key={indexRow}>{renderRowCells(rowItem)}</tr>;
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
