import { useState, useEffect, useCallback, useRef } from 'react';
import { useJobs } from '../contexts/JobContext';
import { jobService } from '../api/jobService';
import { FormInputSearchVariation, FormInputType } from '@digi/arbetsformedlingen';
import { DigiFormFilter, DigiFormInputSearch} from '@digi/arbetsformedlingen-react';
import { JobActionTypes } from '../reducers/jobReducer';
import { useSearchParams } from 'react-router';
import { POPULAR_MUNICIPALITIES, POPULAR_OCCUPATION_GROUPS } from '../constants/filters';

// Constants for timing and configuration
const TIMING = {
  FILTER_EVENT_DELAY: 10,
  CHECKBOX_SYNC_DELAY: 100,
  INITIAL_CHECKBOX_DELAYS: [200, 500, 1000],
  SEARCH_DEBOUNCE_DELAY: 50
} as const;

export const SearchForm = () => {

  const { searchQuery, dispatch, jobsPerPage, selectedMunicipalities, selectedOccupationGroups } = useJobs();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Use ref for timeout to avoid re-render issues
  const searchTimeoutRef = useRef<number | null>(null);
  const hasInitializedRef = useRef(false);
  
  // Function to perform search with a given query
  const performSearchWithQuery = useCallback(async (
    inputValue: string, 
    page: number = 1, 
    municipalitiesOverride?: string[],
    occupationGroupsOverride?: string[]
  ) => {
    // Start search
    dispatch({
      type: JobActionTypes.SEARCH_START,
      payload: inputValue
    });

    try {
      const offset = (page - 1) * jobsPerPage;
      const municipalitiesToUse = municipalitiesOverride !== undefined ? municipalitiesOverride : selectedMunicipalities;
      const occupationGroupsToUse = occupationGroupsOverride !== undefined ? occupationGroupsOverride : selectedOccupationGroups;
      
      const result = await jobService.searchJobs({ 
        q: inputValue,
        offset: offset,
        limit: jobsPerPage,
        municipalities: municipalitiesToUse && municipalitiesToUse.length > 0 ? municipalitiesToUse : undefined,
        occupationGroups: occupationGroupsToUse && occupationGroupsToUse.length > 0 ? occupationGroupsToUse : undefined
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
  }, [dispatch, jobsPerPage, selectedMunicipalities, selectedOccupationGroups]);
  
  // Initialize state from URL params on component mount (without triggering searches)
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    const urlMunicipalities = searchParams.getAll('municipality');
    const urlOccupationGroups = searchParams.getAll('occupation-group');
    
    // Only update state if it differs from current state to avoid unnecessary rerenders
    if (urlQuery !== searchQuery) {
      dispatch({
        type: JobActionTypes.SET_SEARCH_QUERY,
        payload: urlQuery || ''
      });
      setInputValue(urlQuery || '');
    }

    // Check if municipalities differ
    const municipalitiesChanged = JSON.stringify(urlMunicipalities.sort()) !== JSON.stringify(selectedMunicipalities.sort());
    if (municipalitiesChanged) {
      dispatch({
        type: JobActionTypes.SET_MUNICIPALITIES,
        payload: JSON.stringify(urlMunicipalities)
      });
    }

    // Check if occupation groups differ
    const occupationGroupsChanged = JSON.stringify(urlOccupationGroups.sort()) !== JSON.stringify(selectedOccupationGroups.sort());
    if (occupationGroupsChanged) {
      dispatch({
        type: JobActionTypes.SET_OCCUPATION_GROUPS,
        payload: JSON.stringify(urlOccupationGroups)
      });
    }

    // Only perform search on initial mount or when URL params exist but no search has been performed
    const isInitialLoad = !hasInitializedRef.current;
    
    // Check if anything has changed that should trigger a search
    const paramsChanged = isInitialLoad || urlQuery !== searchQuery || 
        JSON.stringify(urlMunicipalities.sort()) !== JSON.stringify(selectedMunicipalities.sort()) ||
        JSON.stringify(urlOccupationGroups.sort()) !== JSON.stringify(selectedOccupationGroups.sort());
    
    if (paramsChanged) {
      // Mark as initialized
      hasInitializedRef.current = true;
      
      // Clear any existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      // Set a new timeout for the search
      const newTimeoutId = setTimeout(() => {
        performSearchWithQuery(urlQuery || '', 1, urlMunicipalities, urlOccupationGroups);
        searchTimeoutRef.current = null;
      }, TIMING.SEARCH_DEBOUNCE_DELAY);
      
      searchTimeoutRef.current = newTimeoutId;
    }
  }, [searchParams, dispatch, searchQuery, selectedMunicipalities, selectedOccupationGroups, performSearchWithQuery]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Sync visual checked state with selected items (for persistent visual state)
  useEffect(() => {
    // Update visual checkboxes to match selected state after component update
    setTimeout(() => {
      // Handle municipality checkboxes - both check and uncheck
      const municipalityCheckboxes = document.querySelectorAll('.search-form digi-form-filter[data-filter-type="municipalities"] input[type="checkbox"]');
      municipalityCheckboxes.forEach((checkbox: Element) => {
        const inputElement = checkbox as HTMLInputElement;
        const isSelected = selectedMunicipalities.includes(inputElement.value);
        inputElement.checked = isSelected;
      });
      
      // Handle occupation group checkboxes - both check and uncheck
      const occupationGroupCheckboxes = document.querySelectorAll('.search-form digi-form-filter[data-filter-type="occupation-groups"] input[type="checkbox"]');
      
      occupationGroupCheckboxes.forEach((checkbox: Element) => {
        const inputElement = checkbox as HTMLInputElement;
        const isSelected = selectedOccupationGroups.includes(inputElement.value);
        inputElement.checked = isSelected;
      });
    }, TIMING.CHECKBOX_SYNC_DELAY); // Small delay to ensure DOM is ready
  }, [selectedMunicipalities, selectedOccupationGroups]);

  // Set initial visual state on component mount
  useEffect(() => {
    const setInitialCheckboxState = () => {
      // Get current selections from URL params since context might not be ready yet
      const urlMunicipalities = searchParams.getAll('municipality');
      const urlOccupationGroups = searchParams.getAll('occupation-group');
      
      // Handle municipality checkboxes - both check and uncheck based on URL
      const municipalityCheckboxes = document.querySelectorAll('.search-form digi-form-filter[data-filter-type="municipalities"] input[type="checkbox"]');
      municipalityCheckboxes.forEach((checkbox: Element) => {
        const inputElement = checkbox as HTMLInputElement;
        const isSelected = urlMunicipalities.includes(inputElement.value);
        inputElement.checked = isSelected;
      });
      
      // Handle occupation group checkboxes - both check and uncheck based on URL
      const occupationGroupCheckboxes = document.querySelectorAll('.search-form digi-form-filter[data-filter-type="occupation-groups"] input[type="checkbox"]');
      occupationGroupCheckboxes.forEach((checkbox: Element) => {
        const inputElement = checkbox as HTMLInputElement;
        const isSelected = urlOccupationGroups.includes(inputElement.value);
        inputElement.checked = isSelected;
      });
    };

    // Try multiple times with increasing delays to account for component render timing
    setTimeout(setInitialCheckboxState, TIMING.INITIAL_CHECKBOX_DELAYS[0]);
    setTimeout(setInitialCheckboxState, TIMING.INITIAL_CHECKBOX_DELAYS[1]);
    setTimeout(setInitialCheckboxState, TIMING.INITIAL_CHECKBOX_DELAYS[2]);
  }, [searchParams]); // Depend on searchParams to get URL state
  
  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Always update search query in context, even if empty
    dispatch({
      type: JobActionTypes.SET_SEARCH_QUERY,
      payload: inputValue
    });

    // Update URL with search parameters - the useEffect will handle the API call
    const urlParams = new URLSearchParams();
    if (inputValue.trim()) {
      urlParams.append('q', inputValue);
    }
    if (selectedMunicipalities.length > 0) {
      selectedMunicipalities.forEach(municipality => {
        urlParams.append('municipality', municipality);
      });
    }
    if (selectedOccupationGroups.length > 0) {
      selectedOccupationGroups.forEach(group => {
        urlParams.append('occupation-group', group);
      });
    }
    
    setSearchParams(urlParams);
    // Removed performSearchWithQuery call - let useEffect handle it
  };

  // Helper function to build URL parameters with specific values
  const buildUrlParams = (query: string, municipalities: string[], occupationGroups: string[]) => {
    const urlParams = new URLSearchParams();
    if (query.trim()) {
      urlParams.append('q', query);
    }
    municipalities.forEach(municipality => {
      urlParams.append('municipality', municipality);
    });
    occupationGroups.forEach(group => {
      urlParams.append('occupation-group', group);
    });
    return urlParams;
  };

  // Generic filter submit handler - only updates state and URL, lets useEffect handle search
  const createFilterSubmitHandler = (
    filterType: 'municipalities' | 'occupation-groups',
    actionType: JobActionTypes,
    getOtherFilterValues: () => string[]
  ) => {
    return (e: CustomEvent) => {
      setTimeout(() => {
        const selectedIds = e.detail?.checked || [];
        
        // Update context
        dispatch({
          type: actionType,
          payload: JSON.stringify(selectedIds)
        });
        
        // Build URL based on filter type - the useEffect will handle the API call
        if (filterType === 'municipalities') {
          const urlParams = buildUrlParams(inputValue, selectedIds, getOtherFilterValues());
          setSearchParams(urlParams);
        } else {
          const urlParams = buildUrlParams(inputValue, getOtherFilterValues(), selectedIds);
          setSearchParams(urlParams);
        }
      }, TIMING.FILTER_EVENT_DELAY);
    };
  };

  // Generic filter reset handler - only updates state and URL, lets useEffect handle search
  const createFilterResetHandler = (
    filterType: 'municipalities' | 'occupation-groups',
    actionType: JobActionTypes,
    getOtherFilterValues: () => string[]
  ) => {
    return () => {
      setTimeout(() => {
        // Clear checkboxes using data attribute - try multiple selectors
        const filter = document.querySelector(`digi-form-filter[data-filter-type="${filterType}"]`) as Element;
        
        if (filter) {
          const checkboxes = filter.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach((checkbox: Element) => {
            const inputElement = checkbox as HTMLInputElement;
            inputElement.checked = false;
          });
        } else {
          // Fallback: try different selector approaches if needed
        }
        
        // Update context
        dispatch({
          type: actionType,
          payload: JSON.stringify([])
        });
        
        // Build URL based on filter type - the useEffect will handle the API call
        if (filterType === 'municipalities') {
          const urlParams = buildUrlParams(inputValue, [], getOtherFilterValues());
          setSearchParams(urlParams);
        } else {
          const urlParams = buildUrlParams(inputValue, getOtherFilterValues(), []);
          setSearchParams(urlParams);
        }
      }, TIMING.FILTER_EVENT_DELAY);
    };
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
        
        <div className="filters-container">
          <DigiFormFilter
            afFilterButtonText='Filtrera på ort'
            afSubmitButtonText='Filtrera'
            afResetButtonText='Återställ'
            afListItems={POPULAR_MUNICIPALITIES}
            data-filter-type="municipalities"
            onAfSubmitFilter={createFilterSubmitHandler(
              'municipalities',
              JobActionTypes.SET_MUNICIPALITIES,
              () => selectedOccupationGroups
            )}
            onAfResetFilter={createFilterResetHandler(
              'municipalities',
              JobActionTypes.SET_MUNICIPALITIES,
              () => selectedOccupationGroups
            )}
          />

          <DigiFormFilter
            afFilterButtonText='Filtrera på yrkesgrupp'
            afSubmitButtonText='Filtrera'
            afResetButtonText='Återställ'
            afListItems={POPULAR_OCCUPATION_GROUPS}
            data-filter-type="occupation-groups"
            onAfSubmitFilter={createFilterSubmitHandler(
              'occupation-groups',
              JobActionTypes.SET_OCCUPATION_GROUPS,
              () => selectedMunicipalities
            )}
            onAfResetFilter={createFilterResetHandler(
              'occupation-groups',
              JobActionTypes.SET_OCCUPATION_GROUPS,
              () => selectedMunicipalities
            )}
          />
        </div>
      </div>
    </form>
  );
};
