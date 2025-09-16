import React, { useCallback } from 'react';
import { DigiLayoutBlock, DigiLayoutContainer, DigiLoaderSpinner, DigiNavigationPagination, DigiTypography } from "@digi/arbetsformedlingen-react";
import { LayoutBlockContainer, LayoutBlockVariation, LoaderSpinnerSize } from "@digi/arbetsformedlingen";
import { JobCard } from "./JobCard";
import { useJobs } from "../../contexts/JobContext";
import { JobActionTypes } from "../../reducers/jobReducer";
import { jobService } from "../../api/jobService";

export const JobSearchPresentation = () => {
  const { jobs, totalResults, loading, error, currentPage, jobsPerPage, searchQuery, dispatch } = useJobs();

  // Calculate total pages
  const totalPages = Math.ceil(Math.min(totalResults, 2000) / jobsPerPage);

  // Utility function for visibility classes
  const getVisibilityClass = (condition: boolean) => 
    condition ? 'app-visible' : 'app-hidden';

  // Pre-calculate visibility conditions
  const showError = !!error;
  const showLoading = loading;
  const showContent = !loading && jobs && jobs.length > 0;
  const showPagination = showContent && totalResults > jobsPerPage;

  // Function to perform search with pagination
  const performPaginatedSearch = useCallback(async (page: number) => {
    if (!page || typeof page !== 'number' || page < 1) {
      console.error('Invalid page number for pagination:', page);
      return;
    }

    const offset = (page - 1) * jobsPerPage;
    
    // Start pagination search
    dispatch({
      type: JobActionTypes.SEARCH_START_PAGINATION,
      payload: ""
    });

    // Set the page immediately 
    dispatch({
      type: JobActionTypes.SET_PAGE,
      payload: page.toString()
    });

    try {
      const result = await jobService.searchJobs({ 
        q: searchQuery,
        offset: offset,
        limit: jobsPerPage
      });

      dispatch({
        type: JobActionTypes.SEARCH_SUCCESS,
        payload: JSON.stringify({
          jobs: result.hits,
          total: result.total
        })
      });
    } catch (err) {
      console.error('Pagination search error:', err);
      dispatch({
        type: JobActionTypes.SEARCH_ERROR,
        payload: 'Något gick fel vid sidnavigering. Försök igen.'
      });
    }
  }, [dispatch, jobsPerPage, searchQuery]);

  // Handle page change
  const handlePageChange = useCallback((event: CustomEvent) => {
    const newPage = event.detail;
    
    if (newPage && newPage > 0) {
      performPaginatedSearch(newPage);
    } else {
      console.error('Invalid page number:', newPage);
    }
  }, [performPaginatedSearch]);

  // Memoized pagination component to prevent React DOM conflicts
  const PaginationComponent = React.memo(() => {
    if (!showContent || !showPagination) return null;

    return (
      <DigiNavigationPagination 
        afTotalPages={totalPages}
        afInitActivePage={currentPage}
        onAfOnPageChange={handlePageChange}
      />
    );
  });

  // Error handling
  if (error) {
    return (
      <DigiLayoutBlock afVariation={LayoutBlockVariation.SECONDARY} afContainer={LayoutBlockContainer.STATIC}>
        <div>Fel: {error}</div>
      </DigiLayoutBlock>
    );
  }

  return (
    <DigiLayoutBlock afVariation={LayoutBlockVariation.SECONDARY} afContainer={LayoutBlockContainer.STATIC}>
      <DigiTypography>
        <DigiLayoutContainer afNoGutter afVerticalPadding>
          <div className={getVisibilityClass(showError)}>
            Fel: {error}
          </div>

          <div className={`loading-alert ${getVisibilityClass(showLoading)}`}>
            <DigiLoaderSpinner afSize={LoaderSpinnerSize.MEDIUM} afText="Laddar sökresultat" />
          </div>

          <div className={getVisibilityClass(showContent)}>
            {jobs.map((job) => <JobCard key={job.id} job={job} />)}
            <PaginationComponent />
          </div>
        </DigiLayoutContainer>
      </DigiTypography>
    </DigiLayoutBlock>
  );
};


// export const JobSearchPresentation = () => {
//   const { jobs, totalResults, loading, error } = useJobs();

//   if (loading) {
//     return <div>Laddar...</div>;
//   }

//   if (error) {
//     return <div>Fel: {error}</div>;
//   }

//   return (
//     <div>
//       {jobs && jobs.length > 0 ? (
//         <div>
//           {jobs.map((job) => (
//             <div key={job.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
//               <h3>{job.title}</h3>
//               <strong>{job.employer}</strong>
//               {job.city !== 'Unknown' && <span> - {job.city}</span>}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>Inga jobb att visa</div>
//       )}
//     </div>
//   );
// };