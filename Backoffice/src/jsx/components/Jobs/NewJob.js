import React from 'react';
import {Link} from 'react-router-dom';


const NewJob = () => {
		return(
		<>
			<div className="d-flex align-items-center mb-4">
				<h4 className="fs-20 font-w600 mb-0 me-auto">New Job</h4>
				<div>
					<Link to={"#"} className="btn btn-secondary btn-sm me-3"> <i className="fas fa-envelope"></i></Link>
					<Link to={"#"} className="btn btn-secondary btn-sm me-3"><i className="fas fa-phone-alt"></i></Link>
					<Link to={"#"} className="btn btn-primary btn-sm"><i className="fas fa-info"></i></Link>
				</div>
			</div>		
			<div className="row">
				<div className="col-xl-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-xl-6  col-md-6 mb-4">
								  <label  className="form-label font-w600">Company Name<span className="text-danger scale5 ms-2">*</span></label>
									<input type="text" className="form-control solid" placeholder="Name" aria-label="name" />
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
								  <label  className="form-label font-w600">Position<span className="text-danger scale5 ms-2">*</span></label>
									<input type="text" className="form-control solid" placeholder="Name" aria-label="name" />
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
									<label  className="form-label font-w600">Job Category<span className="text-danger scale5 ms-2">*</span></label>
									<select  className="form-select form-control solid">
										<option defaultValue>Choose...</option>
										<option>QA Analyst</option>
										<option>IT Manager</option>
										<option>Systems Analyst</option>
									</select>
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
									<label  className="form-label font-w600">Job Type<span className="text-danger scale5 ms-2">*</span></label>
									<select  className="form-select form-control solid">
										<option defaultValue>Choose...</option>
										<option>Part-Time</option>
										<option>Full-Time</option>
										<option>Freelancer</option>
									</select>
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
								  <label  className="form-label font-w600">No. of Vancancy<span className="text-danger scale5 ms-2">*</span></label>
									<input type="text" className="form-control solid" placeholder="Name" aria-label="name" />
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
									<label  className="form-label font-w600">Select Experience<span className="text-danger scale5 ms-2">*</span></label>
									<select  className="form-select form-control solid">
									  <option defaultValue>1 yr</option>
									  <option>2 Yr</option>
									   <option>3 Yr</option>
										<option>4 Yr</option>
									</select>
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
									<label  className="form-label font-w600">Posted Date<span className="text-danger scale5 ms-2">*</span></label>
									<div className="input-group">
										 <div className="input-group-text"><i className="far fa-clock"></i></div>
										<input size="16" type="text" defaultValue="2012-06-15" readOnly className="form-control form_datetime solid" />
									</div>
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
									<label  className="form-label font-w600">Last Date To Apply<span className="text-danger scale5 ms-2">*</span></label>
									<div className="input-group">
										 <div className="input-group-text"><i className="far fa-clock"></i></div>
										<input size="16" type="text" defaultValue="2012-06-15" readOnly className="form-control form_datetime solid" />
									</div>
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
									<label  className="form-label font-w600">Close Date<span className="text-danger scale5 ms-2">*</span></label>
									<div className="input-group">
										 <div className="input-group-text"><i className="far fa-clock"></i></div>
										<input size="16" type="text" defaultValue="2012-06-15" readOnly className="form-control form_datetime solid" />
									</div>
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
									<label  className="form-label font-w600">Select Gender:<span className="text-danger scale5 ms-2">*</span></label>
									<select  className="form-select form-control solid">
									  <option defaultValue>Choose...</option>
									  <option>Male</option>
									   <option>Female</option>
									</select>
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
								  <label  className="form-label font-w600">Salary Form<span className="text-danger scale5 ms-2">*</span></label>
									<input type="text" className="form-control solid" placeholder="$" aria-label="name" />
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
								  <label  className="form-label font-w600">Salary To<span className="text-danger scale5 ms-2">*</span></label>
									<input type="text" className="form-control solid" placeholder="$" aria-label="name" />
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
								  <label  className="form-label font-w600">Enter City:<span className="text-danger scale5 ms-2">*</span></label>
									<input type="text" className="form-control solid" placeholder="$" aria-label="name" />
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
								  <label  className="form-label font-w600">Enter State:<span className="text-danger scale5 ms-2">*</span></label>
									<input type="text" className="form-control solid" placeholder="State" aria-label="name" />
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
								  <label  className="form-label font-w600">Enter Counter:<span className="text-danger scale5 ms-2">*</span></label>
									<input type="text" className="form-control solid" placeholder="State" aria-label="name" />
								</div>
								<div className="col-xl-6  col-md-6 mb-4">
								  <label  className="form-label font-w600">Enter Education Level:<span className="text-danger scale5 ms-2">*</span></label>
									<input type="text" className="form-control solid" placeholder="Education Level" aria-label="name" />
								</div>
								<div className="col-xl-12 mb-4">
									<label  className="form-label font-w600">Description:<span className="text-danger scale5 ms-2">*</span></label>
									<textarea className="form-control solid" aria-label="With textarea"></textarea>
								</div>
							</div>
							<div>
								<span>Status:<label className="radio-inline mx-3"><input type="radio" name="optradio" /> Active</label></span>
								<span><label className="radio-inline me-3"><input type="radio" name="optradio" /> In Active</label></span>
							</div>
						</div>
						<div className="card-footer text-end">
							<div>
								<Link to={"#"} className="btn btn-primary me-3">Close</Link>
								<Link to={"#"} className="btn btn-secondary">Submit</Link>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</>
	)	
}
export default NewJob;