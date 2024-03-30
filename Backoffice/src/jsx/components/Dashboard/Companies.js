import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

//Images
import pic1 from './../../../images/comapny/1.png';
import pic2 from './../../../images/comapny/2.png';
import pic3 from './../../../images/comapny/3.png';
import pic4 from './../../../images/comapny/4.png';
import pic5 from './../../../images/comapny/5.png';
import pic6 from './../../../images/comapny/6.png';

const CardBlog = [
	{image: pic1, title:"Bubble Studios" },
	{image: pic2, title:"Foodia Studios" },
	{image: pic3, title:"Kelon inc." },
	{image: pic4, title:"Bubble Studios" },
	{image: pic5, title:"Foodia Studios" },
	{image: pic6, title:"Kelon inc." },
	{image: pic3, title:"Foodia Studios" },
	{image: pic1, title:"Bubble Studios" },
];

const Companies = () =>{
	const [control3, setControl3] = useState('Choose Location');
	const [salaryblog, setSalaryblog] = useState('Salary Range');
	const [selectblog, setSelectblog] = useState('Newest');
	return(
		<>
			<div className="d-flex align-items-center flex-wrap search-job bg-white px-0 mb-4 row">
				<div className="col-xl-2 col-xxl-3 search-dropdown d-flex align-items-center">
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
				<div className="col-xl-2 col-xxl-3 search-dropdown d-flex align-items-center">
					<Dropdown className="form-control border-0  style-1 h-auto" >
						<Dropdown.Toggle  as="div" className="fs-16 font-w500 text-primary d-flex justify-content-between align-items-center i-false" >
							{salaryblog}
							<i className="fas fa-angle-down text-primary scale5 ms-3"></i>
						</Dropdown.Toggle>
						<Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1">
							<Dropdown.Item className=" text-primary"  onClick={()=>setSalaryblog("Salary Range")}>
								Salary Range
							</Dropdown.Item>
							<Dropdown.Item className=" text-primary"  onClick={()=>setSalaryblog("50,000-60,000")}>
								50,000-60,000
							</Dropdown.Item>
							<Dropdown.Item className=" text-primary" onClick={()=>setSalaryblog("70,000-80,000")}>
								70,000-80,000
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="col-xl-8 col-xxl-6 d-md-flex job-title-search pe-0">
					<div className="input-group search-area">
						<input type="text" className="form-control h-auto" placeholder="search job title here.." />
						<span className="input-group-text"><Link to={"#"} className="btn btn-primary btn-rounded">Search<i className="flaticon-381-search-2 ms-2"></i></Link></span>
					</div>	
				</div>
			</div>
			<div className="d-flex align-items-center justify-content-between my-5 flex-wrap">
				<div className="sm-mb-0 mb-3">
					<h5>Showing 12 of 124 Jobs Results</h5>
					<span>Based your preferences</span>
				</div>
				<div>
					<div className="d-flex align-items-center">
						<span className="me-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							  <path id="List" d="M13.143,14.857H9.714A1.716,1.716,0,0,1,8,13.143V9.714A1.716,1.716,0,0,1,9.714,8h3.429a1.716,1.716,0,0,1,1.714,1.714v3.429A1.716,1.716,0,0,1,13.143,14.857ZM9.714,9.714v3.429h3.43V9.714ZM32,11.429a.857.857,0,0,0-.857-.857H17.429a.857.857,0,1,0,0,1.714H31.143A.857.857,0,0,0,32,11.429Zm-18.857,12H9.714A1.716,1.716,0,0,1,8,21.714V18.286a1.716,1.716,0,0,1,1.714-1.714h3.429a1.716,1.716,0,0,1,1.714,1.714v3.429A1.716,1.716,0,0,1,13.143,23.429ZM9.714,18.286v3.429h3.43V18.286ZM32,20a.857.857,0,0,0-.857-.857H17.429a.857.857,0,1,0,0,1.714H31.143A.857.857,0,0,0,32,20ZM13.143,32H9.714A1.716,1.716,0,0,1,8,30.286V26.857a1.716,1.716,0,0,1,1.714-1.714h3.429a1.716,1.716,0,0,1,1.714,1.714v3.429A1.716,1.716,0,0,1,13.143,32ZM9.714,26.857v3.429h3.43V26.857ZM32,28.571a.857.857,0,0,0-.857-.857H17.429a.857.857,0,1,0,0,1.714H31.143A.857.857,0,0,0,32,28.571Z" transform="translate(-8 -8)" fill="#848484"/>
							</svg>
						</span>
						<span className="me-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							  <g id="_012-menu-1" data-name="012-menu-1" transform="translate(-1 -1)">
								<path id="Path_1965" data-name="Path 1965" d="M10.818,1H2.091A1.091,1.091,0,0,0,1,2.091v8.727a1.091,1.091,0,0,0,1.091,1.091h8.727a1.091,1.091,0,0,0,1.091-1.091V2.091A1.091,1.091,0,0,0,10.818,1ZM9.727,9.727H3.182V3.182H9.727Z" fill="#f93a0b"/>
								<path id="Path_1966" data-name="Path 1966" d="M22.818,1H14.091A1.091,1.091,0,0,0,13,2.091v8.727a1.091,1.091,0,0,0,1.091,1.091h8.727a1.091,1.091,0,0,0,1.091-1.091V2.091A1.091,1.091,0,0,0,22.818,1ZM21.727,9.727H15.182V3.182h6.545Z" transform="translate(1.091)" fill="#f93a0b"/>
								<path id="Path_1967" data-name="Path 1967" d="M10.818,13H2.091A1.091,1.091,0,0,0,1,14.091v8.727a1.091,1.091,0,0,0,1.091,1.091h8.727a1.091,1.091,0,0,0,1.091-1.091V14.091A1.091,1.091,0,0,0,10.818,13ZM9.727,21.727H3.182V15.182H9.727Z" transform="translate(0 1.091)" fill="#f93a0b"/>
								<path id="Path_1968" data-name="Path 1968" d="M22.818,13H14.091A1.091,1.091,0,0,0,13,14.091v8.727a1.091,1.091,0,0,0,1.091,1.091h8.727a1.091,1.091,0,0,0,1.091-1.091V14.091A1.091,1.091,0,0,0,22.818,13Zm-1.091,8.727H15.182V15.182h6.545Z" transform="translate(1.091 1.091)" fill="#f93a0b"/>
							  </g>
							</svg>
						</span>
						<div>	
							<Dropdown className="default-select">
								<Dropdown.Toggle  as="div" className="btn btn-sm  text-primary d-flex align-items-center i-false" >
										{selectblog}
									<i className="fas fa-angle-down text-primary scale5 ms-3"></i>
								</Dropdown.Toggle>
								<Dropdown.Menu className="dropdown-menu dropdown-menu-end mt-1">
									<Dropdown.Item className=" text-primary"  onClick={()=>setSelectblog("Newest")}>
										Newest
									</Dropdown.Item>
									<Dropdown.Item className=" text-primary" onClick={()=>setSelectblog("Oldest")}>
										Oldest
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<div className="row">
						{CardBlog.map((item,index)=>(
							<div className="col-xl-6" key={index}>
								<div className="card">
									<div className="card-body">
										<div className="d-flex justify-content-between align-items-center flex-wrap">
											<div className="d-flex">
												<img src={item.image} alt="" className="Studios-info" style={{width:"100px"}} />
												<div>
													<h4 className="fs-20 mb-1">{item.title}</h4>
													<span className="mb-3 d-block">Desgin Team Agency</span>
													<span className="d-block"><i className="fas fa-map-marker-alt me-2"></i>Manchester, England</span>
												</div>
											</div>
											<div className="job-available">
												<Link to={"#"} className="btn btn-outline-primary btn-rounded">6 Jobs Available</Link>
											</div>
										</div>	
									</div>
								</div>
							</div>
						))}
					</div>	
				</div>	
			</div>	
			<div className="d-flex align-items-center justify-content-between flex-wrap">
				<div className="sm-mb-0 mb-3">
					<h5 className="mb-0">Showing 5 of 102 Data</h5>
				</div>
				<nav>
					<ul className="pagination pagination-circle">
						<li className="page-item page-indicator">
							<Link to={"#"} className="page-link">Prev</Link>
						</li>
						<li className="page-item active"><Link to={"#"} className="page-link">1</Link>
						</li>
						<li className="page-item"><Link to={"#"} className="page-link">2</Link></li>
						<li className="page-item"><Link to={"#"} className="page-link">3</Link></li>
						<li className="page-item"><Link to={"#"} className="page-link">4</Link></li>
						<li className="page-item page-indicator">
							<Link to={"#"} className="page-link">Next</Link>
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
} 
export default Companies;