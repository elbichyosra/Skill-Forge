import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MediaItem = ({ mediaMaterial, onDelete, token }) => {
  

    return (
        <tr>
            <td>{mediaMaterial.title}</td>
            <td>{mediaMaterial.description}</td>
            <td>{mediaMaterial.file.split('\\').pop().split('-').slice(1).join('-')}</td>
            <td className="text-center">
                <div className="justify-content-end">
                    <Link to="#" className="btn btn-primary shadow btn-xs sharp me-1">
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                    <button onClick={onDelete} className="btn btn-danger shadow btn-xs sharp">
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default MediaItem;
