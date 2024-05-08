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
import { FiCalendar, FiTag, FiCheckCircle , FiEdit2, FiTrash2,FiX,FiCheck } from 'react-icons/fi';
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
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
  const PrimaryButton = styled(PrimaryButtonBase)(props => [
    tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0`,
    props.buttonRounded && tw`rounded-full`,
    props.disabled && tw`cursor-not-allowed opacity-50`
  ]);
  const CommentsSection = styled.div`
  ${tw`flex flex-col space-y-8`}
  transition: all 0.3s ease;
`;

// Styles for each comment
const CommentContainer = styled.div`
  ${tw`bg-gray-100 rounded-md p-4 shadow-md`}
  transition: all 0.3s ease;

  &:hover {
    ${tw`shadow-lg`}
  }
`;
const ActionButtons = styled.div`
${tw`flex items-center justify-end`}
`;
  const [showDescription, setShowDescription] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [trainingContent, setTrainingContent] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const userName=useSelector((state) => state.auth.userName);
const userId=useSelector((state) => state.auth.userId);
const [showComments, setShowComments] = useState(false);
const [comments, setComments] = useState([]);
const [comment, setComment] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');
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
    fetchComments();
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
    if(trainingContent.endDate){
    const currentDate = new Date();
    const deadline = new Date(trainingContent.endDate);
    return trainingContent.status === 'unavailable' || deadline < currentDate;}
  };
  const handleParticipateClick = async (trainingId) => {
    try {
      const response = await axios.post(`http://localhost:5000/trainingContent/participate/${trainingId}/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // Redirigez l'utilisateur vers la page de la liste des médias de cette formation
        window.location.href = `/${trainingId}/mediasList`;}
      // Si la participation est enregistrée avec succès, redirigez l'utilisateur vers la page de liste des médias de la formation
    console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la participation à la formation :', error);
      // Gérez les erreurs si nécessaire
    }
  };
  
    const fetchComments = async () => {
      if(token){
      try {
        const response = await axios.get(`http://localhost:5000/comment/getBy/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },});
        setComments(response.data);
      
      } catch (error) {
        console.error('Error fetching comments:', error);
      }}
    };
   


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
     const response= await axios.post(`http://localhost:5000/comment/`, {
        content: comment,
        username:userName,
        userId: userId,
        trainingContentId: id
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },});
   
      const newComment = await response.data;
      setComments([...comments, newComment]);
      setComment('');
    
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
// Déclaration de l'état pour suivre l'ID du commentaire en cours d'édition et son contenu édité
const [isEditing, setIsEditing] = useState(null);
const [editedContent, setEditedContent] = useState('');

// Gérer le clic sur l'icône d'édition
const handleEditClick = (commentId) => {
  // Récupérer le contenu du commentaire à éditer
  const commentToEdit = comments.find(comment => comment._id === commentId);
  // Mettre à jour l'état avec l'ID du commentaire en cours d'édition et son contenu
  setIsEditing(commentId);
  setEditedContent(commentToEdit.content);
};

// Gérer la sauvegarde des modifications
const handleSaveEdit = async (commentId) => {
  try {
    // Mettre à jour le commentaire sur le serveur avec le nouveau contenu
    const response = await axios.put(`http://localhost:5000/comment/${commentId}`, {
      content: editedContent,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Mettre à jour l'état local avec le commentaire mis à jour
    const updatedComment = response.data;
    const updatedComments = comments.map(comment => {
      if (comment._id === updatedComment._id) {
        return updatedComment;
      }
      return comment;
    });
    setComments(updatedComments);
    // Réinitialiser l'état de l'édition
    setIsEditing(null);
    setEditedContent('');
    // Afficher un message de succès
    setSuccessMessage('Comment updated successfully.');
  } catch (error) {
    console.error('Error updating comment:', error);
    // Afficher un message d'erreur
    setErrorMessage('Failed to update comment. Please try again.');
  }
};

// Gérer l'annulation de l'édition
const handleCancelEdit = () => {
  // Réinitialiser l'état de l'édition
  setIsEditing(null);
  setEditedContent('');
};

  
  const handleDeleteComment = async (commentId) => {
    try {
     
  // Supprimer le commentaire
      await axios.delete(`http://localhost:5000/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Mettre à jour l'état local pour retirer le commentaire supprimé
      const updatedComments = comments.filter(comment => comment._id !== commentId);
      setComments(updatedComments);
  
      // Afficher un message de succès
      setSuccessMessage('Comment deleted successfully.');
    } catch (error) {
      console.error('Error deleting comment:', error);
      // Afficher un message d'erreur
      setErrorMessage('Failed to delete comment. Please try again.');
    }
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
        <PrimaryButton
  buttonRounded={false}
  onClick={() => handleParticipateClick(trainingContent && trainingContent._id)}
>
Participate in this training
</PrimaryButton>
            </>
          }
          buttonRounded={false}
          textOnLeft={false}
        
          imageSrc={trainingContent && trainingContent.image ? `http://localhost:5000/${trainingContent.image.replace(/\\/g, '/')}` :   `http://localhost:5000/uploads//acte.jpg`}
          imageCss={imageCss}
          imageDecoratorBlob={true}
          imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
          style={{ marginBottom:'1px' }}/>

    

        <div style={{ display: 'flex', marginLeft: '10px' }}>
       
           <div style={{ flex: '1' }}>
            <div tw="max-w-lg w-full">
              <div tw="max-w-lg w-full font-medium">
                <div tw="bg-white rounded-lg shadow-xs p-8">
                  <a
                    onClick={() => setShowComments(!showComments)}
                    tw="flex items-center mb-4 text-primary-500 hover:text-primary-600 cursor-pointer"
                  >
                    <h1 tw="text-lg font-bold">
                      All comments{' '} </h1>
                    {showComments ? (
                      <FaAngleUp size={20} />
                    ) : (
                      <FaAngleDown size={20} />
                    )}

                  </a>

                  {showComments && (
                    <div tw="space-y-4">
                      <form onSubmit={handleCommentSubmit}>
                        <div tw="flex items-center">
                          <input
                            type="text"
                            tw="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary-500"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                          />
                          <button
                            type="submit"
                            tw="ml-2 px-4 py-2 rounded-md bg-primary-500 text-white font-semibold hover:bg-primary-600 focus:outline-none focus:bg-primary-600"
                          >
                            Add Comment
                          </button>
                        </div>
                      </form>
                      {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment._id} tw="bg-gray-100 rounded-md p-4 shadow-md">
                          {isEditing === comment._id ? (
                            <div tw="flex items-center justify-between">
                              <input
                                type="text"
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                tw="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary-500"
                              />
                              <div>
                                {/* Bouton pour confirmer les modifications */}
                                <FiCheck
                                  size={20}
                                  style={{ cursor: 'pointer', marginRight: '10px' }}
                                  onClick={() => handleSaveEdit(comment._id)}
                                  css={css`
                                  &:hover {
                              color: green; 
                               }
                              `}
                                />
                                {/* Bouton pour annuler les modifications */}
                                <FiX
                                  size={20}
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleCancelEdit(comment._id)}
                                  css={css`
                                  &:hover {
                                    color: red;
                                  }
                                `}
                                />
                              </div>
                            </div>
                          ) : (
                            <div tw="flex items-center justify-between">
                              <p tw="text-gray-700 text-lg">{comment.content}</p>
                              <div>
                                {/* Bouton pour éditer */}
                                <FiEdit2
                                  size={20}
                                  style={{ cursor: 'pointer', marginRight: '10px' }}
                                  onClick={() => handleEditClick(comment._id)}
                                  css={css`
                                  &:hover {
                              color: green; 
                               }
                              `}
                                />
                                {/* Bouton pour supprimer */}
                                <FiTrash2
                                  size={20}
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleDeleteComment(comment._id)}
                                  css={css`
                                  &:hover {
                                    color: red;
                                  }
                                `}
                                />
                              </div>
                            </div>
                          )}
                          <div tw="flex items-center justify-between mt-2">
                            <p tw="text-gray-500 text-sm">by {comment.username}</p>
                            <p tw="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      ))
                      ) : (
                        <p tw="text-center text-gray-500">No comments yet.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: '1'}}>
            <div tw="max-w-lg w-full">
              <div tw="max-w-lg w-full font-medium">
                <div tw="bg-white rounded-lg shadow-xs p-8">
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
