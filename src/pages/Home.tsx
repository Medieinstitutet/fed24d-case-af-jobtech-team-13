import { 
  DigiTypography,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiLinkButton,
  DigiInfoCardMultiContainer,
  DigiInfoCardMulti
} from '@digi/arbetsformedlingen-react';

import { 
  InfoCardMultiHeadingLevel,
  TypographyVariation,
  LinkButtonSize,
  LinkButtonVariation,
  LayoutBlockVariation,
  InfoCardMultiType
} from '@digi/arbetsformedlingen';

export const Home = () => {
  return (
    <>
      <DigiLayoutBlock afVariation={LayoutBlockVariation.PROFILE} af-vertical-padding>
        <DigiTypography afVariation={TypographyVariation.LARGE} className="title">
          <h1>JobbBanken</h1>
          <h2>
            Ditt nästa jobb, närmare än du tror
          </h2>
        </DigiTypography>
      </DigiLayoutBlock>
        <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY} af-margin-top af-margin-bottom af-vertical-padding>
          <DigiLayoutContainer afVerticalPadding>
            <DigiTypography className="intro-text">
              <h2>Vad är JobbBanken?</h2>
          </DigiTypography>
          <DigiTypography className="intro-text-paragraph">
            <p>
            JobbBanken är en hemsida där vi lägger ut annonser från företag i alla branscher.
            Vi ger dig möjligheten att söka efter det yrke som passar dig, där du är nu!
            </p>
            <p>Ditt nästa jobb, närmare än du tror! </p>
        </DigiTypography>
        </DigiLayoutContainer>
        <DigiLayoutContainer afVerticalPadding className="landing-pg-btns">
          <DigiLinkButton
            className="about-us-btn"
            afHref="#"
            afSize={LinkButtonSize.LARGE}
            afVariation={LinkButtonVariation.PRIMARY}
            >
            Om oss
          </DigiLinkButton>
          <DigiLinkButton
            className="jobsearch-btn"
            afHref="/jobsearch"
            afSize={LinkButtonSize.LARGE}
            afVariation={LinkButtonVariation.PRIMARY}
            >
            Sök jobb nu!
          </DigiLinkButton>
          <DigiLinkButton
            className="contact-btn"
            afHref="#"
            afSize={LinkButtonSize.LARGE}
            afVariation={LinkButtonVariation.PRIMARY}
            >
            Kontakt
          </DigiLinkButton>       
        </DigiLayoutContainer>
        <DigiLayoutContainer afVerticalPadding>

        </DigiLayoutContainer>
        <DigiLayoutContainer afVerticalPadding>
          <DigiInfoCardMultiContainer >
            <DigiInfoCardMulti
              afHeading="Arbetslös, vad händer nu?"
              afHeadingLevel={InfoCardMultiHeadingLevel.H2}
              afType={InfoCardMultiType.RELATED}
              afLinkHref="/"
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse commodo egestas elit in consequat. Proin in ex
                  consectetur, laoreet augue sit amet, malesuada tellus.
                </p>
            </DigiInfoCardMulti>
            <DigiInfoCardMulti
              afHeading="CV, personligt brev och ansökan"
              afHeadingLevel={InfoCardMultiHeadingLevel.H2}
              afType={InfoCardMultiType.RELATED}
              afLinkHref="/"
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse commodo egestas elit in consequat. Proin in ex
                  consectetur, laoreet augue sit amet, malesuada tellus.
                </p>
            </DigiInfoCardMulti>
            <DigiInfoCardMulti
              afHeading="Yrken och framtid"
              afHeadingLevel={InfoCardMultiHeadingLevel.H2}
              afType={InfoCardMultiType.RELATED}
              afLinkHref="/"
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse commodo egestas elit in consequat. Proin in ex
                  consectetur, laoreet augue sit amet, malesuada tellus.
                </p>
            </DigiInfoCardMulti>
          </DigiInfoCardMultiContainer>
        </DigiLayoutContainer>
      </DigiLayoutBlock>
    </>
  );
};