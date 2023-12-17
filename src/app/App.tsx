import React from "react";
import "./App.css";
import { NavMenu } from "components/NavMenu";
import { Container } from "reactstrap";
import { Route, Routes } from "react-router-dom";
import { Orders } from "../components/orders/Orders";

function App() {
  return (
    <div>
      <NavMenu />
      <Container tag="main">
        <Routes>
          <Route path="/" element={<Orders />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
