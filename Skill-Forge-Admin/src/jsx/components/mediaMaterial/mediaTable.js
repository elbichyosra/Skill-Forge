import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Badge, Alert } from "react-bootstrap";
import MediaItem from './mediaItem';
import Modal from './modal';
import MediaForm from './mediaForm';
import MediaTable from './medias';

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

    return (
        <>
            {alertMessage && (
                <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible={false} show={true}>
                    {alertMessage.message}
                </Alert>
            )}
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Media Material List</h4>
                        <Link to={"#"} className="btn btn-primary me-3 btn-sm" onClick={() => setAddCard(true)}>
                            <i className="fas fa-plus me-2"></i>Add New Media 
                        </Link>
                    </div>
                    <div>
                        <Modal show={addCard} onHide={() => setAddCard(false)} title="Add" onSubmit={handleAddFormSubmit}>
                            <MediaForm values={newMediaMaterial} onChange={handleAddFormChange} handleFile={handleFileChange} />
                        </Modal>
                        <Modal show={editModal} onHide={() => setEditModal(false)} title="Edit" onSubmit={handleEditFormSubmit}>
                            <MediaForm values={editMediaMaterial} onChange={handleEditFormChange} handleFile={handleFileChange2} />
                        </Modal>
                    </div>
                    <div className="card-body">
                        <MediaTable
                            mediaMaterials={mediaMaterials}
                            onDelete={handleDeleteMediaMaterial}
                            onEdit={handleEditModal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MediaList;
