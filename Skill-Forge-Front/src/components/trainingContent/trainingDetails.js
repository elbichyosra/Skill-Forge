import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import { css } from 'styled-components/macro';
import MainFeature from 'components/features/TwoColWithButton.js';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from 'components/headers/light.js';
import Footer from 'components/footers/FiveColumnWithInputForm.js';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import styled from 'styled-components';
import { FiCalendar, FiTag, FiCheckCircle } from 'react-icons/fi';

export default () => {
  const Content = tw.div`flex items-center text-sm text-gray-600 mb-2`;
  const IconWrapper = tw.span`mr-2 flex items-center text-primary-500`;
  const Text = tw.p`text-gray-700`;

  const imageCss = tw`rounded-4xl`;
  const Badge = styled.span`
    ${tw`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full`}
    ${({ status }) => {
      switch (status) {
        case 'available':
          return tw`bg-green-200 text-green-800`;
        case 'unavailable':
          return tw`bg-red-200 text-red-800`;
        default:
          return tw`bg-gray-200 text-gray-800`;
      }
    }}
  `;

  const [showDescription, setShowDescription] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [trainingContent, setTrainingContent] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTrainingContent = async () => {
      if (token) {
        try {
          const response = await axios.get(`http://localhost:5000/trainingContent/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTrainingContent(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching training content:', error);
          setError(error);
        }
      }
    };
    fetchTrainingContent();
  }, [id, token]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Not specific";
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDescriptionToggle = () => {
    setShowDescription(!showDescription);
  };

  const isParticipateDisabled = () => {
    if (!trainingContent) return true;
    const currentDate = new Date();
    const deadline = new Date(trainingContent.endDate);
    return trainingContent.status === 'unavailable' || deadline < currentDate;
  };

  return (
    <>
      <AnimationRevealPage>
        <Header />
        <MainFeature 
          heading={
            <>
              <p style={{ fontFamily: 'initial', color: '#6415FF' }}>
                {trainingContent && trainingContent.title}
              </p>
            </>
          }
          subheading={" "}
          description={
            <>
              <Content>
                <IconWrapper><FiTag /></IconWrapper>
                <Text>{trainingContent && trainingContent.category}</Text>
              </Content>
              <Content>
                <IconWrapper><FiCheckCircle /></IconWrapper>
                <Text>Status: {trainingContent && (
                  <Badge status={trainingContent.status}>
                    {trainingContent.status}
                  </Badge>)}</Text>
              </Content>
              <Content>
                <IconWrapper><FiCalendar /></IconWrapper>
                <Text>Deadline: {trainingContent && formatDate(trainingContent.endDate)}</Text>
              </Content>
              {isParticipateDisabled() && (
          <div style={{ color: 'red' }}>
            {trainingContent && trainingContent.status === 'unavailable' ? "This training is not available." : "The deadline for this training has passed."}
          </div>
        )}
            </>
          }
          buttonRounded={false}
          textOnLeft={false}
          primaryButtonText="Participate in this training"
          primaryButtonUrl={`/${trainingContent && trainingContent._id}/mediasList`}
       
          imageSrc={trainingContent && trainingContent.image ? `http://localhost:5000/${trainingContent.image.replace(/\\/g, '/')}` : ''}
          imageCss={imageCss}
          imageDecoratorBlob={true}
          imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
        />

    

        <div style={{ display: 'flex', marginLeft: '10px' ,marginTop:'1px' }}>
          <div style={{ flex: '1'}}>
            <div tw="max-w-lg w-full">
              <div tw="max-w-lg w-full font-medium">
                <div tw="bg-white rounded-lg shadow-md p-8">
                  <a
                    onClick={handleDescriptionToggle}
                    tw="flex items-center mb-4 text-primary-500 hover:text-primary-600 cursor-pointer"
                  >
                    <h1 tw="text-lg font-bold">
                      Description{' '} </h1>
                      {showDescription ? (
                        <FaAngleUp size={20} />
                      ) : (
                        <FaAngleDown size={20} />
                      )}
                   
                  </a>
                  {showDescription && (
                    <div tw="space-y-4" >
                      <div tw="bg-gray-100 rounded-md p-4 shadow-md">
                        <p tw="text-gray-700 text-sm">{trainingContent && trainingContent.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <Footer />
      </AnimationRevealPage>
    </>
  );
};
