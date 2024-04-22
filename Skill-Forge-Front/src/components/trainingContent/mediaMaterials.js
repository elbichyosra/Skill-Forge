import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from 'components/headers/light.js';
import Footer from 'components/footers/FiveColumnWithInputForm.js';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import { useParams } from 'react-router-dom';
import { Container, ContentWithPaddingXl } from 'components/misc/Layouts.js';
import { ReactComponent as ChevronDownIcon } from 'feather-icons/dist/icons/chevron-down.svg';
import { ReactComponent as PdfIcon } from 'feather-icons/dist/icons/file-text.svg';
import { ReactComponent as VideoIcon } from 'feather-icons/dist/icons/video.svg';

import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";

import { LuTimer } from "react-icons/lu"; 

const Info = tw.div`flex items-center text-xs text-gray-600 mb-2`;
const Card = tw.div`border rounded-lg bg-white shadow-md `;
const CardBody = tw.div`p-6`;
const CardTitle = tw.h2`text-xl font-semibold text-center`;
const Subheading = tw.h2`text-lg font-semibold text-primary-500 mt-6`;

const Description = tw.p`w-full text-center`;

const Column = tw.div`flex flex-col md:flex-row items-start`;
const LeftSection = tw.div`md:w-1/3`;
const RightSection = tw.div`md:w-2/3 min-h-[300px]`;

const FAQSContainer = tw.dl`mt-8 max-w-4xl`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Title = tw.dt`flex justify-between items-center cursor-pointer`;
const Text = tw.span`text-lg lg:text-sm font-semibold`;
const TitleToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);

const SubTitle = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);
const File = tw.div`mt-5`;
const FileTitle = tw.h2`text-xl font-semibold flex items-center`;
const FileTypeIcon = tw.span`mr-2`;
const FileDescription = tw.p`mt-2  text-gray-700`;
const FileMedia = tw.div`mt-4 rounded-lg overflow-hidden`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  ${tw`mr-2`}
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default () => {
  const [activeTitleIndex, setActiveTitleIndex] = useState(null);
  const [mediaMaterials, setMediaMaterials] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();

  useEffect(() => {
    const fetchMediaMaterials = async () => {
      if (token && id) {
        try {
          const response = await axios.get(`http://localhost:5000/mediaMaterial/getByTraining/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          // Add 'isChecked' property to each mediaMaterial
          const mediaWithCheckboxes = response.data.map(media => ({ ...media, isChecked: false }));
          setMediaMaterials(mediaWithCheckboxes);
        } catch (error) {
          console.error('Error fetching media material:', error);
        }
      }
    };
    fetchMediaMaterials();
  }, [token, id]);

  const handleCheckboxChange = (index) => {
    setMediaMaterials(prevState =>
      prevState.map((media, i) =>
        i === index ? { ...media, isChecked: !media.isChecked } : media
      )
    );
  };

  const handleVideoEnded = (index) => {
    setMediaMaterials(prevState =>
      prevState.map((media, i) =>
        i === index && media.file.includes('.mp4') ? { ...media, isChecked: true } : media
      )
    );
  };

  const handleTitleClick = (index) => {
    setMediaMaterials(prevState =>
      prevState.map((media, i) =>
        i === index && media.file.includes('.pdf') ? { ...media, isChecked: !media.isChecked } : media
      )
    );
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <Column>
            <LeftSection>
              <Card>
                <CardBody>
                  <Subheading>Available Courses</Subheading>
                  <FAQSContainer>
                    {mediaMaterials.map((mediaMaterial, index) => (
                      <FAQ
                        key={index}
                        onClick={() => {
                          setActiveTitleIndex(activeTitleIndex === index ? null : index);
                        }}
                        className="group"
                      >
                        <Title onClick={() => handleTitleClick(index)}>
                          <Text>{mediaMaterial.title}</Text>
                          <TitleToggleIcon
                            variants={{
                              collapsed: { rotate: 0 },
                              open: { rotate: -180 }
                            }}
                            initial="collapsed"
                            animate={activeTitleIndex === index ? 'open' : 'collapsed'}
                            transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                          >
                            <ChevronDownIcon />
                          </TitleToggleIcon>
                        </Title>
                        <SubTitle
                          variants={{
                            open: { opacity: 1, height: 'auto', marginTop: '16px' },
                            collapsed: { opacity: 0, height: 0, marginTop: '0px' }
                          }}
                          initial="collapsed"
                          animate={activeTitleIndex === index ? 'open' : 'collapsed'}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <div tw='flex justify-between items-center'>
                            <Info>
                              <FileTypeIcon>
                                {mediaMaterial.file.includes('.pdf') ? (
                                  <PdfIcon width="20" height="20" />
                                ) : mediaMaterial.file.includes('.mp4') ? (
                                  <VideoIcon width="20" height="20" />
                                ) : null}
                              </FileTypeIcon>
                              {mediaMaterial.title}
                            </Info>
                            <Checkbox
                              checked={mediaMaterial.isChecked}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </div>
                          <Info>
                            <FileTypeIcon>
                              <LuTimer size={20} />
                            </FileTypeIcon>
                            {mediaMaterial.duration}
                          </Info>
                        </SubTitle>
                      </FAQ>
                    ))}
                  </FAQSContainer>
                </CardBody>
              </Card>
            </LeftSection>
            <RightSection>
              <Card>
                <CardBody>
                  {activeTitleIndex !== null ? (
                    <File>
                      <FileTitle>
                        {/* <FileTypeIcon>
                          {mediaMaterials[activeTitleIndex].file.includes('.pdf') ? (
                            <PdfIcon />
                          ) : mediaMaterials[activeTitleIndex].file.includes('.mp4') ? (
                            <VideoIcon />
                          ) : null}
                        </FileTypeIcon> */}
                        {mediaMaterials[activeTitleIndex].title}
                      </FileTitle>
                      {mediaMaterials[activeTitleIndex].file.includes('.pdf') ? (
                        <FileMedia>
                          <embed src={`http://localhost:5000/${mediaMaterials[activeTitleIndex].file}`} type="application/pdf" width="100%" height="600px" />
                        </FileMedia>
                      ) : mediaMaterials[activeTitleIndex].file.includes('.mp4') ? (
                        <FileMedia>
                          <video
                            controls
                            src={`http://localhost:5000/${mediaMaterials[activeTitleIndex].file}`}
                            className="img-fluid rounded"
                            style={{ maxHeight: '300px', width: '100%' }}
                            onEnded={() => handleVideoEnded(activeTitleIndex)}
                          />
                        </FileMedia>
                      ) : null}
                      <div>
                        <Subheading>Description</Subheading>
                        <FileDescription>{mediaMaterials[activeTitleIndex].description}</FileDescription>
                      </div>
                    </File>
                  ) : (
                    <Description>Select a training module to view details</Description>
                  )}
                </CardBody>
              </Card>
            </RightSection>
          </Column>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </AnimationRevealPage>
  );
};
