import { 
  DigiTypography,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiLinkButton,
  //DigiLayoutMediaObject,
  //DigiMediaImage
} from '@digi/arbetsformedlingen-react';

import { 

  //LayoutMediaObjectAlignment,
  TypographyVariation,
  LinkButtonSize,
  LinkButtonVariation,
  LayoutBlockVariation
} from '@digi/arbetsformedlingen';

export const Home = () => {
  return (
    <>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.PROFILE} af-vertical-padding>
        <DigiTypography afVariation={TypographyVariation.LARGE}>
        <h1>JobbBanken</h1>
        <h2>
          Ditt nästa jobb, närmare än du tror
        </h2>
        </DigiTypography>

      </DigiLayoutBlock>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY} af-margin-top af-margin-bottom af-vertical-padding>
        <DigiTypography>
        <h2>Vad är JobbBanken?</h2>
        <p>
          JobbBanken är en hemsida där vi lägger ut annonser från företag i alla branscher.
          Vi ger dig möjligheten att söka efter det yrke som passar dig, där du är nu!
          </p>
        <p>Ditt nästa jobb, närmare än du tror! </p>
        </DigiTypography>

        <div>
          <DigiLinkButton
            afHref="/jobsearch"
            afSize={LinkButtonSize.LARGE}
            afVariation={LinkButtonVariation.PRIMARY}
            >
            Sök jobb nu!
          </DigiLinkButton>
        </div>
        <DigiLayoutContainer afVerticalPadding>

        </DigiLayoutContainer>
      </DigiLayoutBlock>
    </>
  );
};