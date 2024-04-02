import React from 'react';
import {Tab, Nav} from 'react-bootstrap';

import CanvasChart2 from "./TabChart/CanvasChart2";

const CanvasChartTab = ()=>{
	return(
		<>	
			<Tab.Container defaultActiveKey="Monthly">
				<div className="card">
					<div className="card-header border-0 pb-0">
						<h4 className="fs-20 mb-1">Chart</h4>
						<div className="card-action coin-tabs mt-3 mt-sm-0">
							<Nav  className="nav nav-tabs" role="tablist">
								<Nav.Item >
									<Nav.Link eventKey="Daily">Daily</Nav.Link>
								</Nav.Item>
								<Nav.Item >
									<Nav.Link eventKey="Weekly">Weekly</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="Monthly">Monthly</Nav.Link>
								</Nav.Item >
							</Nav>
						</div>
					</div>
					<div className="card-body">
						<div className="pb-4 d-flex flex-wrap">
							<span className="me-sm-5 me-3 font-w500">
								<svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
								  <rect  width="13" height="13" fill="#f73a0b"/>
								</svg>
								Delivered
							</span>
							<span className="fs-16 font-w600 me-5">239 <small className="text-success fs-12 font-w400">+0.4%</small></span>
							<span className="ms-sm-5 ms-3 font-w500">
								<svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
								  <rect  width="13" height="13" fill="#6e6e6e"/>
								</svg>
								Expense
							</span>
							<span className="fs-16 font-w600 ms-1">239</span>
						</div>
						<Tab.Content>
							<Tab.Pane eventKey="Daily" >
								<CanvasChart2 className="chartjs" dataActive={0}/>
							</Tab.Pane >	
							<Tab.Pane eventKey="Weekly">
								<CanvasChart2 className="chartjs" dataActive={1}/>
							</Tab.Pane >	
							<Tab.Pane eventKey="Monthly">												
								<CanvasChart2 className="chartjs" dataActive={2}/>
							</Tab.Pane >	
						</Tab.Content >	
					</div>
				</div> 
				
			</Tab.Container>			
		</>
	)
}
export default CanvasChartTab;