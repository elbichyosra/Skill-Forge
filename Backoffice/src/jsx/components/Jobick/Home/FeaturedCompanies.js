import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

//Images 
import pic1 from './../../../../images/comapny/1.png';
import pic2 from './../../../../images/comapny/2.png';
import pic3 from './../../../../images/comapny/3.png';
import pic4 from './../../../../images/comapny/4.png';
import pic5 from './../../../../images/comapny/5.png';
import pic6 from './../../../../images/comapny/6.png';

const Companyblog = [
	{ image: pic1, title:'Kleon Team'},
	{ image: pic2, title:'Ziro Studios Inc.'},
	{ image: pic3, title:'Qerza'},
	{ image: pic4, title:'Kripton Studios'},
	{ image: pic5, title:'Omah Ku Inc.'},
	{ image: pic6, title:'Ventic'},
	{ image: pic4, title:'Sakola'},
	{ image: pic2, title:'Uena Foods'},
];

const FeaturedCompanies = () => {	
	// This is load more function 
	const [data, setData] = useState(Companyblog);
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
				<div className="card-header border-0 pb-0">
					<h4 className="fs-20 mb-1">Featured Companies</h4>
					<Dropdown >
						<Dropdown.Toggle as="div" className="btn-link i-false">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</Dropdown.Toggle>
						<Dropdown.Menu className="dropdown-menu-right">
							<Dropdown.Item>Details</Dropdown.Item>
							<Dropdown.Item>Cancel</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="card-body pt-3 loadmore-content">
					<div className="row" id="FeaturedCompaniesContent">
						{data.map((item, index)=>(
							<div className="col-xl-6 col-sm-6 mt-4 " key={index}>
								<div className="d-flex">
									<img src={item.image} alt="" />
									<div className="ms-3 featured">
										<h4 className="fs-20 mb-1">{item.title}</h4>
										<span>Desgin Team Agency</span>
									</div>
								</div>
							</div>
						))}
					</div>
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
export default FeaturedCompanies; 