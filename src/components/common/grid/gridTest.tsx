import React from "react";
import { ReactNode } from "react";

type GridTestProps = {
  children: ReactNode;
};

type ColumnTestProps = {
  fieldName: string;
};

const GridTest = ({ children }: GridTestProps) => <>{children}</>;
const ColumnTest = ({ fieldName }: ColumnTestProps) => <>{fieldName}</>;

const App = () => {
  return (
    <GridTest>
      <ColumnTest fieldName="Name" />
      <ColumnTest fieldName="Age" />
      <ColumnTest fieldName="Address" />
    </GridTest>
  );
};
