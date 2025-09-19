import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout/Layout";
import { JobSearch } from "./pages/JobSearch/JobSearch";
import { JobDetails } from "./pages/JobDetails/JobDetails";
import { Home } from "./pages/Home";
import { jobSearchLoader } from "./loaders/jobLoader";
import { jobDetailsLoader } from "./loaders/jobDetailsLoader";

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
        element: <JobSearch />,
        loader: jobSearchLoader
      },
      {
        path: 'jobsearch/:id',
        element: <JobDetails />,
        loader: jobDetailsLoader
      }
    ]
  }
]);