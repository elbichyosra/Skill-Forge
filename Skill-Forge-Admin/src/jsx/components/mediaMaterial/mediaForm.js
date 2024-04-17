// MediaForm.js
import React from 'react';

const MediaForm = ({ onSubmit, onChange, values ,handleFile}) => {
  return (
    <div className="add-contact-box">
      <div className="add-contact-content">
        <div className="form-group mb-3">
          <label className="text-black font-w500">Title</label>
          <input type="text" className="form-control" name="title" value={values.title} onChange={onChange} required />
        </div>
        <div className="form-group mb-3">
          <label className="text-black font-w500">Description</label>
          <textarea className="form-control" name="description" value={values.description} onChange={onChange} ></textarea>
        </div>
        <div className="form-group mb-3">
          <label className="text-black font-w500">File</label>
          <input type="file" accept="image/jpeg, image/png, video/mp4, application/pdf" className="form-control" name="file" onChange={handleFile} required/>
          <small className="text-muted">Seuls les fichiers JPEG, PNG, MP4 et PDF sont acceptés.</small>
        </div>
      </div>
    </div>
  );
};

export default MediaForm;
