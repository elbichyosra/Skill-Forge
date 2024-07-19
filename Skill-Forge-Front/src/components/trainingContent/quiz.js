import React, { useEffect, useState } from 'react';
import axios from 'axios';
import tw from 'twin.macro';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheckCircle, faClock, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Container = tw.div`flex flex-col items-center justify-center min-h-screen p-4`;
const InstructionsCard = tw.div`text-left`;
const QuizCard = tw.div`bg-gray-100 p-6 w-full text-left`;
const QuestionCard = tw.div`mt-6`;
const QuestionText = tw.h2`text-lg font-semibold`;
const OptionList = tw.ul`mt-4`;
const OptionItem = tw.li`bg-gray-200 rounded-md p-3 mt-2 cursor-pointer hover:bg-gray-300`;

const StartButtonContainer = tw.div`flex justify-center`;
const StartButton = tw.button`mt-6 bg-primary-500 text-white px-6 py-2 rounded-lg`;
const Heading = tw.h1`text-2xl font-bold flex items-center`;
const SubHeading = tw.h2`text-xl font-semibold flex items-center mt-4`;
const Paragraph = tw.p`text-gray-600`;

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convertir la durée en secondes

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  return (
    <div tw="text-center mt-4">
      <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5rem' }} />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};

const Quiz = ({ trainingContentId }) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null); // score is null by default
  const [finished, setFinished] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchQuizAndScore = async () => {
      try {
        const quizResponse = await axios.get(`http://localhost:5000/quiz/byTrainingContent/${trainingContentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuiz(quizResponse.data);

        const scoreResponse = await axios.get(`http://localhost:5000/results/${userId}/${quizResponse.data._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (scoreResponse.data) {
          setScore(scoreResponse.data.score);
          setFinished(true);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz or score:', error);
        setLoading(false);
      }
    };

    fetchQuizAndScore();
  }, [trainingContentId, token, userId]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleFinishQuiz = async () => {
    let calculatedScore = 0;
    quiz.questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        calculatedScore += 1;
      }
    });
    calculatedScore = (calculatedScore / quiz.questions.length) * 100;
    setScore(calculatedScore);
    setFinished(true);

    try {
      await axios.post('http://localhost:5000/results', {
        userId,
        quizId: quiz._id,
        score: calculatedScore,
      }, {
        headers: {
        Authorization: `Bearer ${token}`
        }
      });
       // Mettre à jour l'état du quiz pour l'utilisateur
    // await axios.put(`http://localhost:5000/quiz/updateCompletion/${quiz._id}`, {
    //   userId,
    //   isCompleted: true
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  const handleTimeUp = () => {
    handleFinishQuiz();
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!quiz) {
    return <Container>No quiz available for this training content.</Container>;
  }

  const resultCardStyle = {
    backgroundColor: score < quiz.passingScore ? '#ffe6e6' : '#d4edda',
    padding: '1.5rem',
    width: '100%',
    textAlign: 'left',
  };

  return (
    <Container>
      {finished ? (
        <div style={resultCardStyle}>
          <Heading>Results</Heading>
          <Paragraph>Your score: {score}%</Paragraph>
          {score >= quiz.passingScore ? (
            <Paragraph>Congratulations! You passed the quiz.</Paragraph>
          ) : (
            <Paragraph>Sorry, you failed the quiz.</Paragraph>
          )}
        </div>
      ) : (
        !startQuiz ? (
          <InstructionsCard>
            <Heading>
              <FontAwesomeIcon icon={faQuestionCircle} style={{ marginRight: '0.5rem' }} />
              {quiz.title}
            </Heading>
            <Paragraph>{quiz.description}</Paragraph>
            <Heading>How to Submit the Quiz?</Heading>
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
              <Paragraph><strong>Test Duration:</strong> {quiz.duration ? `${quiz.duration} minutes` : "N/A"}</Paragraph>
            </div>
            <StartButtonContainer>
              <StartButton onClick={() => setStartQuiz(true)}>Start the Test</StartButton>
            </StartButtonContainer>
          </InstructionsCard>
        ) : (
          <QuizCard>
            {quiz.duration > 0 && <Timer duration={quiz.duration} onTimeUp={handleTimeUp} />}
            {quiz.questions.map((question, index) => (
              <QuestionCard key={index} style={{ display: index === currentQuestionIndex ? 'block' : 'none' }}>
                <QuestionText>
                  {index + 1}. {question.questionText}
                </QuestionText>
                <OptionList>
                  {question.options.map((option, optionIndex) => (
                    <OptionItem key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={option}
                          onChange={() => handleAnswerSelect(option)}
                          style={{ marginRight: '0.5rem' }}
                        />
                        {option}
                      </label>
                    </OptionItem>
                  ))}
                </OptionList>
              </QuestionCard>
            ))}
            {currentQuestionIndex < quiz.questions.length - 1 && (
              <StartButtonContainer>
                <StartButton onClick={handleNextQuestion}>Next</StartButton>
              </StartButtonContainer>
            )}
            {currentQuestionIndex === quiz.questions.length - 1 && (
              <StartButtonContainer>
                <StartButton onClick={handleFinishQuiz}>Finish</StartButton>
              </StartButtonContainer>
            )}
          </QuizCard>
        )
      )}
    </Container>
  );
};

export default Quiz;
