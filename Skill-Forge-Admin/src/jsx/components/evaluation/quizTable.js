import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Badge, Alert } from "react-bootstrap";

const QuizTable = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const [alertMessage, setAlertMessage] = useState(null);
    
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const fetchQuizzes = async () => {
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/quiz/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuizzes(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/quiz/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // After successful deletion, fetch quizzes again to update the list
            setQuizzes(quizzes.filter(content => content._id !== id));
            setAlertMessage({ type: 'success', message: 'Quiz was deleting successfuly!' });
        } catch (error) {
            console.error("Error deleting quiz:", error);
            setAlertMessage({ type: 'danger', message: 'Error deleting quiz!' });
        }
     
        finally {
            setTimeout(() => {
                setAlertMessage(null);
            }, 2000);
        }
    };

    /////////////////////////Pagination/////////////////////////////
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = Math.min(indexOfLastItem - itemsPerPage + 1, quizzes.length);
    const itemsToDisplay = searchInput.length > 1 ? filteredResults : quizzes;
    const currentItems = itemsToDisplay.slice(indexOfFirstItem - 1, indexOfLastItem);
    const totalPages = Math.ceil(itemsToDisplay.length / itemsPerPage);

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    ///////////////////////Filter////////////////////////////
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchValue !== '') {
            const filteredData = quizzes.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults([]);
        }
        setCurrentPage(1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <style>
                {`
             .table-responsive {
                overflow-x: auto;
            }
            
            .table th, .table td {
                vertical-align: middle;
                text-align: center;
            }
            
            .table th {
                width: auto;
                white-space: nowrap;
            }
            
            .table td {
                white-space: nowrap;
            }
            
            .dataTablesCard {
                width: 100%;
                margin: 0 auto;
            }
            
            .dataTables_wrapper {
                width: 100%;
                margin: 0;
            }
            /* Custom styling for check and trash icons */
            .fas.fa-check {
                color: #43dac1; /* Success green */
            }
            .fas.fa-check:hover {
                color: lightgreen; /* Lighter green on hover */
            }
            .far.fa-trash-alt {
                color: #dc3545; /* Primary red */
            }
            .far.fa-trash-alt:hover {
                color: red; /* Red on hover */
            }
          
                `}
            </style>
            {alertMessage && (
                <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible={false} show={true}>
                    {alertMessage.message}
                </Alert>
            )}
            <div className="d-flex align-items-center mb-4 flex-wrap justify-content-between" style={{width:"100%"}}>
                <h4 className="fs-20 font-w600">Quizzes List</h4>
                <div className="d-flex justify-content-center w-70"> 
          <div className="nav-item d-flex align-items-center ml-3">
            <div className="col-md-4 input-group search-area">
              <input type="text" 
                className="form-control" 
                placeholder="Search"
                style={{width: '250px'}} 
                onChange={(e) => searchItems(e.target.value)}
              />
              <span className="input-group-text" >
               <i className="flaticon-381-search-2"></i>
              </span>
            </div>
          </div>
        </div>
                <div>
                    <Link to={"#"} className="btn btn-primary me-3 btn-sm">
                        <i className="fas fa-plus me-2"></i>Add New Quiz
                    </Link>
                </div>
            </div>
          

            <div className="row">
                <div className="col-xl-12">
                    <div className="table-responsive dataTables_wrapper" id="application-data">
                        <table className="table display mb-4 dataTablesCard  table-responsive-xl card-table dataTable no-footer " id="example5"  >
                            <thead>                               
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Passing Score</th>
                                    <th>Duration</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.passingScore}</td>
                                        <td>{item.duration ? `${item.duration} mins` : 'N/A'}</td>
                                        <td>
                                            <span>
                                                <Link to="#" ><i className="fas fa-check  btn-xs sharp me-1"></i></Link>
                                            </span>
                                            <span>
                                                <Link to="#" ><i className="fas fa-eye  btn-xs sharp me-1"></i></Link>
                                            </span>
                                            <span>
                                                <Link to="#" onClick={() => handleDelete(item._id)}><i className="far fa-trash-alt  btn-xs sharp me-1 "></i></Link>
                                            </span> 
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="sm-mb-0 mb-3">
                        <h5 className="mb-0">Showing {indexOfFirstItem} to {Math.min(indexOfLastItem, filteredResults.length>0?filteredResults.length:quizzes.length)} of {quizzes.length} entries</h5>
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
            </div>
        </>
    );
};

export default QuizTable;
