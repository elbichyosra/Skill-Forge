import React from 'react';
import {Link} from 'react-router-dom';

import user from './../../../images/user.jpg';

const UserProfile = () => {
		return(
		<>
			<div className="d-flex align-items-center mb-4">
				<h4 className="fs-20 font-w600 mb-0 me-auto">User Profile</h4>
				<div>
					<Link to={"#"} className="btn btn-secondary btn-sm me-3" > <i className="fas fa-envelope"></i></Link>
					<Link to={"#"} className="btn btn-secondary btn-sm me-3" ><i className="fas fa-phone-alt"></i></Link>
					<Link to={"#"} className="btn btn-primary btn-sm" ><i className="fas fa-info"></i></Link>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<div className="card">
						<div className="card-header border-0 flex-wrap align-items-start">
							<div className="col-md-8">
								<div className="user d-sm-flex d-block pe-md-5 pe-0">
									<img src={user} alt="" />
									<div className="ms-sm-3 ms-0 me-md-5 md-0">
										<h5 className="mb-1 font-w600"><Link to={"#"}>Andrew Jonson</Link></h5>
										<div className="listline-wrapper mb-2">
											<span className="item"><i className="far fa-envelope"></i>example@example.com</span>
											<span className="item"><i className="far fa-id-badge"></i>Manager</span>
											<span className="item"><i className="fas fa-map-marker-alt"></i>Indonesia</span>
										</div>
										<p>A data analyst collects, interprets and visualizes data to uncover insights. A data analyst assigns a numerical value to business functions so performance.</p>
									</div>
								</div>
							</div>
							<div className="col-md-4 col-12 text-end">	
								<Link to={"#"} className="btn btn-sm btn-primary me-2">Ask</Link>
								<Link to={"#"} className="btn btn-sm btn-info">Hire</Link>
								<div className="mt-3">
									<h6 className="text-start">Progress
										<span className="float-end">85%</span>
									</h6>
									<div className="progress ">
										<div className="progress-bar bg-danger progress-animated" style={{width: "85%", height:"6px"}} role="progressbar">
											<span className="sr-only">60% Complete</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card-body pt-0">
							<h4 className="fs-20">Description</h4>
							<div className="row">
								<div className="col-xl-6 col-md-6">
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Full Name : </span><span className="font-w400">Andrew Jonson</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Resume Title : </span><span className="font-w400">Searching For PHP Doveloper</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Current Designation : </span><span className="font-w400">PHP Programmer</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Annual Salary : </span><span className="font-w400">$7.5Lacs</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Current Company : </span><span className="font-w400">Abcd pvt Ltd</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Experience : </span><span className="font-w400">3 Yrs</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Location :</span> <span className="font-w400">USA</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Preferred Location : </span><span className="font-w400">USA</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Qualification: </span><span className="font-w400">B.Tech(CSE)</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Key Skills: </span><span className="font-w400">Good Communication, Planning and research skills</span></p>
								</div>
								<div className="col-xl-6 col-md-6">
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Launguages :</span> <span className="font-w400">English, German, Spanish</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Email :</span> <span className="font-w400">andrew@gmail.com</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Phone : </span><span className="font-w400">1234598765</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Industry :</span> <span className="font-w400">it Software/ Developer</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Date Of Birth : </span><span className="font-w400">13 June 1996</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Gender : </span><span className="font-w400">Female</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Marital Status : </span><span className="font-w400">Unmarried</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Permanent Address :</span> <span className="font-w400">USA</span></p>
									<p className="font-w600 mb-2 d-flex"><span className="custom-label-2">Zip code: </span><span className="font-w400">12345</span></p>
								</div>
							</div>
						</div>
						<div className="card-footer d-flex flex-wrap justify-content-between">
							<div className="mb-md-2 mb-3">
								<span className="d-block mb-1"><i className="fas fa-circle me-2"></i>Currently Working at  <strong>Abcd Pvt Ltd</strong></span>
								<span><i className="fas fa-circle me-2"></i>3 Yrs Of Working Experience in   <strong>Abcd Pvt Ltd</strong></span>
							</div>
							<div>
								<Link to={"#"} className="btn btn-primary btn-md me-2  mb-2"><i className="fas fa-download me-2"></i>Download Ruseme</Link>
								<Link to={"#"} className="btn btn-warning btn-md me-2 mb-2"><i className="fas fa-share-alt me-2"></i>Share Profile</Link>
								<Link to={"#"} className="btn btn-info btn-md me-2 mb-2"><i className="fas fa-phone-alt me-2"></i>Contact</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)	
}
export default UserProfile;