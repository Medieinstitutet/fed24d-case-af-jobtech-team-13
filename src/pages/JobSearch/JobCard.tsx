import { DigiInfoCardMulti, DigiLayoutContainer } from "@digi/arbetsformedlingen-react";
import type { JobListItem } from "../../api/jobModels";
import { InfoCardMultiHeadingLevel, InfoCardMultiType } from "@digi/arbetsformedlingen";
import styled from "styled-components";

type JobCardProps = {
  job: JobListItem;
}

const StyledJobCardCntainer = styled(DigiLayoutContainer)`

`;

const StyledJobCard = styled(DigiInfoCardMulti)`
  display: block;
  width: 100%;
  box-shadow: 0 0.25rem .75rem rgba(0,0,0, 0.25);
  margin-bottom: var(--digi--margin-medium);
`;

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <StyledJobCard 
      afType={InfoCardMultiType.ENTRY} 
      afHeadingLevel={InfoCardMultiHeadingLevel.H3} 
      afHeading={job.title}
      afLinkHref={`jobdetails/${job.id}`}
    >
      <strong>{job.employer}{job.city != 'Unknown' ? ` - ${job.city}` : ''}</strong>
      <p></p>
    </StyledJobCard>
  );
};