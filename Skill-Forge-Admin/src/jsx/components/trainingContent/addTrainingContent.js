import React, { useState } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const AddTrainingContent = () => {
    const token = useSelector((state) => state.auth.token);
    const history = useHistory(); 
    const userId = useSelector((state) => state.auth.userId);
    const [formProgress, setFormProgress] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        status: 'available',
        endDate: '',
        userId: userId,
        image: null
    });
    const [alertMessage, setAlertMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('status', formData.status);
            formDataToSend.append('endDate', formData.endDate);
            formDataToSend.append('userId', userId);
            formDataToSend.append('image', formData.image);
            
          
            const response = await axios.post('http://localhost:5000/trainingContent/', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percentCompleted = Math.round((loaded * 100) / total);
                    setFormProgress(percentCompleted);
                  },
          
            });

            setAlertMessage({ type: 'success', message: 'Training content created successfully!' });
            setFormData({
                title: '',
                description: '',
                category: '',
                status: 'available',
                endDate: '',
                image: null
            });

           
            setFormProgress(0)
            setTimeout(() => {
                const trainingContentId = response.data._id;
                history.push(`/${trainingContentId}/media-table`);
            }, 2000);
        } catch (error) {
            console.error('Error creating training content:', error);
            setAlertMessage({ type: 'danger', message: 'Failed to create training content!' });

          
        }
        finally {
            // Utiliser setTimeout une seule fois après chaque ajout ou suppression
            setTimeout(() => {
                setAlertMessage(null);
            }, 2000);
        }
    };

    return (
        <>
            <div className="d-flex align-items-center mb-4">
                <h4 className="fs-20 font-w600 mb-0 me-auto">New Training Content</h4>
            </div>
            {alertMessage && (
                <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible={false} show={true}>
                    {alertMessage.message}
                </Alert>
            )}
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row"></div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <label className="form-label font-w600">Title<span className="text-danger scale5 ms-2">*</span></label>
                                        <input type="text" className="form-control solid" name="title" value={formData.title} onChange={handleChange} required />
                                    </div>
                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <label className="form-label font-w600">Category<span className="text-danger scale5 ms-2">*</span></label>
                                        <input type="text" className="form-control solid" name="category" value={formData.category} onChange={handleChange} required />
                                    </div>
                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <label className="form-label font-w600">Status<span className="text-danger scale5 ms-2">*</span></label>
                                        <select className="form-select form-control solid" name="status" value={formData.status} onChange={handleChange}>
                                            <option value="available">Available</option>
                                            <option value="unavailable">Unavailable</option>
                                        </select>
                                    </div>
                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <label className="form-label font-w600">End Date<span className="text-danger scale5 ms-2">*</span></label>
                                        <input type="date" className="form-control solid" name="endDate" value={formData.endDate} onChange={handleChange} />
                                    </div>

                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <label className="form-label font-w600">Description<span className="text-danger scale5 ms-2">*</span></label>
                                        <textarea className="form-control solid" name="description" value={formData.description} onChange={handleChange}></textarea>
                                    </div>
                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <label className="form-label font-w600">Image<span className="text-danger scale5 ms-2">*</span></label>
                                        <input type="file" className="form-control solid" onChange={handleImageChange} />
                                    </div>
                                    {formProgress > 0 && formData.image && (
                                     <div className="col-12">
                                        <div className="progress" style={{ height: '20px', marginBottom: '20px' }}>
                                         <div className="progress-bar" role="progressbar" style={{ width: `${formProgress}%` }} aria-valuenow={formProgress} aria-valuemin="0" aria-valuemax="100"></div>
                                           </div>
                                        </div>
                                             )}
                                </div>
                                <div className="card-footer text-end">
                                    <div>
                                        <Link to="/training-table" className="btn btn-primary me-3">Cancel</Link>
                                        <button type="submit" to="/media-table" className="btn btn-secondary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTrainingContent;
