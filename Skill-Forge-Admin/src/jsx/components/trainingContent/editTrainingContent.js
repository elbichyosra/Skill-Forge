import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const EditTrainingContent = () => {
    const token = useSelector((state) => state.auth.token);
    const history = useHistory(); 
    const userId = useSelector((state) => state.auth.userId);
    const { id } = useParams();
    const [formProgress, setFormProgress] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        status: 'available',
        endDate: '',
        image: null
    });
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        // Fetch training content by ID
        const fetchTrainingContent = async () => {
            try {
                if(token){
                const response = await axios.get(`http://localhost:5000/trainingContent/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const trainingContentData = response.data;
                setFormData({
                    title: trainingContentData.title,
                    description: trainingContentData.description,
                    category: trainingContentData.category,
                    status: trainingContentData.status,
                    endDate: trainingContentData.endDate
                   
                });
            }} catch (error) {
                console.error('Error fetching training content:', error);
            }
        };

        fetchTrainingContent();
    }, [id, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            formDataToSend.append('image', formData.image);

            const response = await axios.put(`http://localhost:5000/trainingContent/${id}`, formDataToSend, {
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

            setAlertMessage({ type: 'success', message: 'Training content updated successfully!' });
            setTimeout(() => {
                history.push(`/${id}/media-table`);
            }, 2000);
        } catch (error) {
            console.error('Error updating training content:', error);
            setAlertMessage({ type: 'danger', message: 'Failed to update training content!' });
        }
    };

    return (
        <>
            <div className="d-flex align-items-center mb-4">
                <h4 className="fs-20 font-w600 mb-0 me-auto">Edit Training Content</h4>
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
                                        <input type="file" className="form-control solid"  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
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
                                        <button type="submit" className="btn btn-secondary">Submit</button>
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

export default EditTrainingContent;
