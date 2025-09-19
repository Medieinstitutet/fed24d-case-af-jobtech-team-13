import { DigiLayoutContainer, DigiTypography } from '@digi/arbetsformedlingen-react';
import { SearchForm } from './SearchForm';

export const SearchSection = () => {
  return (
    <section className="search-section">
      <DigiLayoutContainer afVerticalPadding>
        <DigiTypography>
          <header className="search-header">
            <h1 className="search-title">
              Hitta ditt nästa jobb
            </h1>
            <p className="search-subtitle">
              Sök bland tusentals lediga jobb
            </p>
          </header>
        </DigiTypography>

        <SearchForm />

        <div className="search-filters">
        </div>
      </DigiLayoutContainer>
    </section>
  );
};
