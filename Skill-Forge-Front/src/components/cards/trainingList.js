import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {  useSelector } from "react-redux";
import { Badge, Alert } from "react-bootstrap";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading } from "components/misc/Headings.js";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";

const TrainingCard = styled.div`
  ${tw`flex flex-col items-center text-center w-full max-w-sm mx-auto bg-white rounded-lg border border-gray-300 shadow-md overflow-hidden`}
`;

const TrainingImage = styled.div`
  ${tw`h-48 w-full bg-cover bg-center`}
`;

const TrainingTitle = styled.h5`
  ${tw`text-xl font-bold mt-4`}
`;

const TrainingCategory = styled.p`
  ${tw`text-gray-800 font-medium mb-2`}
`;

const TrainingEndDate = styled.p`
  ${tw`text-gray-600 mb-4`}
`;

const TrainingDescription = styled.p`
  ${tw`text-gray-500 text-base mb-4`}
`;

const TrainingStatus = styled.div`
  ${tw`flex items-center justify-center w-full bg-gray-200 py-1`}
`;

const TrainingBadge = styled(Badge)`
  ${tw`mx-2`}
`;

const TrainingActions = styled.div`
  ${tw`flex justify-center w-full mt-4`}
`;

const TrainingContentList = () => {
  const [trainingContents, setTrainingContents] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null); // Ajout de l'état pour gérer l'alerte
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTrainingContents = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/trainingContent/', { headers: { 'auth-token': token } });
          setTrainingContents(response.data);
        } catch (err) {
          console.error(err);
          setAlertMessage(err.response.data.message);
        }
      }
    };

    fetchTrainingContents();
  }, [token]);

  return (
    <>
      <SectionHeading>Liste des formations</SectionHeading>
      {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}
      <div css={[tw`mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`]}>
        {trainingContents.map((trainingContent) => (
          <TrainingCard key={trainingContent._id}>
            <TrainingImage style={{ backgroundImage: `http://localhost:5000/${trainingContent.image}` }} />
            <TrainingTitle>{trainingContent.title}</TrainingTitle>
            <TrainingCategory>{trainingContent.category}</TrainingCategory>
            <TrainingEndDate>{trainingContent.endDate}</TrainingEndDate>
            <TrainingDescription>{trainingContent.description}</TrainingDescription>
           
          </TrainingCard>
        ))}
      </div>
    </>
  );
};

export default TrainingContentList;