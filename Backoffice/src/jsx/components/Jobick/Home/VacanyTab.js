import React from 'react';
import {Tab, Nav} from 'react-bootstrap';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const VacanyCanvasChart1 = loadable(() =>
	pMinDelay(import("./TabChart/VacanyCanvasChart1"), 1000)
);

const VacanyTab = ()=>{
	return(
		<>	
			<Tab.Container defaultActiveKey="Monthly">
				<div className="card">
					<div className="card-header border-0 pb-0 flex-wrap">
						<h4 className="fs-20 font-w500 mb-1">Vacany Stats</h4>
						<div className="card-action coin-tabs mt-3 mt-sm-0">
							<Nav as="ul" className="nav nav-tabs" role="tablist">
								<Nav.Item as="li" className="nav-item">
									<Nav.Link  className="nav-link" eventKey="Daily" >
										Daily
									</Nav.Link>
								</Nav.Item>
								<Nav.Item className="nav-item">
									<Nav.Link className="nav-link"  eventKey="Weekly" >
										Weekly
									</Nav.Link>
								</Nav.Item>
								<Nav.Item className="nav-item">
									<Nav.Link className="nav-link"  eventKey="Monthly" >
										Monthly
									</Nav.Link>
								</Nav.Item >
							</Nav>
						</div>
					</div>
					<div className="card-body">
						<div className="pb-4 d-flex flex-wrap">
							<span className="d-flex align-items-center">
								<svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
									<rect  width="13" height="13" rx="6.5" fill="#35c556"/>
								</svg>
								Application Sent	
							</span>
							<span className="application d-flex align-items-center">
								<svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
									<rect  width="13" height="13" rx="6.5" fill="#3f4cfe"/>
								</svg>
								Interviews	
							</span>
							<span className="application d-flex align-items-center">
								<svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
									<rect  width="13" height="13" rx="6.5" fill="#f34040"/>
								</svg>
								Rejected
							</span>
						</div>
						<Tab.Content>
							<Tab.Pane eventKey="Daily">
								<VacanyCanvasChart1 dataActive={0}/>
							</Tab.Pane >	
							<Tab.Pane eventKey="Weekly">
								<VacanyCanvasChart1 dataActive={1}/>
							</Tab.Pane >	
							<Tab.Pane eventKey="Monthly">												
								<VacanyCanvasChart1 dataActive={2}/>
							</Tab.Pane >	
						</Tab.Content >	
					</div>
				</div> 
				
			</Tab.Container>			
		</>
	)
}
export default VacanyTab;