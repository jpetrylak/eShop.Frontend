import React from "react";
import "./App.css";
import { NavMenu } from "components/NavMenu";
import { Container } from "reactstrap";
import { Route, Routes } from "react-router-dom";
import { Orders } from "../components/orders/Orders";
import { AlertPopup, AlertProvider } from "../components/common";

function App() {
  return (
    <div>
      <AlertProvider>
        <AlertPopup />
        <NavMenu />
        <Container tag="main">
          <Routes>
            <Route path="/" element={<Orders />} />
          </Routes>
        </Container>
      </AlertProvider>
      ,
    </div>
  );
}

export default App;
