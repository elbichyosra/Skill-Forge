import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Badge, Alert } from "react-bootstrap";
import MediaItem from './mediaItem';
import Modal from './modal';
import MediaForm from './mediaForm';



const MediaList = () => {
    const { trainingContentId } = useParams();
    const [mediaMaterials, setMediaMaterials] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const [addCard, setAddCard] = useState(false); // State to control modal visibility
    const [newMediaMaterial, setNewMediaMaterial] = useState({
        title: '',
        description: '',
        file: null
    });
    const [editModal, setEditModal] = useState(false); // State to control edit modal visibility
    const [editMediaMaterial, setEditMediaMaterial] = useState({
        title: '',
        description: '',
        file: null
    });
    const token = useSelector((state) => state.auth.token);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    useEffect(() => {
        const fetchMediaMaterials = async () => {
            if (token && trainingContentId) {
                try {
                    const response = await axios.get(`http://localhost:5000/mediaMaterial/getByTraining/${trainingContentId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setMediaMaterials(response.data);
                } catch (error) {
                    console.error('Error fetching media material:', error);
                }
            }
        };
        fetchMediaMaterials();
    }, [token, trainingContentId]);

    const handleAddFormChange = (e) => {
        setNewMediaMaterial({
            ...newMediaMaterial,
            [e.target.name]: e.target.value
        });
    };

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', newMediaMaterial.file);
            formData.append('title', newMediaMaterial.title);
            formData.append('description', newMediaMaterial.description);
           
            formData.append('trainingContent', trainingContentId);
            const response = await axios.post('http://localhost:5000/mediaMaterial/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMediaMaterials([...mediaMaterials, response.data]);
            setAddCard(false);
            setAlertMessage({ type: 'success', message: 'Media material added successfully!' });
            setNewMediaMaterial({
                title: '',
                description: '',
                file: null
            });
        } catch (error) {
            console.error('Error adding media material:', error);
            setAlertMessage({ type: 'danger', message: 'Error adding media material!' });
        }
        finally {
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        }
    };

    const handleFileChange = (e) => {
        setNewMediaMaterial({
            ...newMediaMaterial,
            file: e.target.files[0]
        });
    };

    const handleDeleteMediaMaterial = async (deletedId) => {
        try {
            await axios.delete(`http://localhost:5000/mediaMaterial/${deletedId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMediaMaterials(mediaMaterials.filter(content => content._id !== deletedId));
            setAlertMessage({ type: 'success', message: 'Media material deleted successfully!' });
        } catch (error) {
            console.error('Error deleting media material:', error);
            setAlertMessage({ type: 'danger', message: 'Error deleting media material!' });
        }
        finally {
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        }
    };

    const handleEditModal = async (mediaMaterialId) => {
        try {
            const response = await axios.get(`http://localhost:5000/mediaMaterial/${mediaMaterialId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEditMediaMaterial(response.data);
            setEditModal(true);
        } catch (error) {
            console.error('Error fetching media material for editing:', error);
        }
    };

    const handleEditFormChange = (e) => {
        setEditMediaMaterial({
            ...editMediaMaterial,
            [e.target.name]: e.target.value
        });
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/mediaMaterial/${editMediaMaterial._id}`, editMediaMaterial, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const updatedMediaMaterials = mediaMaterials.map(mediaMaterial =>
                mediaMaterial._id === response.data._id ? response.data : mediaMaterial
            );
            setMediaMaterials(updatedMediaMaterials);
            setEditModal(false);
            setAlertMessage({ type: 'success', message: 'Media material updated successfully!' });
        } catch (error) {
            console.error('Error updating media material:', error);
            setAlertMessage({ type: 'danger', message: 'Error updating media material!' });
        }
        finally {
            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        }
    };

    const handleFileChange2 = (e) => {
        setEditMediaMaterial({
            ...editMediaMaterial,
            file: e.target.files[0]
        });
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = Math.min(indexOfLastItem - itemsPerPage + 1, mediaMaterials.length);
    const itemsToDisplay = searchInput.length > 1 ? filteredResults : mediaMaterials;
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
            const filteredData = mediaMaterials.filter((item) => {
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
        <h4 className="fs-20 font-w600">Medias List</h4>

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
        <Link to={"#"} className="btn btn-primary me-3 btn-sm" onClick={() => setAddCard(true)}>
                            <i className="fas fa-plus me-2"></i>Add New Media 
                        </Link>
        </div>
      </div>
            <div className="col-12">
                <div className="card">
                  
                    <div>
                        <Modal show={addCard} onHide={() => setAddCard(false)} title="Add" onSubmit={handleAddFormSubmit}>
                            <MediaForm values={newMediaMaterial} onChange={handleAddFormChange} handleFile={handleFileChange} />
                        </Modal>
                        <Modal show={editModal} onHide={() => setEditModal(false)} title="Edit" onSubmit={handleEditFormSubmit}>
                            <MediaForm values={editMediaMaterial} onChange={handleEditFormChange} handleFile={handleFileChange2} />
                        </Modal>
                    </div>
                    <div className="card-body">
                        {/* <MediaTable
                            mediaMaterials={mediaMaterials}
                            onDelete={handleDeleteMediaMaterial}
                            onEdit={handleEditModal}
                        /> */}
                         <div className="w-100 table-responsive">
      <table id="example" className="display w-100 dataTable">
        <thead>
          <tr role="row">
            <th>Title</th>
            <th>Description</th>
            <th>File</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((item) => (
            <MediaItem
              key={item._id}
              mediaMaterial={item}
              onDelete={() => handleDeleteMediaMaterial(item._id)}
              onEdit={() => handleEditModal(item._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
                    </div>
                
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="sm-mb-0 mb-3">
                        <h5 className="mb-0">Showing {indexOfFirstItem} to {Math.min(indexOfLastItem, filteredResults.length>0?filteredResults.length:mediaMaterials.length)} of {mediaMaterials.length} entries</h5>
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

export default MediaList;
