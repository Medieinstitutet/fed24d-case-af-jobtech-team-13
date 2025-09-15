import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout/Layout";
import { JobSearch } from "./pages/JobSearch/JobSearch";
import { JobDetails } from "./pages/JobDetails";
import { Home } from "./pages/Home";

// Add loaders

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'jobsearch',
        element: <JobSearch />
      },
      {
        path: 'jobsearch/:id',
        element: <JobDetails />
      }
    ]
  }
]);