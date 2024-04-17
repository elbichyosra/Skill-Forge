import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import tw from 'twin.macro';

import styled from 'styled-components';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { Container, ContentWithPaddingXl } from 'components/misc/Layouts.js';
import { SectionHeading } from 'components/misc/Headings.js';
import { PrimaryButton as PrimaryButtonBase } from 'components/misc/Buttons.js';

import { ReactComponent as SvgDecoratorBlob1 } from 'images/svg-decorator-blob-5.svg';
import { ReactComponent as SvgDecoratorBlob2 } from 'images/svg-decorator-blob-7.svg';
import axios from 'axios';

import {  useSelector } from "react-redux";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Headers = tw(SectionHeading)`text-primary-500 `;



const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3  sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url('${props.imageSrc}');
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;



const CardButton = tw(PrimaryButtonBase)`text-sm`;
const CardAction = tw(
  PrimaryButtonBase
)`w-full mt-6  justify-center text-white`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;

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
          const response = await axios.get('http://localhost:5000/trainingContent/', { headers: { 'auth-token': token } });
          setTrainingContents(response.data);
        } catch (err) {
          console.error(err);
         
        }
      }
    };

    fetchTrainingContents();
  }, [token]);
   
  
  return (
    <>
      <Container>
        <ContentWithPaddingXl>
          <HeaderRow>
            <Headers>{heading}</Headers>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
             
            </div>
           </HeaderRow>
          <TabContent
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: 'flex',
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: 'none',
              },
            }}
            transition={{ duration: 0.4 }}
          >
          
          {trainingContents.map((trainingContent) => (
                    <CardContainer key={trainingContent._id}>
                      <Card
                        className="group"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                      >
                       

                       <CardImageContainer
  imageSrc={`http://localhost:5000/${trainingContent.image.replace(/\\/g, '/')}`}
>


                         
                       
                        </CardImageContainer>
                        <CardText>
                         

                        
                          <br></br>

                       <CardTitle> {trainingContent.title}</CardTitle>
                          <CardContent>Category:{trainingContent.category}</CardContent>
                          <CardContent>Status:{trainingContent.status}</CardContent>
                          <CardContent>Deadline:{trainingContent.endDate}</CardContent>
                        </CardText>
                        
                      </Card>
                    </CardContainer>
                  ))}
          </TabContent>
          <br></br>
        </ContentWithPaddingXl>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
    </>
  );
};