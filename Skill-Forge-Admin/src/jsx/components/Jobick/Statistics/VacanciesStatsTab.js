import React from 'react';
import {Tab, Nav} from 'react-bootstrap';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const VacanyCanvasChart1 = loadable(() =>
	pMinDelay(import("../Home/TabChart/VacanyCanvasChart1"), 1000)
);

const VacanciesStatsTab = ()=>{
	return(
		<>	
			<Tab.Container defaultActiveKey="Monthly">
				<div className="card" id="user-activity">
					<div className="card-header flex-wrap">
						<h4 className="fs-20 font-w600">Vacancies Stats</h4>
						<div className="d-flex align-items-center flex-wrap">
							<div className="me-5">
								<span className="me-4">
									<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
									  <rect  width="13" height="13" rx="6.5" fill="#35c556"/>
									</svg>
									Application Sent
								</span>
								<span className="me-4">
									<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
									  <rect  width="13" height="13" rx="6.5" fill="#3f4cfe"/>
									</svg>
									Interviews
								</span>
								<span>
									<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
									  <rect  width="13" height="13" rx="6.5" fill="#f34040"/>
									</svg>
									Rejected
								</span>
							</div>
							<div className="card-action coin-tabs">
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
					</div>	
					<div className="card-body">
						<Tab.Content>
							<Tab.Pane eventKey="Daily">
								<VacanyCanvasChart1 dataActive={2}/>
							</Tab.Pane >	
							<Tab.Pane eventKey="Weekly">
								<VacanyCanvasChart1 dataActive={1}/>
							</Tab.Pane >	
							<Tab.Pane eventKey="Monthly">												
								<VacanyCanvasChart1 dataActive={0}/>
							</Tab.Pane >	
						</Tab.Content >	
					</div>
				</div> 
			</Tab.Container>			
		</>
	)
}
export default VacanciesStatsTab;