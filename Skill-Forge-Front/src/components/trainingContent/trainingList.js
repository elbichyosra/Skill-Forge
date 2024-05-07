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
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { FiSearch } from 'react-icons/fi';
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;

const Headers = tw(SectionHeading)`text-primary-500`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 justify-center`;

const Card = tw(motion.div)`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 `;

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
const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;

  margin-top: 10px;

`;

const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;
const Actions = styled.div`
  ${tw`text-center `}
  input {
    ${tw`rounded-full border-2 w-full relative py-3 px-10 mt-6 font-medium focus:outline-none hover:border-gray-500`}
  }
  @media (max-width: 768px) {
    ${tw`mt-4`}
  }
`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500  text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
export default ({ heading = 'All Training Contents' }) => {
  const [trainingContents, setTrainingContents] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
 
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


  //////////////////// Pagination logic///////////////////
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToDisplay = searchInput.length > 1 ? filteredResults : trainingContents;
  const currentItems = itemsToDisplay.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(itemsToDisplay.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

 
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
////////////////////Filter/////////////////////
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== '') {
      const filteredData = trainingContents.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults([]);
    }
    setCurrentPage(1); // Reset current page to first page after each search
  };

  return (
    <>
      <AnimationRevealPage>
     <Header />
      <Container style={{ paddingRight: '30px' }}>
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
          
           <Controls>
                  <PrevButton onClick={handlePrevClick} disabled={currentPage === 1}><ChevronLeftIcon /></PrevButton>
                  <NextButton disabled={currentPage === pageNumbers.length} onClick={() => setCurrentPage(currentPage + 1)}><ChevronRightIcon /></NextButton>
                </Controls>
              </div>
              <Actions>
                <Input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => searchItems(e.target.value)}
                />
               
              </Actions>
          </HeaderRow>
          <TabContent>
          {currentItems.map((item) => (
                <CardContainer key={item._id}>
                <a href={`/TrainingDetails/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card
                    className="group"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    style={{ margin: '10px' }} // Add margin between the cards
                  >
                    <CardImageContainer
                      imageSrc={item.image ? `http://localhost:5000/${item.image.replace(/\\/g, '/')}` : `http://localhost:5000/uploads//acte.jpg`}
                    />
                    <CardText>
                      <CardTitle>{item.title}</CardTitle>
                      <CardInfo>
                        <IconWrapper><FiTag /></IconWrapper>
                        <CardContent>{item.category}</CardContent>
                      </CardInfo>
                      <CardInfo>
                        <IconWrapper><FiCheckCircle /></IconWrapper>
                        <CardContent>Status: {item.status}</CardContent>
                      </CardInfo>
                      {/* <CardInfo>
                        <IconWrapper><FiCalendar /></IconWrapper>
                        <CardContent>Deadline: {formatDate(trainingContent.endDate)}</CardContent>
                      </CardInfo> */}
                    </CardText>
                
                    {item.participants.includes(userId) ? (
          <ProgressBar trainingId={item._id} />
        ):(<ProgressContainer />)}
                  </Card>
      
                </a>
              </CardContainer>  ))}
         
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
