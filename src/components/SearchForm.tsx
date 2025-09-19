import { useState, useEffect, useCallback } from 'react';
import { useJobs } from '../contexts/JobContext';
import { jobService } from '../api/jobService';
import { FormInputSearchVariation, FormInputType } from '@digi/arbetsformedlingen';
import { DigiFormFilter, DigiFormInputSearch} from '@digi/arbetsformedlingen-react';
import { JobActionTypes } from '../reducers/jobReducer';
import { useSearchParams } from 'react-router';
import { POPULAR_MUNICIPALITIES } from '../constants/filters';

export const SearchForm = () => {

  const { searchQuery, dispatch, jobsPerPage, selectedMunicipality } = useJobs();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Function to perform search with a given query
  const performSearchWithQuery = useCallback(async (inputValue: string, page: number = 1, municipalityOverride?: string) => {
    // Start search
    dispatch({
      type: JobActionTypes.SEARCH_START,
      payload: inputValue
    });

    try {
      const offset = (page - 1) * jobsPerPage;
      const municipalityToUse = municipalityOverride !== undefined ? municipalityOverride : selectedMunicipality;
      
      const result = await jobService.searchJobs({ 
        q: inputValue,
        offset: offset,
        limit: jobsPerPage,
        municipality: municipalityToUse || undefined
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
  }, [dispatch, jobsPerPage, selectedMunicipality]);
  
  // Initialize search query and municipality from URL params on component mount
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    const urlMunicipality = searchParams.get('municipality');
    
    if (urlQuery && !searchQuery) {
      // Update context with URL query
      dispatch({
        type: JobActionTypes.SET_SEARCH_QUERY,
        payload: urlQuery
      });
      setInputValue(urlQuery);
    } else if (!urlQuery && searchQuery) {
      // If no URL query but context has a search query, clear it
      dispatch({
        type: JobActionTypes.SET_SEARCH_QUERY,
        payload: ''
      });
      setInputValue('');
    }

    if (urlMunicipality && !selectedMunicipality) {
      // Update context with URL municipality
      dispatch({
        type: JobActionTypes.SET_MUNICIPALITY,
        payload: urlMunicipality
      });
    } else if (!urlMunicipality && selectedMunicipality) {
      // If no URL municipality but context has one, clear it
      dispatch({
        type: JobActionTypes.SET_MUNICIPALITY,
        payload: ''
      });
    }

    // Automatically perform search if we have URL params
    if (urlQuery || urlMunicipality) {
      performSearchWithQuery(urlQuery || '');
    }
  }, [searchParams, searchQuery, selectedMunicipality, dispatch, performSearchWithQuery]);
  
  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Always update search query in context, even if empty
    dispatch({
      type: JobActionTypes.SET_SEARCH_QUERY,
      payload: inputValue
    });

    // Update URL with search parameters
    const urlParams: { [key: string]: string } = {};
    if (inputValue.trim()) {
      urlParams.q = inputValue;
    }
    if (selectedMunicipality) {
      urlParams.municipality = selectedMunicipality;
    }
    
    setSearchParams(urlParams);

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
        />
        
        <DigiFormFilter
          afFilterButtonText='Filtrera på ort'
          afSubmitButtonText='Filtrera'
          afResetButtonText='Återställ'
          afListItems={POPULAR_MUNICIPALITIES}
          onAfSubmitFilter={(e: CustomEvent) => {
            console.log('onAfSubmitFilter triggered:', e.detail);
            
            // Use setTimeout to ensure the event data is properly available
            setTimeout(() => {
              const selectedIds = e.detail?.checked || [];
              console.log('Selected IDs after timeout:', selectedIds);
              const municipality = selectedIds.length > 0 ? selectedIds[0] : '';
              
              // Update context with selected municipality
              dispatch({
                type: JobActionTypes.SET_MUNICIPALITY,
                payload: municipality
              });
              
              // Update URL with municipality parameter
              const urlParams: { [key: string]: string } = {};
              if (inputValue.trim()) {
                urlParams.q = inputValue;
              }
              if (municipality) {
                urlParams.municipality = municipality;
              }
              setSearchParams(urlParams);
              
              // Perform search immediately with the new municipality value
              performSearchWithQuery(inputValue, 1, municipality);
            }, 10);
          }}
          onAfResetFilter={() => {
            console.log('onAfResetFilter triggered');
            
            // Use setTimeout to ensure the reset action is properly processed
            setTimeout(() => {
              // Clear all checkboxes in the filter
              const checkboxes = document.querySelectorAll('.search-form input[type="checkbox"]');
              checkboxes.forEach((checkbox: Element) => {
                const inputElement = checkbox as HTMLInputElement;
                inputElement.checked = false;
              });
              
              dispatch({
                type: JobActionTypes.SET_MUNICIPALITY,
                payload: ''
              });
              
              // Update URL to remove municipality parameter
              const urlParams: { [key: string]: string } = {};
              if (inputValue.trim()) {
                urlParams.q = inputValue;
              }
              setSearchParams(urlParams);
              
              // Perform search immediately without municipality filter
              performSearchWithQuery(inputValue, 1, '');
            }, 10);
          }}
        />
      </div>
    </form>
  );
};
