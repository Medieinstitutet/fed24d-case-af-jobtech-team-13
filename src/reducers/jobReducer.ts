import type { JobListItem } from "../api/jobModels";

// State interface
export interface IJobState {
  jobs: JobListItem[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  totalResults: number;
}

// Action types enum
export enum JobActionTypes {
  SEARCH_START = 'SEARCH_START',
  SEARCH_SUCCESS = 'SEARCH_SUCCESS', 
  SEARCH_ERROR = 'SEARCH_ERROR',
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  RESET_ERROR = 'RESET_ERROR'
}

// Action type
export type JobActions = {
  type: JobActionTypes;
  payload: string;
};

// Initial state
export const initialState: IJobState = {
  jobs: [],
  searchQuery: '',
  loading: false,
  error: null,
  totalResults: 0,
};

export const jobReducer = (state: IJobState, action: JobActions) => {

  switch (action.type) {
    case JobActionTypes.SEARCH_START:
      return {
        ...state,
        searchQuery: action.payload,
        loading: true,
        error: null,
        jobs: [],
        totalResults: 0,
      };

    case JobActionTypes.SEARCH_SUCCESS: {
      const result = JSON.parse(action.payload);
      return {
        ...state,
        jobs: result.jobs,
        totalResults: result.total,
        loading: false,
        error: null
      };
    }
    case JobActionTypes.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        jobs: [],
        totalResults: 0
      };
    
    case JobActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case JobActionTypes.RESET_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }

}