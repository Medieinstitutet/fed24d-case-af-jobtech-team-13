import { useState, useEffect, useCallback } from 'react';
import { useJobs } from '../contexts/JobContext';
import { jobService } from '../api/jobService';
import { FormInputSearchVariation, FormInputType } from '@digi/arbetsformedlingen';
import { DigiFormInputSearch} from '@digi/arbetsformedlingen-react';
import { JobActionTypes } from '../reducers/jobReducer';
import { useSearchParams } from 'react-router';

export const SearchForm = () => {

  const { searchQuery, dispatch, jobsPerPage } = useJobs();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Function to perform search with a given query
  const performSearchWithQuery = useCallback(async (inputValue: string, page: number = 1) => {
    // Start search
    dispatch({
      type: JobActionTypes.SEARCH_START,
      payload: inputValue
    });

    try {
      const offset = (page - 1) * jobsPerPage;
      
      const result = await jobService.searchJobs({ 
        q: inputValue,
        offset: offset,
        limit: jobsPerPage
      });

      dispatch({
        type: JobActionTypes.SEARCH_SUCCESS,
        payload: JSON.stringify({
          jobs: result.hits,
          total: result.total
        })
      });
    } catch (err) {
      console.error('Search error:', err);

      dispatch({
        type: JobActionTypes.SEARCH_ERROR,
        payload: 'Något gick fel vid sökningen. Försök igen.'
      });
    }
  }, [dispatch, jobsPerPage]);
  
  // Initialize search query from URL params on component mount
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && !searchQuery) {
      // Update context with URL query
      dispatch({
        type: JobActionTypes.SET_SEARCH_QUERY,
        payload: urlQuery
      });
      setInputValue(urlQuery);
      // Automatically perform search with the URL query
      performSearchWithQuery(urlQuery);
    } else if (!urlQuery && searchQuery) {
      // If no URL query but context has a search query, clear it
      dispatch({
        type: JobActionTypes.SET_SEARCH_QUERY,
        payload: ''
      });
      setInputValue('');
    }
  }, [searchParams, searchQuery, dispatch, performSearchWithQuery]);
  
  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Always update search query in context, even if empty
    dispatch({
      type: JobActionTypes.SET_SEARCH_QUERY,
      payload: inputValue
    });

    // Update URL with search query (or remove it if empty)
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue });
    } else {
      setSearchParams({});
    }

    // Perform search using the shared function
    await performSearchWithQuery(inputValue);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="search-input-container">
        <DigiFormInputSearch 
          afLabel="Sök jobb"
          afVariation={FormInputSearchVariation.LARGE}
          afType={FormInputType.SEARCH}
          afButtonText="Sök"
          afValue={inputValue}
          onAfOnInput={(e: CustomEvent) => {
            const value = (e.detail.target as HTMLInputElement)?.value || '';
            setInputValue(value);
            // Don't update context until search is performed
          }}
          onAfOnClick={() => handleSearch()}
        >
        </DigiFormInputSearch>
      </div>
    </form>
  );
};
