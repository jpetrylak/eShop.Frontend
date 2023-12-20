import { useContext } from "react";

import AlertContext from "./alert/AlertProvider";

export { AlertProvider } from "./alert/AlertProvider";
export { AlertPopup } from "./alert/AlertPopup";

export { Grid } from "./grid/Grid";

const useAlert = () => useContext(AlertContext);
export default useAlert;
