import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { Container as ContainerBase, ContentWithPaddingXl } from "components/misc/Layouts";

// Importing icons (you can replace with actual icons)
import { FaTachometerAlt, FaSyncAlt, FaBolt, FaLock } from "react-icons/fa"; // Example icons

const Container = tw(ContainerBase)`my-8 lg:my-10 bg-primary-900 text-gray-100 -mx-8 px-8`;
const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)`sm:text-3xl md:text-4xl lg:text-5xl text-center`;
const Description = tw.div`text-gray-400 text-center mx-auto max-w-screen-md`;

const StatsContainer = tw.div`mt-8 flex flex-col sm:flex-row items-center justify-center flex-wrap max-w-screen-md justify-between mx-auto`;
const Stat = tw.div`flex flex-col items-center text-center p-4 tracking-wide`;
const IconWrapper = tw.div`p-4 bg-gray-200 rounded-full mb-4 text-primary-900`; // Adjust icon wrapper style
const StatKey = tw.div`text-xl font-medium`;
const StatValue = tw.div`text-lg font-bold text-green-500`; // Color matching the green text in the image

export default ({
  heading = "What makes us special?",
  stats = [
    {
      key: "Performance",
      icon: <FaTachometerAlt size={32} />,
    },
    {
      key: "High availability",
      icon: <FaSyncAlt size={32} />,
    },
    {
      key: "Rapidity",
      icon: <FaBolt size={32} />,
    },
    {
      key: "Security",
      icon: <FaLock size={32} />,
    },
  ]
}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          <Heading>{heading}</Heading>
        </HeadingContainer>
        <StatsContainer>
          {stats.map((stat, index) => (
            <Stat key={index}>
              <IconWrapper>{stat.icon}</IconWrapper>
              <StatKey>{stat.key}</StatKey>
              {/* <StatValue>{stat.key === "High availability" ? "Hight availability" : ""}</StatValue> */}
            </Stat>
          ))}
        </StatsContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
