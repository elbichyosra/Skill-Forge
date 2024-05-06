import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  margin-top: 10px;

`;

const Bar = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: rgb(100, 21, 255);
  border-radius: 5px;
`;
const ProgressBar = ({ trainingId}) => {
    const userId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      if(trainingId && userId && token){
      try {
        const response = await axios.put(`http://localhost:5000/trainingContent/progress/${trainingId}/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setProgress(response.data.progress);
        console.log(response.data)
      } catch (error) {
        console.error("Erreur lors de la récupération du progrès :", error);
      }}
    };
    fetchProgress();
  }, [trainingId,userId,token]);

  // Affichage de la barre de progression
  return (
    // <div>
    //   <p>Progression : {progress}%</p>
    //   <div style={{ width: '100%', backgroundColor: '#ccc', height: '20px', borderRadius: '10px' }}>
    //     <div style={{ width: `${progress}%`, backgroundColor: 'blue', height: '100%', borderRadius: '10px' }}></div>
    //   </div>
    // </div>
    <ProgressContainer>
    <Bar progress={progress} />
  </ProgressContainer>
  );
};

export default ProgressBar;
