import { IPagingWithPageSizes } from "API/common";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row
} from "reactstrap";

import * as S from "./styled";

type GridPaginationProps = {
  totalPages: number;
  currentPage: number;
  pagingState: IPagingWithPageSizes;
  setPagingState: Dispatch<SetStateAction<IPagingWithPageSizes>>;
};

const defaultProps: GridPaginationProps = {
  totalPages: 0,
  currentPage: 0,
  pagingState: {
    currentPage: 0,
    resultsPerPage: 0,
    orderBy: "",
    sortOrder: "",
    pageSizes: []
  },
  setPagingState: () => {}
};

export const GridPagination = ({
  totalPages,
  currentPage,
  pagingState,
  setPagingState
}: GridPaginationProps = defaultProps) => {
  const [pageSize, setPageSize] = useState(pagingState.resultsPerPage);

  const onPageClicked = (pageNumber: number) => {
    setPagingState({ ...pagingState, currentPage: pageNumber });
  };

  const onPageSizeDropdownChanged = (pageSize: number) => {
    setPagingState({ ...pagingState, resultsPerPage: pageSize });
    setPageSize(pageSize);
  };

  const renderPagination = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <PaginationItem key={i} active={i === currentPage} onClick={() => onPageClicked(i)}>
          <PaginationLink href="#">{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return paginationItems;
  };

  const renderPageSizesDropdownMenu = () => {
    const pageSizesItems: any[] = [];
    pagingState.pageSizes.map(pageSize => {
      pageSizesItems.push(
        <DropdownItem key={pageSize} onClick={() => onPageSizeDropdownChanged(pageSize)}>
          {pageSize}
        </DropdownItem>
      );
    });
    return pageSizesItems;
  };

  return (
    <>
      <Row>
        <Col className={""}>
          <Pagination>{renderPagination()}</Pagination>
        </Col>

        <Col className={"col-auto"}>
          <S.UncontrolledDropdown>
            <span className={"text-muted"}>Rows on page:</span>

            <DropdownToggle caret color="primary" className={"pageable-grid-dropdown-toggle"}>
              {pageSize}
            </DropdownToggle>

            <DropdownMenu>{renderPageSizesDropdownMenu()}</DropdownMenu>
          </S.UncontrolledDropdown>
        </Col>
      </Row>
    </>
  );
};

GridPagination.defaultProps = defaultProps;
