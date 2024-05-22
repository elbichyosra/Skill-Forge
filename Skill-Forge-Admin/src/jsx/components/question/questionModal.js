import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { FaCalendarAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './questionModal.css';  // Import the CSS file

const QuestionModal = ({ show, onHide, question }) => {
  return (
    <BootstrapModal show={show} onHide={onHide} centered>
      <div role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fs-20">Question Details</h4>
            <button type="button" className="btn-close" onClick={onHide} data-dismiss="modal">
              <span></span>
            </button>
          </div>
          <div className="modal-body">
            {question ? (
              <div>
                <p><strong>Question Text:</strong> {question.questionText}</p>
                <div className="options-list">
                  <strong>Options:</strong>
                  <ul>
                    {question.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                </div>
                <p><strong>Answer:</strong> {question.answer}</p>
                <p><FaCalendarAlt /> <strong>Created At:</strong> {new Date(question.createdAt).toLocaleDateString()}</p>
                <p><FaEdit /> <strong>Updated At:</strong> {new Date(question.updatedAt).toLocaleDateString()}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="modal-footer">
            {/* <Link to={`/question/${question._id}/edit`} className="btn btn-warning">Edit Question</Link> */}
          </div>
        </div>
      </div>
    </BootstrapModal>
  );
};

export default QuestionModal;
