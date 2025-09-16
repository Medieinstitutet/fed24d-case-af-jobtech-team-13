import { useState } from 'react';
import { useJobs } from '../contexts/JobContext';
import { jobService } from '../api/jobService';
import { FormInputSearchVariation, FormInputType } from '@digi/arbetsformedlingen';
import { DigiFormInputSearch} from '@digi/arbetsformedlingen-react';
import { JobActionTypes } from '../reducers/jobReducer';

export const SearchForm = () => {

  const { searchQuery, dispatch } = useJobs();
  const [inputValue, setInputValue] = useState(searchQuery);
  
  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Start search
    dispatch({
      type: JobActionTypes.SEARCH_START,
      payload: inputValue
    });

    try {
      const result = await jobService.searchJobs({ q: inputValue });

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
          }}
          onAfOnClick={() => handleSearch()}
        >
        </DigiFormInputSearch>
      </div>
    </form>
  );
};
