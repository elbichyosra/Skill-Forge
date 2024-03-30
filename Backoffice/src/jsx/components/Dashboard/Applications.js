import React,{useState} from 'react';
import {Nav, Tab, Dropdown} from 'react-bootstrap';

import AllStatus from '../Jobick/Applications/AllStatus';
import PendingStatus from '../Jobick/Applications/PendingStatus';
import HoldStatus from '../Jobick/Applications/HoldStatus';
import CandidateStatus from '../Jobick/Applications/CandidateStatus';


const Applications = () => {
const [control3, setControl3] = useState('All Status');			
	return(
		<>	
			<Tab.Container defaultActiveKey="AllStatus">
				<div className="d-sm-flex d-block justify-content-between align-items-center mb-4">
					<div className="card-action coin-tabs mt-3 mt-sm-0">
						<Nav as="ul" className="nav nav-tabs" role="tablist">
							<Nav.Item as="li" className="nav-item">
								<Nav.Link className="nav-link" eventKey="AllStatus">All Status</Nav.Link>
							</Nav.Item>
							<Nav.Item as="li" className="nav-item">
								<Nav.Link className="nav-link " eventKey="Pending">Pending</Nav.Link>
							</Nav.Item>
							<Nav.Item as="li" className="nav-item">
								<Nav.Link className="nav-link " eventKey="On-Hold">On-Hold</Nav.Link>
							</Nav.Item>
							<Nav.Item as="li" className="nav-item">
								<Nav.Link className="nav-link" eventKey="Candidate">Candidate</Nav.Link>
							</Nav.Item>
						</Nav>
					</div>
					<div className="d-flex mt-sm-0 mt-3">
						<Dropdown className="default-select bgl-primary rounded" >
							<Dropdown.Toggle variant=""
								id="dropdown-basic"  as="div" className="btn btn-sm  text-primary d-flex align-items-center i-false" >
								{control3}
								<i className="fas fa-angle-down text-primary scale5 ms-3"></i>
								
							</Dropdown.Toggle>
							<Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1">
								<Dropdown.Item className="text-primary"  
									eventKey="AllStatus"
									onClick={()=>setControl3("All Status")}>
									All Status
								</Dropdown.Item>
								<Dropdown.Item className="text-primary" 
									eventKey="Pending"
									onClick={()=>setControl3("Pending")}>
									Pending
								</Dropdown.Item>
								<Dropdown.Item className="text-primary" 
									eventKey="On-Hold"
									onClick={()=>setControl3("On-Hold")}>
									On-Hold
								</Dropdown.Item>
								<Dropdown.Item className="text-primary" 
									eventKey="Candidate"
									onClick={()=>setControl3("Candidate")}>
									Candidate
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-12">
						<Tab.Content>
							<Tab.Pane eventKey="AllStatus">
								<AllStatus />
							</Tab.Pane>
							<Tab.Pane eventKey="Pending">
								<PendingStatus />
							</Tab.Pane>
							<Tab.Pane eventKey="On-Hold">
								<HoldStatus />
							</Tab.Pane>
							<Tab.Pane eventKey="Candidate">
								<CandidateStatus />
							</Tab.Pane>
						</Tab.Content>	
					</div>
				</div>	
			</Tab.Container>	
		</>
	)
} 
export default Applications;
