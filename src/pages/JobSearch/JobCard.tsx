import { DigiInfoCardMulti, DigiTypographyTime } from "@digi/arbetsformedlingen-react";
import type { JobListItem } from "../../api/jobModels";
import { InfoCardMultiHeadingLevel, InfoCardMultiType, TypographyTimeVariation } from "@digi/arbetsformedlingen";
import styled from "styled-components";

type JobCardProps = {
  job: JobListItem;
}

const StyledJobCard = styled(DigiInfoCardMulti)`
  display: block;
  width: 100%;
  box-shadow: 0 0.125rem .25rem rgba(0,0,0, 0.25);
  margin-bottom: 0.875rem;
`;

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <StyledJobCard 
      afType={InfoCardMultiType.ENTRY} 
      afHeadingLevel={InfoCardMultiHeadingLevel.H3} 
      afHeading={job.title}
      afLinkHref={`jobsearch/${job.id}`}
    >
      <strong>{job.employer}{job.city != 'Unknown' ? ` - ${job.city}` : ''}</strong>
      <p className="af-margin-top-2">
        <span>{job.occupation}</span><br/>
        <span>
          Publicerad 
          <DigiTypographyTime 
            afVariation={TypographyTimeVariation.DISTANCE} 
            afDateTime={job.publicationDate}>
          </DigiTypographyTime>
        </span>
      </p>
    </StyledJobCard>
  );
};