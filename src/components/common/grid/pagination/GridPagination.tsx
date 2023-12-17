/* eslint-disable @typescript-eslint/no-empty-function */
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
import React, { Dispatch, SetStateAction, useState } from "react";
import * as S from "./styled";
import { IPagingData } from "API/common";

type GridPaginationProps = {
  totalPages: number;
  currentPage: number;
  pagingState: IPagingData;
  setPagingState: Dispatch<SetStateAction<IPagingData>>;
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
  const [pageSize, setPageSize] = useState(pagingState.currentPage);

  const onPageClicked = (pageNumber: number) => {
    setPagingState({ ...pagingState, currentPage: pageNumber });
  };

  const onPageSizeDropdownChanged = (pageSize: number) => {
    setPagingState({ ...pagingState, resultsPerPage: pageSize });
  };

  const onPageSizeDropdownChangedLocal = (pageSize: number) => {
    onPageSizeDropdownChanged(pageSize);
    setPageSize(pageSize);
  };

  const renderPaginationItems = () => {
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

  const renderPageSizesItems = () => {
    const pageSizesItems: any[] = [];
    pagingState.pageSizes.map(pageSize => {
      pageSizesItems.push(
        <DropdownItem key={pageSize} onClick={() => onPageSizeDropdownChangedLocal(pageSize)}>
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
          <Pagination>{renderPaginationItems()}</Pagination>
        </Col>

        <Col className={"col-auto"}>
          <S.UncontrolledDropdown>
            <span className={"text-muted"}>Rows on page:</span>

            <DropdownToggle caret color="primary" className={"pageable-grid-dropdown-toggle"}>
              {pageSize}
            </DropdownToggle>

            <DropdownMenu>{renderPageSizesItems()}</DropdownMenu>
          </S.UncontrolledDropdown>
        </Col>
      </Row>
    </>
  );
};

GridPagination.defaultProps = defaultProps;
