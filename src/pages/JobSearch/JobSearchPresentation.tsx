import { DigiLayoutBlock, DigiLayoutContainer, DigiLoaderSpinner, DigiNavigationPagination, DigiTypography } from "@digi/arbetsformedlingen-react";
import { LayoutBlockContainer, LayoutBlockVariation, LoaderSpinnerSize } from "@digi/arbetsformedlingen";
import { JobCard } from "./JobCard";
import { useJobs } from "../../contexts/JobContext";

export const JobSearchPresentation = () => {
  const { jobs, totalResults, loading, error } = useJobs();

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
          <div className={error ? 'app-visible' : 'app-hidden'}>
            Fel: {error}
          </div>

          <div className={`loading-alert af-margin-top-2 ${loading ? 'app-visible' : 'app-hidden'}`}>
            <DigiLoaderSpinner afSize={LoaderSpinnerSize.MEDIUM} afText="Laddar sökresultat" />
          </div>

          <div className={!loading && jobs && jobs.length > 0 ? 'app-visible' : 'app-hidden'}>
            {jobs.map((job) => <JobCard key={job.id} job={job} />)}
            {totalResults > 10 && (
              <DigiNavigationPagination 
                afTotalPages={Math.ceil(totalResults / 10)}
                afInitActivePage={1} 
              />
            )}
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