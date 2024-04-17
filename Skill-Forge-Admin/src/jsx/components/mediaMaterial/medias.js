// MediaTable.js
import React from 'react';
import MediaItem from './mediaItem';

const MediaTable = ({ mediaMaterials, onDelete, onEdit }) => {
  return (
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
            <MediaItem
              key={mediaMaterial._id}
              mediaMaterial={mediaMaterial}
              onDelete={() => onDelete(mediaMaterial._id)}
              onEdit={() => onEdit(mediaMaterial._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediaTable;
