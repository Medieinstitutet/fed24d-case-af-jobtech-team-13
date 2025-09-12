import { DigiLayoutBlock, DigiLayoutContainer, DigiNavigationPagination, DigiTypography } from "@digi/arbetsformedlingen-react";
import { transformApiJobToListItem } from "../../api/transformers";
import type { ApiJobHit } from "../../api/types";
import { testObject } from "./testObject";
import { LayoutBlockContainer, LayoutBlockVariation } from "@digi/arbetsformedlingen";
import { JobCard } from "./JobCard";

export const JobSearchPresentation = () => {

  const searchData = testObject.hits.map(hit => 
    transformApiJobToListItem(hit as ApiJobHit)
  );

  return (
    <>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.SECONDARY} afContainer={LayoutBlockContainer.STATIC}>
        <DigiTypography>
          
          <DigiLayoutContainer afNoGutter>
            {searchData.map((job) => <JobCard key={job.id} job={job} />)}
            
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


// <>
//   {searchData.map((job) => (
//     <h2 key={job.id}>{job.title}</h2>
//   ))}
// </>