import { RouterProvider } from "react-router";
// import "./App.css";
import { appRouter } from "./Router";

function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
