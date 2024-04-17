import React from 'react';
import { Link } from 'react-router-dom';

const MediaItem = ({ mediaMaterial, onDelete, onEdit }) => {
  return (
    <tr key={mediaMaterial._id}>
      <td>{mediaMaterial.title}</td>
      <td>{mediaMaterial.description.split(' ').slice(0, 7).join(' ')}{mediaMaterial.description.split(' ').length > 7 ? '...' : ''}</td>
      <td>{mediaMaterial.file.split('\\').pop().split('-').slice(1).join('-')}</td>
      <td className="text-center">
        <div className="justify-content-end">
          <Link to={`/${mediaMaterial._id}/media-details`} className="btn btn-info shadow btn-xs sharp me-1">
            <i className="fas fa-eye"></i>
          </Link>
          <button onClick={onEdit} className="btn btn-primary shadow btn-xs sharp me-1">
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button onClick={onDelete} className="btn btn-danger shadow btn-xs sharp">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MediaItem;

