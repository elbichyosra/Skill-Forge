// Modal.js
import React from 'react';
import { Modal as BootstrapModal } from "react-bootstrap";
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';

const Modal = ({ show, onHide, quiz }) => {
  return (
    <BootstrapModal show={show} onHide={onHide}>
      <div role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fs-20">Quiz details</h4>
            <button type="button" className="btn-close" onClick={onHide} data-dismiss="modal"><span></span></button>
          </div>
          <div className="modal-body">
            {quiz ? (
              <div>
                <p><strong>Title:</strong> {quiz.title}</p>
                <p><strong>Description:</strong> {quiz.description}</p>
                <p><strong>Passing Score:</strong> {quiz.passingScore}</p>
                <p><strong>Duration:</strong> {quiz.duration ? `${quiz.duration} mins` : 'N/A'}</p>
                <p><FaCalendarAlt /> <strong>Created At:</strong> {new Date(quiz.createdAt).toLocaleDateString()}</p>
                <p><FaEdit /> <strong>Updated At:</strong> {new Date(quiz.updatedAt).toLocaleDateString()}</p>
              </div>
            ) : <p>Loading...</p>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onHide}>Cancel</button>
          </div>
        </div>
      </div>
    </BootstrapModal>
  );
};

export default Modal;
