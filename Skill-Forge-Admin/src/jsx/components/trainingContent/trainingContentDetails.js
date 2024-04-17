import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";

const DetailsTraining = () => {
    const { id } = useParams();
    const [trainingContent, setTrainingContent] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchTrainingContent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/trainingContent/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTrainingContent(response.data);
            } catch (error) {
                console.error('Error fetching training content:', error);
            }
        };
        fetchTrainingContent();
    }, [id, token]);

    const formatDate = (dateString) => {
        if (!dateString) {
            return "Not specific";
        }

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (!trainingContent) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h2 className="fs-24 mb-0">Training Content Details</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6"> {/* Increased width for the image */}
                                <img src={`http://localhost:5000/${trainingContent.image}`} alt="Training Content" className="img-fluid rounded" style={{ maxHeight: '300px', width: '100%' }} />
                            </div>
                            <div className="col-md-6"> {/* Reduced width for the text */}
                                <h3 className="fs-34 mb-1 font-weight-bold">{trainingContent.title}</h3>
                                <div className="listline-wrapper mb-3">
                                    {trainingContent.status === 'available' ? (
                                        <span className="badge badge-success">
                                            <i className="fa fa-circle text-success me-1" /> Available
                                        </span>
                                    ) : (
                                        <span className="badge badge-danger">
                                            <i className="fa fa-circle text-danger me-1" /> Not Available
                                        </span>
                                    )}
                                </div>
                                
                                <p className="fs-16 mb-2"><strong>Description:</strong></p>
                                    <p className="fs-16">{trainingContent.description}</p>
                                   
                                   
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                  
                                        <p className="fs-16 mb-2"><strong>Category:</strong> {trainingContent.category}</p>
                                        <p className="fs-16 mb-2"><strong>Deadline:</strong> {formatDate(trainingContent.endDate)}</p>
                                        <p className="fs-16 mb-2"><strong>Created:</strong> {new Date(trainingContent.createdAt).toLocaleString()}</p>
                                        <p className="fs-16 mb-2"><strong>Updated:</strong> {new Date(trainingContent.updatedAt).toLocaleString()}</p>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                      
                        <Link to={`/${trainingContent._id}/media-table`} className="btn btn-primary">View Media Materials</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsTraining;
