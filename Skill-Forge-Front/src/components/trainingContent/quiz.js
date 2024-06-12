import React, { useEffect, useState } from 'react';
import axios from 'axios';
import tw from 'twin.macro';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheckCircle, faClock, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Container = tw.div`flex flex-col items-center justify-center min-h-screen  p-4`;
const InstructionsCard = tw.div`text-left`;
const QuizCard = tw.div`bg-gray-100 p-6 w-full text-left`;
const QuestionCard = tw.div`mt-6`;
const QuestionText = tw.h2`text-lg font-semibold`;
const OptionList = tw.ul`mt-4`;
const OptionItem = tw.li`bg-gray-200 rounded-md p-3 mt-2 cursor-pointer hover:bg-gray-300`;

const StartButtonContainer = tw.div`flex justify-center`; // Center the button
const StartButton = tw.button`mt-6 bg-primary-500 text-white px-6 py-2 rounded-lg`;
const Heading = tw.h1`text-2xl font-bold flex items-center`;
const SubHeading = tw.h2`text-xl font-semibold flex items-center mt-4`;
const Paragraph = tw.p`mt-2 text-gray-600`;

const Quiz = ({ trainingContentId }) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [answers, setAnswers] = useState([]); // Store user's answers
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/quiz/byTrainingContent/${trainingContentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [trainingContentId, token]);

  const handleNextQuestion = () => {
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleAnswerSelect = (answer) => {
    // Save the selected answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleFinishQuiz = () => {
    // Process the user's answers, calculate score, etc.
    // For example, you can log the answers to the console
    console.log('User Answers:', answers);
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!quiz) {
    return <Container>No quiz available for this training content.</Container>;
  }

  return (
   <>
      {!startQuiz ? (
        <Container>
        <InstructionsCard>
          <Heading>
            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginRight: '0.5rem' }} />
            {quiz.title}
          </Heading>
          <Paragraph>{quiz.description}</Paragraph>
          <Heading>
            How to Submit the Quiz?
          </Heading>
          <div>
            <SubHeading>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '0.5rem' }} />
              Try to Stay Focused
            </SubHeading>
            <Paragraph>
              The quiz consists of several questions. Read each question carefully and try to find the correct answer(s).
            </Paragraph>
            <SubHeading>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '0.5rem' }} />
              Scoring Calculation
            </SubHeading>
            <Paragraph>
              You select the correct answer(s) and click on the next question until the end of the quiz. Finally, you can find your score based on the number of correct questions.
            </Paragraph>
            <Paragraph><strong>Number of Questions:</strong> {quiz.questions.length}</Paragraph>
            <Paragraph><strong>Test Duration:</strong> {quiz.duration ? `${quiz.duration} min` : "N/A"}</Paragraph>
          </div>
          <StartButtonContainer>
            <StartButton onClick={() => setStartQuiz(true)}>Start the Test</StartButton> {/* Centered button */}
          </StartButtonContainer>
        </InstructionsCard> </Container>
      ) : (
        <QuizCard>
          {quiz.questions.map((question, index) => (
            <QuestionCard key={index} style={{ display: index === currentQuestionIndex ? 'block' : 'none' }}>
              <QuestionText>
                {index + 1}. {question.questionText}
              </QuestionText>
              <OptionList>
                {question.options.map((option, optionIndex) => (
                 <OptionItem> <label key={optionIndex}>
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      onChange={() => handleAnswerSelect(option)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    {option}
                  </label></OptionItem>
                ))}
              </OptionList>
            </QuestionCard>
          ))}
          {/* Display "Next" button if not the last question */}
          {currentQuestionIndex < quiz.questions.length - 1 && (
            <StartButtonContainer>
              <StartButton onClick={handleNextQuestion}>Next</StartButton>
            </StartButtonContainer>
          )}
          {/* Display "Finish" button for the last question */}
          {currentQuestionIndex === quiz.questions.length - 1 && (
            <StartButtonContainer>
              <StartButton onClick={handleFinishQuiz}>Finish</StartButton>
            </StartButtonContainer>
          )}
        </QuizCard>
      )}
   </>
  );
};

export default Quiz;
