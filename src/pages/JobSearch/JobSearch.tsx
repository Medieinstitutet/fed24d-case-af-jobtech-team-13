import { LayoutBlockVariation } from '@designsystem-se/af';
import { SearchSection } from '../../components/SearchSection';
import { DigiLayoutBlock} from '@designsystem-se/af-react';

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