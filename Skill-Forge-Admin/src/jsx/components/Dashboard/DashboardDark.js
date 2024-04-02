import React,{useState,useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown} from 'react-bootstrap';

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import VacanyTab from '../Jobick/Home/VacanyTab';
import CanvasChartTab from '../Jobick/Home/CanvasChartTab';
import FeaturedCompanies from '../Jobick/Home/FeaturedCompanies';
import RecentActivity from '../Jobick/Home/RecentActivity';
import HomeSlider from '../Jobick/Home/HomeSlider';

//Images
import pic1 from './../../../images/profile/pic1.jpg';

//Components
const NewCustomers1 = loadable(() =>
	pMinDelay(import("../Jobick/Home/NewCustomers1"), 1000)
);
const NewCustomers2 = loadable(() =>
	pMinDelay(import("../Jobick/Home/NewCustomers2"), 1000)
);
const NewCustomers3 = loadable(() =>
	pMinDelay(import("../Jobick/Home/NewCustomers3"), 1000)
);
const NewCustomers4 = loadable(() =>
	pMinDelay(import("../Jobick/Home/NewCustomers4"), 1000)
);
const ApexPieChart = loadable(() =>
	pMinDelay(import("../Jobick/Home/ApexPieChart"), 1000)
);


const DashboardDark = () => {	
	const { changeBackground, background } = useContext(ThemeContext);
	  useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);
	const [control3, setControl3] = useState('Newest');
	return(
		<>
			<div className="row">
				<div className="col-xl-6">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-body">
									<div className="row separate-row">
										<div className="col-sm-6">
											<div className="job-icon pb-4 d-flex justify-content-between">
												<div>
													<div className="d-flex align-items-center mb-1">
														<h2 className="mb-0">342</h2>
														<span className="text-success ms-3">+0.5 %</span>
													</div>	
													<span className="fs-14 d-block mb-2">Interview Schedules</span>
												</div>	
												<div id="NewCustomers">
													<NewCustomers1 />
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="job-icon pb-4 pt-4 pt-sm-0 d-flex justify-content-between">
												<div>
													<div className="d-flex align-items-center mb-1">
														<h2 className="mb-0">984</h2>
													</div>	
													<span className="fs-14 d-block mb-2">Application Sent</span>
												</div>	
												<div id="NewCustomers1">
													<NewCustomers2 />
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="job-icon pt-4 pb-sm-0 pb-4 pe-3 d-flex justify-content-between">
												<div>
													<div className="d-flex align-items-center mb-1">
														<h2 className="mb-0">1,567k</h2>
														<span className="text-danger ms-3">-2 % </span>
													</div>	
													<span className="fs-14 d-block mb-2">Profile Viewed</span>
												</div>	
												<div id="NewCustomers2">
													<NewCustomers3 />
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="job-icon pt-4  d-flex justify-content-between">
												<div>
													<div className="d-flex align-items-center mb-1">
														<h2 className="mb-0">437</h2>
													</div>	
													<span className="fs-14 d-block mb-2">Unread Messages</span>
												</div>	
												<div id="NewCustomers3">
													<NewCustomers4 />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<VacanyTab />
						</div>
						<div className="col-xl-12">
							<CanvasChartTab />
						</div>
						<div className="col-xl-12">
							<FeaturedCompanies />
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-body">
									<div className="row ">
										<div className="col-xl-8 col-xxl-7 col-sm-7">
											<div className="update-profile d-flex">
												<img src={pic1} alt="" />
												<div className="ms-4">
													<h3 className="fs-24 font-w600 mb-0">Franklin Jr</h3>
													<span className="text-primary d-block mb-4">UI / UX Designer</span>
													<span><i className="fas fa-map-marker-alt me-1"></i>Medan, Sumatera Utara - ID</span>
												</div>
											</div>
										</div>
										<div className="col-xl-4 col-xxl-5 col-sm-5 sm-mt-auto mt-3">
											<Link to={"#"} className="btn btn-primary btn-rounded">Update Profile</Link>
										</div>
									</div>
									<div className="row mt-4 align-items-center">
										<h4 className="fs-20 mb-3">Skills</h4>
										<div className="col-xl-6 col-sm-6">
											<div className="progress default-progress">
												<div className="progress-bar bg-green progress-animated" style={{width: "90%", height:"13px"}} role="progressbar">
													<span className="sr-only">90% Complete</span>
												</div>
											</div>
											<div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
												<span className="fs-14 font-w500">Figma</span>
												<span className="fs-16"><span className="text-black pe-2"></span>90%</span>
											</div>
											<div className="progress default-progress">
												<div className="progress-bar bg-info progress-animated" style={{width: "68%", height:"13px"}} role="progressbar">
													<span className="sr-only">45% Complete</span>
												</div>
											</div>
											<div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
												<span className="fs-14 font-w500">Adobe XD</span>
												<span className="fs-16"><span className="text-black pe-2"></span>68%</span>
											</div>
											<div className="progress default-progress">
												<div className="progress-bar bg-blue progress-animated" style={{width: "85%", height:"13px"}} role="progressbar">
													<span className="sr-only">85% Complete</span>
												</div>
											</div>
											<div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
												<span className="fs-14 font-w500">Photoshop</span>
												<span className="fs-16"><span className="text-black pe-2"></span>85%</span>
											</div>
										</div>
										<div className="col-xl-6 col-sm-6">
											<div id="pieChart1">
												<ApexPieChart />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<RecentActivity />
						</div>
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header pb-0 border-0 flex-wrap">
									<h4 className="fs-20 mb-3">Available Jobs For You</h4>
									<div className="d-flex">	
										<Dropdown className="default-select bgl-primary rounded" >
											<Dropdown.Toggle  as="div" className="btn btn-sm  text-primary d-flex align-items-center i-false" >
												{control3}
												<i className="fas fa-angle-down text-primary scale5 ms-3"></i>
												
											</Dropdown.Toggle>
											<Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1">
												<Dropdown.Item className=" text-primary"  onClick={()=>setControl3("Newest")}>
													Newest
												</Dropdown.Item>
												<Dropdown.Item className=" text-primary" onClick={()=>setControl3("Oldest")}>
													Oldest
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
										<Dropdown className="custom-dropdown mb-0">
											<Dropdown.Toggle as="button" className="btn sharp tp-btn dark-btn i-false">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
													<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
													<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												</svg>
											</Dropdown.Toggle>
											<Dropdown.Menu className="dropdown-menu-right">
												<Dropdown.Item>Details</Dropdown.Item>
												<Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</div>	
								</div>
								<div className="card-body">
									<div className="owl-carousel owl-carousel owl-loaded front-view-slider ">
										<HomeSlider />
									</div>
								</div>
							</div>
						</div>		
					</div>
				</div>
			</div>	
		</>
	)
}
export default DashboardDark;