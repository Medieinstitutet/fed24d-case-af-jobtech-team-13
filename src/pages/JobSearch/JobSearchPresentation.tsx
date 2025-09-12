import { DigiLayoutBlock, DigiLayoutContainer, DigiNavigationPagination, DigiTypography } from "@digi/arbetsformedlingen-react";
import { LayoutBlockContainer, LayoutBlockVariation } from "@digi/arbetsformedlingen";
import { JobCard } from "./JobCard";
import { useJobs } from "../../contexts/JobContext";

export const JobSearchPresentation = () => {

  const { jobs, totalResults, loading, error } = useJobs();
  console.log('jobs:', jobs);
  console.log('total:', totalResults);

  // Safety checks
  if (loading) return <div>Laddar...</div>;
  if (error) return <div>Fel: {error}</div>;
  if (!jobs || jobs.length === 0) return <div style={{ textAlign: "center" }}>Inga jobb att visa</div>;

  return (
    <>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.SECONDARY} afContainer={LayoutBlockContainer.STATIC}>
        <DigiTypography>
          
          <DigiLayoutContainer afNoGutter>
            {jobs.map((job) => <JobCard key={job.id} job={job} />)}
            
            <DigiNavigationPagination
              afTotalPages={10}
              afInitActivePage={1}
            >

            </DigiNavigationPagination>
          </DigiLayoutContainer>

        </DigiTypography>
      </DigiLayoutBlock>
    </>
  );
};