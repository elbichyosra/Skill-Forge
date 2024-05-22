import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Badge, Alert } from "react-bootstrap";

const TrainingContentList = () => {
    const [trainingContents, setTrainingContents] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const fetchTrainingContents = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5000/trainingContent/', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setTrainingContents(response.data);
                } catch (error) {
                    console.error('Error fetching training contents:', error);
                }
            }
        };
        fetchTrainingContents();
    }, [token]);

    const handleDeleteTrainingContent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/trainingContent/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // setTrainingContents(trainingContents.filter(content => content._id !== id));
            const updatedTrainings = trainingContents.filter(content => content._id !== id);
            setTrainingContents(updatedTrainings);
            setFilteredResults(updatedTrainings.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase())));
            setAlertMessage({ type: 'success', message: 'Training content supprimé avec succès!' });
        } catch (error) {
            console.error('Error deleting training content:', error);
            setAlertMessage({ type: 'danger', message: 'Erreur lors de la suppression du contenu de formation!' });
        } finally {
            setTimeout(() => {
                setAlertMessage(null);
            }, 2000);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return "Not specific";
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    /////////////////////////Pagination/////////////////////////////

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = Math.min(indexOfLastItem - itemsPerPage + 1, trainingContents.length);
    const itemsToDisplay = searchInput.length > 1 ? filteredResults : trainingContents;
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
            const filteredData = trainingContents.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
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
        <h4 className="fs-20 font-w600">Training Content List</h4>

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
          <Link to="/new-training" className="btn btn-primary me-3 btn-sm">
            <i className="fas fa-plus me-2"></i>Add New Training
          </Link>
        </div>
      </div>

            <div className="row">
                <div className="col-xl-12">
                    <div className="table-responsive dataTables_wrapper" id="application-data">
                        <table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer" id="example5">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>End date</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td>{item.category}</td>
                                        <td>{formatDate(item.endDate)}</td>
                                        <td>{item.description.split(' ').slice(0, 7).join(' ')}{item.description.split(' ').length > 7 ? '...' : ''}</td>
                                        <td>
                                            {item.status === 'available' ? (
                                                <Badge variant="success light">Available</Badge>
                                            ) : (
                                                <Badge variant="danger light">Not Available</Badge>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <div className="action-buttons justify-content-end">
                                                <Link to={`/${item._id}/details-training`} className="btn btn-success light mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-main-icon" width="24px" height="24px" viewBox="0 0 32 32" x="0px" y="0px"><g data-name="Layer 21"><path d="M29,14.47A15,15,0,0,0,3,14.47a3.07,3.07,0,0,0,0,3.06,15,15,0,0,0,26,0A3.07,3.07,0,0,0,29,14.47ZM16,21a5,5,0,1,1,5-5A5,5,0,0,1,16,21Z" fill="#000000" fillRule="nonzero"></path><circle cx="16" cy="16" r="3" fill="#000000" fillRule="nonzero"></circle></g></svg>
                                                </Link>
                                                <Link to={`/${item._id}/edit-training`}  className="btn btn-secondary light mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="0" y="0" width="24" height="24"></rect>
                                                            <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fillRule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "></path>
                                                            <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"></rect>
                                                        </g>
                                                    </svg>
                                                </Link>
                                                <Link to={"#"} className="btn btn-danger light"
                                                    onClick={() => handleDeleteTrainingContent(item._id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <rect x="0" y="0" width="24" height="24"></rect>
                                                            <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fillRule="nonzero"></path>
                                                            <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                                                        </g>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="sm-mb-0 mb-3">
                        <h5 className="mb-0">Showing {indexOfFirstItem} to {Math.min(indexOfLastItem, filteredResults.length>0?filteredResults.length:trainingContents.length)} of {trainingContents.length} entries</h5>
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

export default TrainingContentList;
