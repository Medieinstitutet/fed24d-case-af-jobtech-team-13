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
  box-shadow: 0 0.25rem .75rem rgba(0,0,0, 0.25);
  /* margin-block-end: var(--digi--margin-medium); */
  padding: var(--PADDING);
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