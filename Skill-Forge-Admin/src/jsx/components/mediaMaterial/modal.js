// Modal.js
import React from 'react';
import { Modal as BootstrapModal } from "react-bootstrap";

const Modal = ({ show, onHide, title, onSubmit, children }) => {
  return (
    <BootstrapModal show={show} onHide={onHide}>
      <div role="document">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h4 className="modal-title fs-20">{title}</h4>
              <button type="button" className="btn-close" onClick={onHide} data-dismiss="modal"><span></span></button>
            </div>
            <div className="modal-body">
              {children}
            </div>    <div className="modal-footer">
                                            <button type="submit" className="btn btn-success">{title}</button>
                                            <button type="button" className="btn btn-danger" onClick={onHide}>Cancel</button>
                                        </div>
          </form>
        </div>
      </div>
    </BootstrapModal>
  );
};

export default Modal;
