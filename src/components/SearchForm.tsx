import { useState } from 'react';
import { useJobs } from '../contexts/JobContext';
import { jobService } from '../api/jobService';
import { DigiFormInputSearch} from '@digi/arbetsformedlingen-react';
import { 
  FormInputType,
  FormInputSearchVariation,
} from '@digi/arbetsformedlingen';

export const SearchForm = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    setJobs, 
    setLoading, 
    setError, 
    setTotalResults,
    loading,
  } = useJobs();

  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    setSearchQuery(inputValue);
    setLoading(true);
    setError(null);
    
    try {
      const result = await jobService.searchJobs({ q: inputValue });
      
      setJobs(result.hits);
      setTotalResults(result.total);
      
    } catch (err) {
      console.error('Search error:', err);
      setError('Något gick fel vid sökningen. Försök igen.');
    } finally {
      setLoading(false);
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

      {loading && (
        <div className="loading-alert">
          Söker jobb...
        </div>
      )}
    </form>
  );
};
