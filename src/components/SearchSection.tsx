import { SearchForm } from './SearchForm';
import { DigiLayoutContainer } from '@designsystem-se/af-react';

export const SearchSection = () => {
  return (
    <section className="search-section">
      <DigiLayoutContainer afMarginBottom>
        <header className="search-header">
          <h1 className="search-title">
            Hitta ditt nästa jobb
          </h1>
          <p className="search-subtitle">
            Sök bland tusentals lediga jobb
          </p>
        </header>

        <SearchForm />

        <div className="search-filters">
        </div>
      </DigiLayoutContainer>
    </section>
  );
};
