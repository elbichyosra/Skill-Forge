import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Badge, Alert, Modal } from "react-bootstrap";

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
            // Utiliser setTimeout une seule fois après chaque ajout ou suppression
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

    const handleDeleteMediaMaterials = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/mediaMaterial/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMediaMaterials(mediaMaterials.filter(content => content._id !== id));
            setAlertMessage({ type: 'success', message: 'Media material deleted successfully!' });
           
        } catch (error) {
            console.error('Error deleting media material:', error);
            setAlertMessage({ type: 'danger', message: 'Error deleting media material!' });
          
        }
     finally {
        // Utiliser setTimeout une seule fois après chaque ajout ou suppression
        setTimeout(() => {
            setAlertMessage(null);
        }, 3000);
    }
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
                            <i className="fas fa-plus me-2"></i>Add New Media Material
                        </Link>
                    </div>
                    <div>
                       
                        <Modal show={addCard} onHide={() => setAddCard(false)}>
                            <div role="document">
                                <div className="modal-content">
                                    <form onSubmit={handleAddFormSubmit}>
                                        <div className="modal-header">
                                            <h4 className="modal-title fs-20">Add Media Material</h4>
                                            <button type="button" className="btn-close" onClick={() => setAddCard(false)} data-dismiss="modal"><span></span></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="add-contact-box">
                                                <div className="add-contact-content">
                                                    <div className="form-group mb-3">
                                                        <label className="text-black font-w500">Title</label>
                                                        <input type="text" className="form-control" name="title" value={newMediaMaterial.title} onChange={handleAddFormChange} required />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label className="text-black font-w500">Description</label>
                                                        <textarea className="form-control" name="description" value={newMediaMaterial.description} onChange={handleAddFormChange} required></textarea>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label className="text-black font-w500">File</label>
                                                        <input type="file" className="form-control" name="file" onChange={handleFileChange} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-success">Add</button>
                                            <button type="button" className="btn btn-danger" onClick={() => setAddCard(false)}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <div className="card-body">
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
                                    {mediaMaterials.map((mediaMaterial) => (
                                        <tr key={mediaMaterial._id}>
                                            <td>{mediaMaterial.title}</td>
                                            <td>{mediaMaterial.description}</td>
                                            <td>{mediaMaterial.file.split('\\').pop().split('-').slice(1).join('-')}</td>
                                            <td className="text-center">
                                                <div className="justify-content-end">
                                                    <Link to="#" className="btn btn-primary shadow btn-xs sharp me-1">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </Link>
                                                    <button onClick={() => handleDeleteMediaMaterials(mediaMaterial._id)} className="btn btn-danger shadow btn-xs sharp">
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MediaList;
