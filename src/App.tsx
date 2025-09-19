import { RouterProvider } from "react-router";
import { JobProvider } from "./contexts/JobContext";
// import "./App.css";
import { appRouter } from "./Router";

function App() {
  return <>
  <JobProvider>
    <RouterProvider router={appRouter}></RouterProvider>
  </JobProvider>
  </>
}

export default App;
