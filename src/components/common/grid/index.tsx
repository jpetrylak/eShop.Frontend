import React, { ReactElement, useState } from "react";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
import { PagedResult } from "services/common/pagingModels";
import { Column } from "./column";

type GridProps<T> = {
  pagedData: PagedResult<T>;
  children: ReactElement[];
};

export const Grid = <T,>({ pagedData, children, ...props }: GridProps<T>) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { items } = pagedData;

  console.log("items: ", items);

  const [loading, setLoading] = useState<boolean>(false);
  const [gridPagedData, setGridPagedData] = useState<PagedResult<T>>(null);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <Table bordered hover>
        <thead>
          <tr>{children}</tr>
        </thead>
        <tbody>{renderRows(items, children)}</tbody>
      </Table>

      <Pagination>
        <PaginationItem>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" previous />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" next />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" last />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

Grid.Column = Column;

const renderRows = (items: any[], children: ReactElement[]): React.JSX.Element[] => {
  return items.map((item, indexRow) => {
    return (
      <tr key={indexRow}>
        {children.map(child => {
          const { fieldName } = child.props;
          const fieldValue = item[fieldName];
          return <td key={fieldName}>{fieldValue}</td>;
        })}
      </tr>
    );
  });
};

export default Grid;
