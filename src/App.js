import "./App.css";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;