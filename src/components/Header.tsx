import headerLogo from '../assets/logo-blue-big.svg';

import { 
  DigiNavigationSidebarButton,
  DigiLayoutMediaObject,
  DigiToolsLanguagepicker,
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
          <DigiToolsLanguagepicker
          afLanguagepickerText="Språk"
          afSignlangHide={true}
          afLanguagepickerItems='[{"index":0,"type":"button","text":"العربية (Arabiska)","lang":"ar","value":"ar","dir":"rtl"},{"index":1,"type":"button","text":"دری (Dari)","lang":"prs","value":"prs","dir":"rtl"},{"index":2,"type":"button","text":"به پارسی (Persiska)","lang":"fa","value":"fa","dir":"rtl"},{"index":3,"type":"button","text":"English (Engelska)","lang":"en","value":"en","dir":"ltr"},{"index":4,"type":"button","text":"Русский (Ryska)","lang":"ru","value":"ru","dir":"ltr"},{"index":5,"type":"button","text":"Af soomaali (Somaliska)","lang":"so","value":"so","dir":"ltr"},{"index":6,"type":"button","text":"Svenska","lang":"sv","value":"sv","dir":"ltr"},{"index":7,"type":"button","text":"ትግርኛ (Tigrinska)","lang":"ti","value":"ti","dir":"ltr"}]'
          />
        </div>
      </DigiLayoutBlock>
    </>
  );
};