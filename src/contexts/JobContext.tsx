/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { JobListItem } from '../api/jobModels';

interface JobContextType {
  jobs: JobListItem[];
  setJobs: (jobs: JobListItem[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  totalResults: number;
  setTotalResults: (total: number) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  return (
    <JobContext.Provider value={{
      jobs,
      setJobs,
      searchQuery,
      setSearchQuery,
      loading,
      setLoading,
      error,
      setError,
      totalResults,
      setTotalResults,
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