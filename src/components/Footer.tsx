import footerLogo from '../assets/logo-white-big.svg';

import { 
  DigiFooter,
  DigiFooterCard,
  DigiIconAccessibilityUniversal,
  DigiIconSign,
  DigiIconGlobe,
  DigiIconEnvelope,
  DigiTypography,
  DigiLayoutMediaObject,
  DigiMediaImage
} from '@digi/arbetsformedlingen-react';

import { 
  FooterVariation,
  FooterCardVariation,
  LayoutMediaObjectAlignment
} from '@digi/arbetsformedlingen';


export const Footer = () => {
  return (
    <>
      <DigiFooter afVariation={FooterVariation.SMALL}>
        <div slot="content-top">
          <div>
            <DigiFooterCard afType={FooterCardVariation.ICON}>
              <ul>
                <li>
                  <a href="#">
                    <DigiIconAccessibilityUniversal></DigiIconAccessibilityUniversal>
                    Tillgänglighetsredogörelse
                  </a>
                </li>
                <li>
                  <a href="#">
                    <DigiIconSign></DigiIconSign>
                    Teckenspråk
                  </a>
                </li>
                <li>
                  <a href="#">
                    <DigiIconGlobe></DigiIconGlobe>
                    Other languages
                  </a>
                </li>
                <li>
                  <a href="#">
                    <DigiIconEnvelope></DigiIconEnvelope>
                    Mejla vår funktionbrevlåda
                  </a>
                </li>
              </ul>
            </DigiFooterCard>
          </div>
        <div>
            <DigiFooterCard afType={FooterCardVariation.BORDER}
            >
              <a href="#">Om JobbBanken</a>
              <p>JobbBanken hjälper dig att hitta ditt nästa jobb! Läs mer här.</p>
            </DigiFooterCard>
          </div>
          <div>
            <DigiFooterCard afType={FooterCardVariation.BORDER}>
              <a href="#">Kontakta JobbBanken</a>
              <p>Telefon: xxxx-xx xxxx <br/> Öppettider: Vardagar 08:00-16:30</p>
            </DigiFooterCard>
          </div>
        </div>
        <div slot="content-bottom-left">
          <DigiLayoutMediaObject afAlignment={LayoutMediaObjectAlignment.START}
          >
            <DigiMediaImage slot="media"       
            afUnlazy
            afHeight="50"
            afWidth="50"
            afSrc={footerLogo}
            afAlt="JobbBankens logotyp"
            >
            </DigiMediaImage>
            <DigiTypography className="footerLogoText">
              <h1>JobbBanken</h1>
            </DigiTypography>
          </DigiLayoutMediaObject>
        </div>

        <div slot="content-bottom-right">
          <p>Följ oss på</p>
          <a href="#">Facebook</a>
          <a href="#">Youtube</a>
          <a href="#">Linkedin</a>
          <a href="#">Instagram</a>
        </div>
      </DigiFooter>
    </>
  );
};
