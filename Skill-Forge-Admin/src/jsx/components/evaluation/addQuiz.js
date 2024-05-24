import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const AddQuiz = () => {
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);
    const history = useHistory();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        passingScore: 70,  // Default passing score
        duration: '',  // Duration in minutes
        trainingContent: '',  // Selected training content ID
        creator: userId  // Creator ID
    });
    const [trainingContents, setTrainingContents] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        // Fetch training content options
        const fetchTrainingContents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/trainingContent/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setTrainingContents(response.data);
            } catch (error) {
                console.error('Error fetching training content:', error);
            }
        };
        fetchTrainingContents();
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.passingScore <= 0 || formData.duration <= 0) {
            setAlertMessage({ type: 'danger', message: 'Passing Score and Duration must be positive numbers.' });
            return;
        }

        setAlertMessage(null);
        try {
            const response = await axios.post('http://localhost:5000/quiz/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setAlertMessage({ type: 'success', message: 'Quiz created successfully!' });
            setFormData({
                title: '',
                description: '',
                passingScore: 70,
                duration: '',
                trainingContent: '',
                creator: userId
            });

            setTimeout(() => {
                history.push('/quizzes-table');
            }, 2000);
        }  catch (error) {
            setAlertMessage({ type: 'danger', message: error.response.data.message || 'Error creating quiz' });
        } finally {
            setTimeout(() => {
                setAlertMessage(null);
            }, 2000);
        }
    };

    return (
        <>
            {alertMessage && (
                <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible={false} show={true}>
                    {alertMessage.message}
                </Alert>
            )}

            <div className="row justify-content-center">
                <div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">New Quiz</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Passing Score</label>
                                    <input type="number" className="form-control" name="passingScore" value={formData.passingScore} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Duration (minutes)</label>
                                    <input type="number" className="form-control" name="duration" value={formData.duration} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Training Content</label>
                                    <select className="form-select" name="trainingContent" value={formData.trainingContent} onChange={handleChange}>
                                        <option value="">Select Training Content</option>
                                        {trainingContents.map(training => (
                                            <option key={training._id} value={training._id}>{training.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="card-footer text-end">
                                    <div>
                                        <Link to="/quizzes-table" className="btn btn-primary me-3">Cancel</Link>
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

export default AddQuiz;
