import { useState } from "react";
import { 
  LayoutBlockContainer, 
  LayoutBlockVariation,
  BadgeStatusType,
  BadgeStatusVariation,
  BadgeStatusSize,
  CardBorder,
  CardBorderRadius,
  InfoCardType,
  InfoCardVariation,
  InfoCardHeadingLevel,
  LayoutColumnsVariation,
  TagSize,
  TypographyHeadingJumboLevel,
  TypographyHeadingJumboVariation,
  TypographyVariation,
  TypographyTimeVariation,
  TypographyMetaVariation,
  LinkButtonSize,
  LinkButtonVariation,
  UtilBreakpointObserverBreakpoints,
  LayoutContainerVariation,
  LayoutMediaObjectAlignment
} from "@digi/arbetsformedlingen";
import { 
  DigiLayoutBlock, 
  DigiTypography,
  DigiLayoutColumns,
  DigiLayoutMediaObject,
  DigiBadgeStatus,
  DigiCard,
  DigiInfoCard,
  DigiTag,
  DigiTypographyHeadingJumbo,
  DigiTypographyPreamble,
  DigiTypographyTime,
  DigiTypographyMeta,
  DigiLinkButton,
  DigiUtilBreakpointObserver,
  DigiLinkInternal,
  DigiLayoutContainer,
  DigiMediaImage
} from "@digi/arbetsformedlingen-react";
import { useLoaderData } from "react-router";
import type { JobDetail } from "../../api/jobModels";
import { StyledMediaImage } from "../../components/StyledMediaImage";


export const JobDetails = () => {
  const job = useLoaderData() as JobDetail;
  const [columnsVariation, setColumnsVariation] = useState(LayoutColumnsVariation.TWO);

  const handleBreakpointChange = (e: CustomEvent<any>) => { // Vet inte hur jag ska komma förbi 'any' här ???
    const bp = e.detail.value;

    if (bp === UtilBreakpointObserverBreakpoints.SMALL) {
      setColumnsVariation(LayoutColumnsVariation.ONE);
    } else {
      setColumnsVariation(LayoutColumnsVariation.TWO);
    }
  }

  const isDeadlineSoon = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const formatJobDescription = (text: string): string => {
  // Rensa bort eventuella citat-tecken från API
  const cleanText = text.replace(/^"|"$/g, '');
  
  // Detektera om innehållet redan är HTML
  const hasHtmlTags = /<[^>]+>/.test(cleanText);
  
  if (hasHtmlTags) {
    // HTML-innehåll: dekoda HTML-entiteter
    const txt = document.createElement("textarea");
    txt.innerHTML = cleanText;
    return txt.value;
  } else {
    // Ren text: konvertera radbrytningar till HTML
    return cleanText.replace(/\n/g, '<br>');
  }
}



  
  return (
    <>
      {/* Tillbakalänk */}
      <DigiLayoutBlock 
        afVariation={LayoutBlockVariation.PRIMARY} 
        afContainer={LayoutBlockContainer.STATIC}
        afMarginTop
      >
        <DigiLinkInternal
          afHref="/jobsearch"
          hideVisitedColor
        >
          Gå tillbaka till sök
        </DigiLinkInternal>
      </DigiLayoutBlock>


      {/* Hero sektion med jobbtitel */}
      <DigiLayoutBlock 
        afVariation={LayoutBlockVariation.PRIMARY} 
        afContainer={LayoutBlockContainer.STATIC}
        afVerticalPadding={true}
      >
        <DigiTypographyHeadingJumbo 
          afText={job.title}
          afLevel={TypographyHeadingJumboLevel.H1}
          afVariation={TypographyHeadingJumboVariation.PRIMARY}
        />

        <DigiLayoutMediaObject 
          afAlignment={LayoutMediaObjectAlignment.STRETCH} 
        >
          {job.logoUrl && (
            <StyledMediaImage
              slot="media"
              afUnlazy
              afHeight="104"
              afWidth="220"
              afSrc={job.logoUrl}
              afAlt={`${job.employer} logotyp`}
              objectFit="scale-down"
            >
            </StyledMediaImage>
          )}
          
          <DigiLayoutContainer
            afVariation={LayoutContainerVariation.FLUID}
            afNoGutter
          >
            <DigiTypographyMeta afVariation={TypographyMetaVariation.PRIMARY}>
              <DigiTypographyTime 
                afDateTime={job.publicationDate}
                afVariation={TypographyTimeVariation.PRETTY}
              />
              <span slot="secondary">
                {job.city}{job.region && `, ${job.region}`}
              </span>
            </DigiTypographyMeta>
            
            {job.applicationUrl && (
              <div style={{marginTop: 'auto', paddingTop: '1rem'}}>
                <DigiLinkButton 
                  // style={{marginTop: 'auto', paddingTop: '1rem'}}
                  afHref={job.applicationUrl}
                  afVariation={LinkButtonVariation.PRIMARY} 
                  afSize={LinkButtonSize.MEDIUMLARGE}
                  afTarget="_blank"
                >
                  Ansök nu
                </DigiLinkButton>
              </div>
            )}
          </DigiLayoutContainer>
        </DigiLayoutMediaObject>
      </DigiLayoutBlock>

      
      {/* Jobbinformation i kort */}
      <DigiLayoutBlock 
        afVariation={LayoutBlockVariation.SECONDARY} 
        afContainer={LayoutBlockContainer.STATIC}
        afVerticalPadding={true}
      >
        <DigiUtilBreakpointObserver onAfOnChange={handleBreakpointChange}>
          <DigiLayoutColumns afVariation={columnsVariation}>
            <DigiInfoCard
              afHeading="Anställningsdetaljer"
              afHeadingLevel={InfoCardHeadingLevel.H3}
              afType={InfoCardType.TIP}
              afVariation={InfoCardVariation.SECONDARY}
            >
              {job.occupation && (
                <p>
                  <strong>Yrke:</strong> {job.occupation}
                </p>
              )}
              {job.employmentType && (
                <p>
                  <DigiBadgeStatus 
                    afText={job.employmentType}
                    afType={BadgeStatusType.APPROVED}
                    afVariation={BadgeStatusVariation.SECONDARY}
                    afSize={BadgeStatusSize.SMALL}
                  />
                </p>
              )}
              {job.workingHours && (
                <p>
                  <strong>Arbetstid:</strong> {job.workingHours}
                </p>
              )}
              {job.duration && (
                <p>
                  <strong>Varaktighet:</strong> {job.duration}
                </p>
              )}
            </DigiInfoCard>

            <DigiInfoCard
              afHeading="Villkor & Ansökan"
              afHeadingLevel={InfoCardHeadingLevel.H3}
              afType={InfoCardType.TIP}
              afVariation={InfoCardVariation.SECONDARY}
            >
              {job.salary && (
                <p>
                  <strong>Lön:</strong> {job.salary}
                </p>
              )}
              {job.deadline && (
                <p>
                  <strong>Sista ansökningsdag:</strong><br />
                  <DigiTypographyTime 
                    afDateTime={job.deadline}
                    afVariation={TypographyTimeVariation.PRETTY}
                  />
                  <span> </span>
                  {isDeadlineSoon(job.deadline) && (
                    <DigiTag 
                      afText="Snart deadline!" 
                      afSize={TagSize.SMALL}
                      afNoIcon={true}
                    />
                  )}
                </p>
              )}
              {job.deadline && isDeadlineSoon(job.deadline) && (
                <DigiBadgeStatus 
                  afText="Ansök snart!"
                  afType={BadgeStatusType.MISSING}
                  afVariation={BadgeStatusVariation.PRIMARY}
                  afSize={BadgeStatusSize.LARGE}
                />
              )}
            </DigiInfoCard>
          </DigiLayoutColumns>
        </DigiUtilBreakpointObserver>
      </DigiLayoutBlock>


      {/* Jobbeskrivning */}
      <DigiLayoutBlock 
        afVariation={LayoutBlockVariation.PRIMARY} 
        afContainer={LayoutBlockContainer.STATIC}
        afVerticalPadding
      >
        <DigiCard
          afBorder={CardBorder.PRIMARY}
          afBorderRadius={CardBorderRadius.PRIMARY}
        >
          <DigiTypography afVariation={TypographyVariation.SMALL}>
            <h2>Om tjänsten</h2>
            <DigiTypographyPreamble>
              {job.occupation && `${job.occupation} hos ${job.employer}`}
              {job.city && ` i ${job.city}`}
            </DigiTypographyPreamble>
            <div 
              dangerouslySetInnerHTML={{ __html: formatJobDescription(job.descriptionFormatted) }}
            />
          </DigiTypography>

          
          {job.applicationUrl && (
            <div slot="footer">
              <DigiLinkButton 
                afHref={job.applicationUrl}
                afVariation={LinkButtonVariation.PRIMARY} 
                afSize={LinkButtonSize.LARGE}
                afFullwidth={false}
                af-hide-icon={true}
                afTarget="_blank"
              >
                Skicka ansökan
              </DigiLinkButton>
            </div>
          )}
        </DigiCard>
      </DigiLayoutBlock>


      {/* Footer med metadata */}
      <DigiLayoutBlock 
        afVariation={LayoutBlockVariation.SECONDARY} 
        afContainer={LayoutBlockContainer.STATIC}
        afVerticalPadding={true}
      >
        <DigiInfoCard
          afHeading="Annonsinformation"
          afHeadingLevel={InfoCardHeadingLevel.H4}
          afType={InfoCardType.RELATED}
        >
          <p>
            <strong>Publicerad:</strong> 
            <DigiTypographyTime 
              afDateTime={job.publicationDate}
              afVariation={TypographyTimeVariation.DISTANCE}
            />
          </p>
          <p>
            <strong>Annons-ID:</strong> {job.id}
          </p>
        </DigiInfoCard>
      </DigiLayoutBlock>
    </>
  );
};