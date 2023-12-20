import React, { createContext, ReactElement, useState } from "react";

const ALERT_TIME = 5000;
const initialState: AlertContextProps = {
  text: "",
  color: "",
  visible: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDismiss: () => {}
};

type AlertText = string | undefined;
type AlertColor = "" | "primary" | "secondary" | "danger" | "warning" | "info" | "light" | "dark";

type AlertContextProps = {
  text: AlertText;
  color: AlertColor;
  visible: boolean;
  onDismiss: () => void;
};

const AlertContext = createContext({
  ...initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAlert: (text: AlertText, color: AlertColor = "") => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDismiss: () => {}
});

type AlertProviderProps = {
  children: ReactElement[];
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [text, setText] = useState<AlertText>("");
  const [color, setColor] = useState<AlertColor>("");
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const setAlert = (text: AlertText, color: AlertColor = "") => {
    setText(text);
    setColor(color);
    setVisible(true);

    setTimeout(() => {
      setText("");
      setColor("");
      setVisible(false);
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        color,
        visible,
        onDismiss,
        setAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
