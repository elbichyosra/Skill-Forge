import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

//images
import pic1 from './../../../../images/comapny/1.png';
import pic2 from './../../../../images/comapny/2.png';
import pic3 from './../../../../images/comapny/3.png';
import pic4 from './../../../../images/comapny/4.png';

const recentBlog = [
	{ image: pic1, title:"Bubles Studios have 5 available positions for you"},
	{ image: pic2, title:"Elextra Studios has invited you to interview meeting tomorrow"},
	{ image: pic3, title:"Highspeed Design Team have 2 available positions for you"},
	{ image: pic4, title:"Kleon Studios have 5 available positions for you"},
];

const RecentActivity = () =>{
	//Select button
	const [control3, setControl3] = useState('Oldest');
	//Load More button
	const [data, setData] = useState(recentBlog);
	const [refresh, setRefresh] = useState(false);
	const onClick = () => {
		setRefresh(true);
		setTimeout(() => {
		  setData([
			...data,
			data[Math.floor(Math.random() * Math.floor(data.length - 1))],
		  ]);
		  setRefresh(false);
		}, 1000);
	};
	return(
		<>	
			<div className="card">
				<div className="card-header border-0">
					<h4 className="fs-20 mb-3">Recent Activity</h4>
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
				<div className="card-body loadmore-content  recent-activity-wrapper" id="RecentActivityContent">
					{data.map((item,index)=>(
						<div className="d-flex recent-activity" key={index}>
							<span className="me-3 activity">
								<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
								  <circle  cx="8.5" cy="8.5" r="8.5" fill="#f93a0b"/>
								</svg>
							</span>
							<img src={item.image} alt="" />
							<div className="ms-3">
								<h5 className="mb-1">{item.title}</h5>
								<span>8min ago</span>
							</div>
						</div>
					))}	
				</div>
				<div className="card-footer border-0 m-auto pt-0">
					<Link to={"#"} className="btn btn-outline-primary btn-rounded m-auto dlab-load-more"  onClick={() => onClick()}>
						View more{" "}
						{refresh && <i className="fa fa-refresh"></i>}
					</Link>
				</div>
			</div>
			
		</>
	)
}
export default RecentActivity;