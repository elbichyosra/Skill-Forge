import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Card, Table, Badge, Button, Alert } from 'react-bootstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import QuestionModal from './questionModal';  // Import the modal component

const QuizQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { quizId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [alertMessage, setAlertMessage] = useState(null);
  const history = useHistory();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [showModal, setShowModal] = useState(false);  // State to control modal visibility
  const [selectedQuestion, setSelectedQuestion] = useState(null);  // State to store selected question

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/question/getByQuiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("There was an error fetching the questions!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId, token]);

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    }
    return str;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/question/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedQuestions = questions.filter(question => question._id !== id);
      setQuestions(updatedQuestions);
      setFilteredResults(updatedQuestions.filter(item => item.questionText.toLowerCase().includes(searchInput.toLowerCase())));
      setAlertMessage({ type: 'success', message: 'Question was deleted successfully!' });
    } catch (error) {
      console.error("There was an error deleting the question!", error);
      setAlertMessage({ type: 'danger', message: 'Error deleting question!' });
    } finally {
      setTimeout(() => {
        setAlertMessage(null);
      }, 2000);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = Math.min(indexOfLastItem - itemsPerPage + 1, questions.length);
  const itemsToDisplay = searchInput.length > 1 ? filteredResults : questions;
  const currentItems = itemsToDisplay.slice(indexOfFirstItem - 1, indexOfLastItem);
  const totalPages = Math.ceil(itemsToDisplay.length / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== '') {
      const filteredData = questions.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults([]);
    }
    setCurrentPage(1);
  };

  const handleShowModal = (question) => {
    setSelectedQuestion(question);
    setShowModal(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <style>
        {`
          .custom-btn-info {
            background-color: #74188D;
            border-color: #74188D;
          }
          .custom-btn-info:hover {
            background-color: #620f79;
            border-color: #620f79;
          }
          .custom-btn-warning {
            background-color: #43dac1;
            border-color: #43dac1;
          }
          .custom-btn-warning:hover {
            background-color: #138496;
            border-color: #117a8b;
          }
          .custom-btn-danger {
            background-color: #dc3545;
            border-color: #dc3545;
          }
          .custom-btn-danger:hover {
            background-color: #c82333;
            border-color: #bd2130;
          }
        `}
      </style>
      {alertMessage && (
        <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible={false} show={true}>
          {alertMessage.message}
        </Alert>
      )}
      <ol className="breadcrumb">
        <li className="breadcrumb-item active"><Link to="/quizzes-table">Quiz</Link></li>
        <li className="breadcrumb-item"><Link to="#">Question Table</Link></li>
      </ol>
      <div className="d-flex align-items-center mb-4 flex-wrap justify-content-between" style={{ width: "100%" }}>
        <div className="d-flex justify-content-center w-70">
          <div className="nav-item d-flex align-items-center ml-3">
            <div className="col-md-2 input-group search-area">
              <input type="text"
                className="form-control"
                placeholder="Search"
                style={{ width: '200px' }}
                onChange={(e) => searchItems(e.target.value)}
              />
              <span className="input-group-text">
                <i className="flaticon-381-search-2"></i>
              </span>
            </div>
          </div>
        </div>
        <div>
          <Link to={`/${quizId}/new-question`}  className="btn btn-primary me-3 btn-sm">
            <i className="fas fa-plus me-2"></i>Add New Question
          </Link>
        </div>
      </div>
      <Row>
        <Card>
          <Card.Header>
            <Card.Title>Questions List</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Question Text</th>
                  <th>Options</th>
                  <th>Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.questionText}</td>
                      <td>
                        {item.options && item.options.map((option, idx) => (
                          <Badge key={idx} variant="info" className="mr-1">
                            {truncateString(option, 7)}
                          </Badge>
                        ))}
                      </td>
                      <td>{item.answer}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <div className="me-1">
                            <Button
                              variant="info"
                              className="custom-btn-info"
                              onClick={() => handleShowModal(item)}
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                            </Button>
                          </div>
                          <div className="me-1">
                            <Button
                              variant="warning"
                              className="custom-btn-warning"
                              onClick={() => history.push(`/${item._id}/update-question`)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant="danger"
                              className="custom-btn-danger"
                              onClick={() => handleDelete(item._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No questions found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="sm-mb-0 mb-3">
            <h5 className="mb-0">Showing {indexOfFirstItem} to {Math.min(indexOfLastItem, filteredResults.length > 0 ? filteredResults.length : questions.length)} of {questions.length} entries</h5>
          </div>
          <nav>
            <ul className="pagination pagination-circle">
              <li className="page-item page-indicator">
                <Link to={"#"} className="page-link" onClick={handlePrevClick} disabled={currentPage === 1}>Prev</Link>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <Link to={"#"} className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</Link>
                </li>
              ))}
              <li className="page-item page-indicator">
                <Link to={"#"} className="page-link" onClick={handleNextClick} disabled={currentPage === totalPages}>Next</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Row>
      {selectedQuestion && (
        <QuestionModal
          show={showModal}
          onHide={() => setShowModal(false)}
          question={selectedQuestion}
        />
      )}
    </div>
  );
};

export default QuizQuestions;
