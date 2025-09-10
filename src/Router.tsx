import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/layout/Layout";
import { JobSearch } from "./pages/JobSearch";
import { JobDetails } from "./pages/JobDetails";

// Add loaders

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <JobSearch />
      },
      {
        path: '/:id',
        element: <JobDetails />
      }
    ]
  }
]);