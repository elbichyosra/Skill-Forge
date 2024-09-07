import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { FiMapPin, FiMail } from 'react-icons/fi'; // Import the icons
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import LogoImage from "images/Skill__21.png";
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";

const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-8 py-20 lg:py-10`;
const Content = tw.div`max-w-screen-xl mx-auto relative z-10 text-center`;

const Divider = tw.div`my-16 border-b-2 border-gray-300 w-full`;

const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-xl font-black tracking-wider text-gray-800`;

const CopywrightNotice = tw.p`text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-500`;

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-700 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const TextSection = tw.div`max-w-2xl mx-auto mb-2`;
const Text = tw.p`text-lg leading-relaxed`;

const ContactInfo = tw.div`mt-4 text-gray-600 flex flex-col items-center space-y-2`;

const IconText = styled.div`
  ${tw`flex items-center space-x-2`}
  svg {
    ${tw`w-5 h-5 text-gray-600`}
  }
`;

export default () => {
  return (
    <Container>
      <Content>
        <TextSection>
          <Text>
            Join us and make your company a better place.
          </Text>
          <ContactInfo>
            <IconText>
              <FiMapPin />
              <span>El Ghazella, Raoued street, Ariana, 2088 Tunisia</span>
            </IconText>
            <IconText>
              <FiMail />
              <span>skillforge24@gmail.com</span>
            </IconText>
          </ContactInfo>
        </TextSection>
        
        <Divider />

        <ThreeColRow>
          <LogoContainer>
            <LogoImg src={LogoImage} />
            <LogoText>Skill Forge.</LogoText>
          </LogoContainer>
          <CopywrightNotice>&copy; 2024 Skill Forge Inc. All Rights Reserved.</CopywrightNotice>
          <SocialLinksContainer>
            <SocialLink href="https://www.facebook.com/ciamsolutions">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/ciam-solutions/">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="https://www.youtube.com/channel/UCdv9bPhLF1znRGctVvDqiUA">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
        </ThreeColRow>
      </Content>
    </Container>
  );
};
