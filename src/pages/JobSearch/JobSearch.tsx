import { LayoutBlockVariation } from '@digi/arbetsformedlingen';
import { SearchSection } from '../../components/SearchSection';
import { DigiLayoutBlock} from '@digi/arbetsformedlingen-react';

export const JobSearch = () => {
  return (
    <>
    <DigiLayoutBlock 
    afVariation={LayoutBlockVariation.PRIMARY}
    >
      <SearchSection />
    </DigiLayoutBlock>
    </>
  );
};