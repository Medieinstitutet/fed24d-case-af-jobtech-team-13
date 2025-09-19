import headerLogo from '../assets/logo-blue-big.svg';

import { 
  DigiLayoutMediaObject,
  DigiLayoutContainer,
  DigiMediaImage,
  DigiHeader,
} from '@digi/arbetsformedlingen-react';

import { 
  LayoutMediaObjectAlignment,
} from '@digi/arbetsformedlingen';

export const Header = () => {
  return (
    <>
<div className="header">
	<DigiLayoutContainer afVerticalPadding afNoGutter className="headerLogo">
		<DigiLayoutMediaObject afAlignment={LayoutMediaObjectAlignment.CENTER}
		>
			<DigiMediaImage slot="media"       
			afUnlazy
			afHeight="60"
			afWidth="60"
			afSrc={headerLogo}
			afAlt="JobbBankens logotyp"
			>
			</DigiMediaImage>
		</DigiLayoutMediaObject>
	
	</DigiLayoutContainer> 
	<DigiHeader
	afSystemName="JobbBanken"
	afHideSystemName={false}
	afMenuButtonText="Meny"
	className="header"
	>
	</DigiHeader>
</div>
    </>
  );
};
