import headerLogo from '../assets/logo-blue-big.svg';

import { 
  DigiNavigationSidebarButton,
  DigiLayoutMediaObject,
  DigiLayoutContainer,
  DigiMediaImage,
  DigiLayoutBlock
} from '@digi/arbetsformedlingen-react';

import { 
  LayoutMediaObjectAlignment,
} from '@digi/arbetsformedlingen';

export const Header = () => {
  return (
    <>
      <DigiLayoutBlock>
        <div>
          <DigiLayoutMediaObject afAlignment={LayoutMediaObjectAlignment.CENTER}
            >
              <DigiMediaImage slot="media"       
              afUnlazy
              afHeight="50"
              afWidth="50"
              afSrc={headerLogo}
              afAlt="JobbBankens logotyp"
              >
              </DigiMediaImage>
            <h1>JobbBanken</h1>
          </DigiLayoutMediaObject>
        </div>
        <div>
          <DigiNavigationSidebarButton 
            afText="Meny">
          </DigiNavigationSidebarButton>
        </div>
      </DigiLayoutBlock>
    </>
  );
};





/*
    <DigiMediaImage
      afUnlazy
      afHeight="300"
      afWidth="300"
      afSrc='/assets/images/logo-blue-big.svg'
      afAlt="JobbBankens logotyp"
    >
    </DigiMediaImage>

        afSystemName="Designsystem"

              afVariation={LayoutContainerVariation.FLUID}

                    <DigiLayoutContainer afVerticalPadding slot="default">
          <h1>JobbBanken</h1>
        <DigiLayoutMediaObject
          afAlignment={LayoutMediaObjectAlignment.START}>
          <h1>JobbBanken</h1>
          <DigiMediaImage slot="media"       
            afUnlazy
            afHeight="300"
            afWidth="300"
            afSrc='/assets/images/logo-blue-big.svg'
            afAlt="JobbBankens logotyp"
          >
          </DigiMediaImage>
            ...  
        </DigiLayoutMediaObject>
      </DigiLayoutContainer>



      

      <DigiLayoutBlock>
<DigiLayoutMediaObject
  >
            <DigiMediaImage slot="media"       
            afUnlazy
            afHeight="44"
            afWidth="44"
            afSrc='/assets/images/logo-blue-big.svg'
            afAlt="JobbBankens logotyp"
          >
  </DigiMediaImage>
</DigiLayoutMediaObject>
        <DigiTypography>
        <h2>JobbBanken</h2>
        </DigiTypography>
      </DigiLayoutBlock>
    */