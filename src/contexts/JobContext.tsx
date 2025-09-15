/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import { initialState, jobReducer, type IJobState, type JobActions } from '../reducers/jobReducer';
interface IJobContext extends IJobState {
  dispatch: Dispatch<JobActions>
}

const JobContext = createContext<IJobContext | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  return (
    <JobContext.Provider value={{
      ...state,
      dispatch
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};