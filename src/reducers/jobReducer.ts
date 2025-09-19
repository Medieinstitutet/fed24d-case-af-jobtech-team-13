import type { JobListItem } from "../api/jobModels";

// State interface
export interface IJobState {
  jobs: JobListItem[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  jobsPerPage: number;
  selectedMunicipalities: string[];
  selectedOccupationGroups: string[];
}

// Action types enum
export enum JobActionTypes {
  SEARCH_START = 'SEARCH_START',
  SEARCH_START_PAGINATION = 'SEARCH_START_PAGINATION',
  SEARCH_SUCCESS = 'SEARCH_SUCCESS', 
  SEARCH_ERROR = 'SEARCH_ERROR',
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  SET_PAGE = 'SET_PAGE',
  SET_MUNICIPALITIES = 'SET_MUNICIPALITIES',
  SET_OCCUPATION_GROUPS = 'SET_OCCUPATION_GROUPS',
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
  currentPage: 1,
  jobsPerPage: 10,
  selectedMunicipalities: [],
  selectedOccupationGroups: [],
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
        currentPage: 1, // Reset to first page on new search
      };

    case JobActionTypes.SEARCH_START_PAGINATION:
      return {
        ...state,
        loading: true,
        error: null,
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

    case JobActionTypes.SET_PAGE:
      return {
        ...state,
        currentPage: parseInt(action.payload),
      };

    case JobActionTypes.SET_MUNICIPALITIES:
      return {
        ...state,
        selectedMunicipalities: JSON.parse(action.payload),
      };

    case JobActionTypes.SET_OCCUPATION_GROUPS:
      return {
        ...state,
        selectedOccupationGroups: JSON.parse(action.payload),
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