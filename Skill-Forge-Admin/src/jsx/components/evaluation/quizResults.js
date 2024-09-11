import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const QuizResultsTable = () => {
    const [alertMessage, setAlertMessage] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const [quizResults, setQuizResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const fetchResults = async () => {
            if (token) {
                try {
                    // Fetch quiz results
                    const resultsResponse = await axios.get('http://localhost:5000/results', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    // Extract user IDs from results
                    const userIds = [...new Set(resultsResponse.data.map(result => result.userId))];

                    // Fetch user details for each userId individually
                    const userPromises = userIds.map(userId =>
                        axios.get(`http://localhost:9000/admin/realms/skillForge/users/${userId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                    );

                    // Await all user requests
                    const usersResponses = await Promise.all(userPromises);

                    // Create a map of users by their IDs
                    const usersMap = usersResponses.reduce((map, response) => {
                        const user = response.data;
                        map[user.id] = user; // Adjust if user ID property is different
                        return map;
                    }, {});

                    // Map results to include user details, quiz title, and training content title
                    const resultsWithUserDetails = resultsResponse.data.map(result => ({
                        ...result,
                        user: usersMap[result.userId],
                        quizTitle: result.quizId.title,
                        trainingContentTitle: result.quizId.trainingContent?.title || 'N/A', // Default to 'N/A' if no title
                        score: Math.round(result.score) 
                    }));

                    setQuizResults(resultsWithUserDetails);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchResults();
    }, [token]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = Math.min(indexOfLastItem - itemsPerPage + 1, quizResults.length);
    const itemsToDisplay = searchInput.length > 1 ? filteredResults : quizResults;
    const currentItems = itemsToDisplay.slice(indexOfFirstItem - 1, indexOfLastItem);
    const totalPages = Math.ceil(itemsToDisplay.length / itemsPerPage);

    const handlePrevClick = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    const handleNextClick = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));

    // Filtering logic
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchValue !== '') {
            const filteredData = quizResults.filter((item) => {
                return (
                    [item.user.firstName, item.user.lastName, item.user.email, item.quizTitle, item.trainingContentTitle,item.score]
                        .join(' ')
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                );
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults([]);
        }
        setCurrentPage(1);
    };

    return (
        <>
            {alertMessage && (
                <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible={false} show={true}>
                    {alertMessage.message}
                </Alert>
            )}

            <div className="d-flex align-items-center mb-4 flex-wrap justify-content-between">
                <h4 className="fs-20 font-w600">Quiz Results List</h4>

                <div className="d-flex justify-content-center w-70">
                    <div className="nav-item d-flex align-items-center ml-3">
                        <div className="col-md-4 input-group search-area">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                style={{ width: '250px' }}
                                onChange={(e) => searchItems(e.target.value)}
                            />
                            <span className="input-group-text">
                                <i className="flaticon-381-search-2"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12">
                    <div className="table-responsive">
                        <table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Training Content</th>
                                    <th>Quiz Title</th>
                                    <th>Score</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.user.firstName} {item.user.lastName}</td>
                                        <td>{item.user.email}</td>
                                        <td>{item.trainingContentTitle}</td> {/* Training content title */}
                                        <td>{item.quizTitle}</td>
                                        <td>{item.score}%</td> {/* Score formatted as percentage */}
                                     
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="sm-mb-0 mb-3">
                        <h5 className="mb-0">Showing {indexOfFirstItem} to {Math.min(indexOfLastItem, filteredResults.length > 0 ? filteredResults.length : quizResults.length)} of {quizResults.length} entries</h5>
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

export default QuizResultsTable;
