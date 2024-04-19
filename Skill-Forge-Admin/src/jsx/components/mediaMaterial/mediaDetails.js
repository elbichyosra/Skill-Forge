import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";

const MediaDetails = () => {
    const { id } = useParams();
    const [mediaMaterial, setMediaMaterial] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchMediaMaterial = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/mediaMaterial/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMediaMaterial(response.data);
            } catch (error) {
                console.error('Error fetching media material:', error);
            }
        };
        fetchMediaMaterial();
    }, [id, token]);

    if (!mediaMaterial) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h2 className="fs-24 mb-3">Media Material Details</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                {mediaMaterial.file.includes('.pdf') ? (
                                    <embed src={`http://localhost:5000/${mediaMaterial.file}`} type="application/pdf" width="100%" height="600px" />
                                ) : mediaMaterial.file.includes('.mp4') ? (
                                    <video controls src={`http://localhost:5000/${mediaMaterial.file}`} className="img-fluid rounded" style={{ maxHeight: '300px', width: '100%' }} />
                                ) :(<></>)
                                // : (
                                //     <img src={`http://localhost:5000/${mediaMaterial.file}`} alt="Media Material" className="img-fluid rounded" style={{ maxHeight: '300px', width: '100%' }} />
                                // )
                                }
                            </div>
                            <div className="col-md-6">
                                <h3 className="fs-34 mb-4 mt-3 font-weight-bold">{mediaMaterial.title}</h3>
                                <p className="fs-16 mb-2"><strong>Description:</strong> {mediaMaterial.description}</p>
                                
                                <p className="fs-16 mb-2"><strong>Created:</strong> {new Date(mediaMaterial.createdAt).toLocaleString()}</p>
                                <p className="fs-16 mb-2"><strong>Updated:</strong> {new Date(mediaMaterial.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                        <Link to={`/${mediaMaterial.trainingContent}/media-table`} className="btn btn-primary me-2">Back</Link>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaDetails;
