import React from "react";
import "./App.css";
import { NavMenu } from "components/NavMenu";
import { Container } from "reactstrap";
import { Route, Routes } from "react-router-dom";
import { FetchOrders } from "components/Orders";

function App() {
  return (
    <div>
      <NavMenu />
      <Container tag="main">
        <Routes>
          <Route path="/" element={<FetchOrders />} />
        </Routes>
      </Container>
    </div>
  );
}


export default App;
