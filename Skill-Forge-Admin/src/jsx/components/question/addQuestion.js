import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const AddQuestion = () => {
    const { quizId } = useParams();
    const userId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const history = useHistory();
    const [formData, setFormData] = useState({
        questionText: '',
        options: [''],
        answer: '',
        quiz: quizId,
      
    });
    const [alertMessage, setAlertMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({ ...formData, options: newOptions });
    };

    const addOption = () => {
        setFormData({ ...formData, options: [...formData.options, ''] });
    };

    const removeOption = (index) => {
        const newOptions = formData.options.filter((_, i) => i !== index);
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
              // Check if the answer is in the options list
          if (!formData.options.includes(formData.answer)) {
            setAlertMessage({ type: 'danger', message: 'Answer must be one of the options!' });
            return;
        }

            const response = await axios.post('http://localhost:5000/question/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setAlertMessage({ type: 'success', message: 'Question created successfully!' });
            setFormData({
                questionText: '',
                options: [''],
                answer: '',
                quiz: quizId,
          
            });

            setTimeout(() => {
                history.push(`/${quizId}/quiz-questions`);
            }, 1000);
        } catch (error) {
            console.error('Error creating question:', error);
            setAlertMessage({ type: 'danger', message: 'Failed to create question!' });
        } finally {
            setTimeout(() => {
                setAlertMessage(null);
            }, 2000);
        }
    };

    return (
        <>
            <div className="d-flex align-items-center mb-4">
                <h4 className="fs-20 font-w600 mb-0 me-auto">New Question</h4>
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
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-xl-12 mb-4">
                                        <label className="form-label font-w600">Question Text<span className="text-danger scale5 ms-2">*</span></label>
                                        <input type="text" className="form-control solid" name="questionText" value={formData.questionText} onChange={handleChange} required />
                                    </div>
                                    <div className="col-xl-12 mb-4">
                                        <label className="form-label font-w600">Answer<span className="text-danger scale5 ms-2">*</span></label>
                                        <input type="text" className="form-control solid" name="answer" value={formData.answer} onChange={handleChange} required />
                                    </div>
                               
                                    <div className="col-xl-12 mb-4">
                                        <label className="form-label font-w600">Options<span className="text-danger scale5 ms-2">*</span></label>
                                        {formData.options.map((option, index) => (
                                            <div key={index} className="mb-2 d-flex">
                                                <input
                                                    type="text"
                                                    className="form-control solid me-2"
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    required
                                                />
                                                {index === formData.options.length - 1 && (
                                                    <button type="button" className="btn btn-primary me-2" onClick={addOption}>
                                                        +
                                                    </button>
                                                )}
                                                {formData.options.length > 1 && (
                                                    <button type="button" className="btn btn-danger" onClick={() => removeOption(index)}>
                                                        -
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-footer text-end">
                                    <div>
                                        <Link to={`/${quizId}/quiz-questions`} className="btn btn-primary me-3">Cancel</Link>
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

export default AddQuestion;
