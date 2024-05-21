import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const EditQuiz = () => {
    const { id } = useParams();  // Get quiz ID from URL
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);
    const history = useHistory();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        passingScore: 70,  // Default passing score
        duration: '',  // Duration in minutes
        creator: userId  // Creator ID
    });
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/quiz/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFormData(response.data);
            } catch (error) {
                setAlertMessage({ type: 'danger', message: error.response.data.message || 'Error fetching quiz details' });
            }
        };
        fetchQuiz();
    }, [id, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.passingScore <= 0 || formData.duration <= 0) {
            setAlertMessage({ type: 'danger', message: 'Passing Score and Duration must be positive numbers.' });
            setTimeout(() => {
                setAlertMessage(null);
            }, 2000);
            return;
        }

        setAlertMessage(null);
        try {
            const response = await axios.put(`http://localhost:5000/quiz/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setAlertMessage({ type: 'success', message: 'Quiz updated successfully!' });
            setTimeout(() => {
                history.push('/quizzes-table');
            }, 2000);
        } catch (error) {
            setAlertMessage({ type: 'danger', message: error.response.data.message || 'Error updating quiz' });
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
                            <h2 className="text-center mb-4">Edit Quiz</h2>
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

export default EditQuiz;
