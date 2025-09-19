
import { DigiLayoutBlock } from '@digi/arbetsformedlingen-react';
import { SearchSection } from '../../components/SearchSection';
import { LayoutBlockVariation } from '@digi/arbetsformedlingen';
import { JobSearchPresentation } from './JobSearchPresentation';
import { useLoaderData } from 'react-router';
import { useJobs } from '../../contexts/JobContext';
import { JobActionTypes } from '../../reducers/jobReducer';
import { useEffect } from 'react';
import type { JobListItem } from '../../api/jobModels';

interface ILoaderData {
  jobs?: JobListItem[];
  total?: number;
  initialData?: boolean;
}

export const JobSearch = () => {
  const loaderData = useLoaderData() as ILoaderData;
  const { dispatch, jobs } = useJobs();

  useEffect(() => {
    const loadInitialData = () => {
      if (loaderData.jobs && loaderData.jobs.length > 0) {
        dispatch({
          type: JobActionTypes.SEARCH_SUCCESS,
          payload: JSON.stringify({
            jobs: loaderData.jobs,
            total: loaderData.total || 0
          })
        });
      }
    };

    if (jobs.length > 0) return;

    loadInitialData();
  });

  return (
    <>
      <DigiLayoutBlock 
        afVariation={LayoutBlockVariation.PRIMARY}
      >
        <SearchSection />
      </DigiLayoutBlock>
      <JobSearchPresentation />
    </>
  );
};