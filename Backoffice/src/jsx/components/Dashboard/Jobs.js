import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

//Import
import JobsTabBlog from '../Jobick/Jobs/JobsTabBlog/JobsTabBlog';
import JobPreview from '../Jobick/Jobs/JobPreview';

const Jobs = () => {
	const [control3, setControl3] = useState('Choose Location');
	const [selectblog, setSelectblog] = useState('Salary Range');
	return(
		<>
			<div className="d-flex align-items-center flex-wrap search-job bg-white px-0 mb-4">
				<div className="col-xl-2 col-xxl-3 col-lg-3 col-sm-6 col-12 search-dropdown d-flex align-items-center">
					<Dropdown className="form-control border-0  style-1 h-auto" >
						<Dropdown.Toggle  as="div" className="fs-16 font-w500 text-primary justify-content-between d-flex align-items-center i-false" >
							{control3}
							<i className="fas fa-angle-down text-primary scale5 ms-3"></i>
							
						</Dropdown.Toggle>
						<Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1">
							<Dropdown.Item className=" text-primary"  onClick={()=>setControl3("Choose Location")}>
								Choose Location
							</Dropdown.Item>
							<Dropdown.Item className=" text-primary"  onClick={()=>setControl3("London")}>
								London
							</Dropdown.Item>
							<Dropdown.Item className=" text-primary" onClick={()=>setControl3("France")}>
								France
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="col-xl-2 col-xxl-3 col-lg-3 col-sm-6 col-12 search-dropdown d-flex align-items-center">
					<Dropdown className="form-control border-0  style-1 h-auto" >
						<Dropdown.Toggle  as="div" className="fs-16 font-w500 text-primary justify-content-between d-flex align-items-center i-false" >
							{selectblog}
							<i className="fas fa-angle-down text-primary scale5 ms-3"></i>
						</Dropdown.Toggle>
						<Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1">
							<Dropdown.Item className=" text-primary"  onClick={()=>setSelectblog("Salary Range")}>
								Salary Range
							</Dropdown.Item>
							<Dropdown.Item className=" text-primary"  onClick={()=>setSelectblog("London")}>
								London
							</Dropdown.Item>
							<Dropdown.Item className=" text-primary" onClick={()=>setSelectblog("France")}>
								France
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="col-xl-8 col-xxl-6 col-lg-6 col-12 d-md-flex job-title-search pe-0">
					<div className="input-group search-area">
						<input type="text" className="form-control h-auto" placeholder="search job title here..." />
						<span className="input-group-text"><Link to={"#"} className="btn btn-primary btn-rounded">Search<i className="flaticon-381-search-2 ms-2"></i></Link></span>
					</div>	
				</div>
			</div>
			<div className="row">
				<div className="col-xl-9">
					<JobsTabBlog />
				</div>
				<div className="col-xl-3 mt-4">
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h4>Job Preview</h4>
						<Link to={"#"}><i className="fas fa-times fs-30"></i></Link>
					</div>
					<div className="row">
						<div className="col-xl-12">
							<JobPreview />
						</div>
					</div>		
				</div>		
			</div>		
		</>
	)
}
export default Jobs;