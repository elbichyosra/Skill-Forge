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
import Quiz from './quiz';

const Info = tw.div`flex items-center text-xs text-gray-600 mb-2`;
const Card = tw.div`border rounded-lg bg-white shadow-md `;
const CardBody = tw.div`p-6`;
const CardTitle = tw.h2`text-xl font-semibold text-center`;
const Subheading = tw.h2`text-lg font-semibold text-primary-500 mt-6`;
const Description = tw.p`w-full text-center`;
const Column = tw.div`flex flex-col md:flex-row items-start `;
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
const File = tw.div`mt-1`;
const FileTitle = tw.h2`text-xl font-semibold flex items-center mb-12`;
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

const MediaMaterials = () => {
  const [activeTitleIndex, setActiveTitleIndex] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mediaMaterials, setMediaMaterials] = useState([]);
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [quizId, setQuizId] = useState(null); // État pour stocker le quizId
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
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
        
          const mediaWithCheckboxes = response.data.map(media => ({
            ...media,
            isChecked: media.checkedByUser.some(user => user.userId === userId && user.isChecked)
          }));
          setMediaMaterials(mediaWithCheckboxes);

          // Appel pour récupérer le quiz associé au trainingId
          const quizResponse = await axios.get(`http://localhost:5000/quiz/byTrainingContent/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (quizResponse.data) {
            setQuizId(quizResponse.data._id);
            // Vérifiez si le quiz a été complété
            const isCompleted = await fetchCompletionStatus(userId, quizResponse.data._id);
            setCompletedQuiz(isCompleted);
          }
        } catch (error) {
          console.error('Error fetching media material:', error);
        }
      }
    };

    fetchMediaMaterials();
  }, [token, id, userId]);

  const handleVideoEnded = async (mediaId) => {
    try {
      setMediaMaterials(prevState =>
        prevState.map(media =>
          media._id === mediaId && media.file.includes('.mp4') ? { ...media, isChecked: true } : media
        )
      );

      await axios.put(`http://localhost:5000/mediaMaterial/updateCheckboxState/${mediaId}`, {
        userId,
        isChecked: true
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error updating video checkbox state:', error);
    }
  };

  const handleTitleClick = async (mediaId) => {
    try {
      const updatedMaterials = mediaMaterials.map(media => {
        if (media._id === mediaId && media.file.includes('.pdf')) {
          media.isChecked = true;
          axios.put(`http://localhost:5000/mediaMaterial/updateCheckboxState/${mediaId}`, {
            userId,
            isChecked: true
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return media;
      });
      setMediaMaterials(updatedMaterials);
    } catch (error) {
      console.error('Error updating PDF checkbox state:', error);
    }
  };

  const handleShowQuiz = () => {
    setShowQuiz(true);
    setActiveTitleIndex('quiz');
  };

  const fetchCompletionStatus = async (userId, quizId) => {
    try {
      const response = await axios.get(`http://localhost:5000/quiz/quiz/completion-status/${userId}`, {
        params: { quizId }
      });
      return response.data.isCompleted;
    } catch (error) {
      console.error('Erreur lors de la récupération du statut de complétion du quiz:', error);
      return false;
    }
  };

  const handleQuizCompletion = async () => {
    const isCompleted = await fetchCompletionStatus(userId, quizId);
    setCompletedQuiz(isCompleted);
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
                          setShowQuiz(false);
                          handleTitleClick(mediaMaterial._id);
                        }}
                        className="group"
                      >
                        <Title>
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
                              onChange={() => {}}
                            />
                          </div>
                          <Info>
                            <FileTypeIcon>
                            {mediaMaterial.file.includes('.mp4') ? (
                              <LuTimer size={20} />):null}
                            </FileTypeIcon>
                            {mediaMaterial.duration}
                          </Info>
                        </SubTitle>
                      </FAQ>
                    ))}
                    <FAQ
                      key={`quiz-${id}`}
                      onClick={() => handleShowQuiz()}
                      className="group"
                    >
                      <Title>
                        <Text>Quiz</Text>
                        <TitleToggleIcon
                          variants={{
                            collapsed: { rotate: 0 },
                            open: { rotate: -180 }
                          }}
                          initial="collapsed"
                          animate={activeTitleIndex === 'quiz' ? 'open' : 'collapsed'}
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
                        animate={activeTitleIndex === 'quiz' ? 'open' : 'collapsed'}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div tw='flex justify-between items-center'>
                          <Info>
                            Take quiz
                          </Info>
                          <Checkbox
                            checked={completedQuiz}
                            onChange={() => {}}
                          />
                        </div>
                      </SubTitle>
                    </FAQ>
                  </FAQSContainer>
                </CardBody>
              </Card>
            </LeftSection>
            <RightSection>
              <Card>
                <CardBody>
                  {activeTitleIndex !== null ? (
                    <File>
                      {showQuiz ? (
                        <Quiz trainingContentId={id} quizId={quizId} onQuizCompleted={handleQuizCompletion} />
                      ) : (
                        <>
                          <FileTitle>
                            {mediaMaterials[activeTitleIndex]?.title || "Titre non disponible"}
                          </FileTitle>
                          {mediaMaterials[activeTitleIndex]?.file.includes('.pdf') ? (
                            <FileMedia>
                              <embed src={`http://localhost:5000/${mediaMaterials[activeTitleIndex].file}`} type="application/pdf" width="100%" height="600px" />
                            </FileMedia>
                          ) : mediaMaterials[activeTitleIndex]?.file.includes('.mp4') ? (
                            <FileMedia>
                              <video
                                controls
                                src={`http://localhost:5000/${mediaMaterials[activeTitleIndex].file}`}
                                className="img-fluid rounded"
                                style={{ maxHeight: '300px', width: '100%' }}
                                onEnded={() => handleVideoEnded(mediaMaterials[activeTitleIndex]._id)}
                              />
                            </FileMedia>
                          ) : null}
                          <div>
                            <Subheading>Description</Subheading>
                            <FileDescription>{mediaMaterials[activeTitleIndex]?.description || "Description non disponible"}</FileDescription>
                          </div>
                        </>
                      )}
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

export default MediaMaterials;
