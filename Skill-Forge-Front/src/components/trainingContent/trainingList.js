import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import tw from 'twin.macro';
import styled, { css } from 'styled-components/macro';
import { Container, ContentWithPaddingXl } from 'components/misc/Layouts.js';
import { SectionHeading } from 'components/misc/Headings.js';
import { ReactComponent as SvgDecoratorBlob1 } from 'images/svg-decorator-blob-5.svg';
import { ReactComponent as SvgDecoratorBlob2 } from 'images/svg-decorator-blob-7.svg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FiCalendar, FiTag, FiCheckCircle } from 'react-icons/fi';
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import ProgressBar from './progressBar';
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Headers = tw(SectionHeading)`text-primary-500`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 justify-center`;

const Card = tw(motion.div)`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200`;
const CardImageContainer = styled.div`
  ${(props) =>
    props.imageSrc &&
    css`
      background-image: url('${props.imageSrc}');
    `}
  ${tw`h-40 bg-center bg-cover`}
`;

const CardText = tw.div`p-4`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardInfo = tw.div`flex items-center text-sm text-gray-600 mb-2`;
const IconWrapper = tw.span`mr-2 flex items-center text-primary-500`;
const CardContent = tw.p`text-gray-700`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;

const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({ heading = 'All Training Contents' }) => {
  const [trainingContents, setTrainingContents] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTrainingContents = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/trainingContent/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTrainingContents(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchTrainingContents();
  }, [token]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Not specific';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <AnimationRevealPage>
     <Header />
      <Container style={{ paddingRight: '30px' }}>
        <ContentWithPaddingXl>
          <HeaderRow>
            <Headers>{heading}</Headers>
          </HeaderRow>
          <TabContent>
            {trainingContents.map((trainingContent) => (
              <CardContainer key={trainingContent._id}>
                <a href={`/TrainingDetails/${trainingContent._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card
                    className="group"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    style={{ margin: '10px' }} // Add margin between the cards
                  >
                    <CardImageContainer
                      imageSrc={trainingContent.image ? `http://localhost:5000/${trainingContent.image.replace(/\\/g, '/')}` : ''}
                    />
                    <CardText>
                      <CardTitle>{trainingContent.title}</CardTitle>
                      <CardInfo>
                        <IconWrapper><FiTag /></IconWrapper>
                        <CardContent>{trainingContent.category}</CardContent>
                      </CardInfo>
                      <CardInfo>
                        <IconWrapper><FiCheckCircle /></IconWrapper>
                        <CardContent>Status: {trainingContent.status}</CardContent>
                      </CardInfo>
                      {/* <CardInfo>
                        <IconWrapper><FiCalendar /></IconWrapper>
                        <CardContent>Deadline: {formatDate(trainingContent.endDate)}</CardContent>
                      </CardInfo> */}
                    </CardText>
                    <ProgressBar trainingId={trainingContent._id} />
                  </Card>
                </a>
              </CardContainer>
            ))}
          </TabContent>
        </ContentWithPaddingXl>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
      <Footer />
      </AnimationRevealPage>
    </>
  );
};
