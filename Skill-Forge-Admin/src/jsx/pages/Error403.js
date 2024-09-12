import React from "react";
import { Link } from "react-router-dom";

const Error403 = ({ handleLogout }) => {
  return (
    <div
      className="authincation h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'white', height: '100vh' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="form-input-content text-center error-page">
              {/* <h5 className="error-text" >403</h5> */}
              <h5>
                {/* <i className="fa fa-times-circle text-danger" /> */}
                 403 Error!
              </h5>
              <p style={{ fontSize: '12px', fontWeight: 'normal' }}>
                You do not have permission to view this resource.
              </p>
              <div>
                <Link className="" to="" onClick={handleLogout}>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error403;
