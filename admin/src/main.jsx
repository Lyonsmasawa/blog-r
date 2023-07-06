import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SearchProvider from "./context/SearchProvider.jsx";
import NotificationProvider from "./context/NoificationProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NotificationProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </NotificationProvider>
  </BrowserRouter>
);
