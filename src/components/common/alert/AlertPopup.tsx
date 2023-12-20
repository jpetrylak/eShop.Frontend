import React from "react";
import { Alert } from "reactstrap";
import useAlert from "../index";

export const AlertPopup = () => {
  const { text, color, visible, onDismiss } = useAlert();

  return visible && text ? (
    <Alert
      color={color == "" ? undefined : color}
      isOpen={visible}
      toggle={onDismiss}
      className={"global-popup"}
      style={{ position: "absolute", zIndex: 1056 }}
    >
      {text}
    </Alert>
  ) : (
    <></>
  );
};

export default AlertPopup;
