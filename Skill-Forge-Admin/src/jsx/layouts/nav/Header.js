import React,{useState} from "react";

import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Image
import profile from "../../../images/profile/pic1.jpg";
import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";

const Header = ({ onNote }) => {
  const [searchBut, setSearchBut] = useState(false);	
  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
				<div
					className="dashboard_bar"
					style={{ textTransform: "capitalize" }}
				  >
					{finalName.join(" ").length === 0
					  ? "Dashboard"
					  : finalName.join(" ") === "dashboard dark"
					  ? "Dashboard"
					  : finalName.join(" ")}
				</div>
				{/* <div className="nav-item d-flex align-items-center">
					<div className="input-group search-area">
						<input type="text" 
							className={`form-control ${searchBut ? "active" : ""}`}
							placeholder="Search here" 
						/>
						<span className="input-group-text" onClick={() => setSearchBut(!searchBut)}>
							<Link to={"#"}><i className="flaticon-381-search-2"></i></Link>
						</span>
					</div>
					<div className="plus-icon">
						<Link to={"#"}><i className="fas fa-plus"></i></Link>
					</div>
				</div> */}
            </div>
            	{/* <li className="nav-item">
					<div className="input-group search-area">
						<input type="text" className="form-control" placeholder="Search here..." />
						<span className="input-group-text"><Link to={"#"}><i className="flaticon-381-search-2"></i></Link></span>
					</div>
				</li> */}
            <ul className="navbar-nav header-right main-notification">
			
{/* 			
              <Dropdown
                as="li"
                className="nav-item dropdown notification_dropdown "
              >
                <Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a"
					data-toggle="dropdown" aria-expanded="false"
                >
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<g  data-name="Layer 2" transform="translate(-2 -2)">
							<path id="Path_20" data-name="Path 20" d="M22.571,15.8V13.066a8.5,8.5,0,0,0-7.714-8.455V2.857a.857.857,0,0,0-1.714,0V4.611a8.5,8.5,0,0,0-7.714,8.455V15.8A4.293,4.293,0,0,0,2,20a2.574,2.574,0,0,0,2.571,2.571H9.8a4.286,4.286,0,0,0,8.4,0h5.23A2.574,2.574,0,0,0,26,20,4.293,4.293,0,0,0,22.571,15.8ZM7.143,13.066a6.789,6.789,0,0,1,6.78-6.78h.154a6.789,6.789,0,0,1,6.78,6.78v2.649H7.143ZM14,24.286a2.567,2.567,0,0,1-2.413-1.714h4.827A2.567,2.567,0,0,1,14,24.286Zm9.429-3.429H4.571A.858.858,0,0,1,3.714,20a2.574,2.574,0,0,1,2.571-2.571H21.714A2.574,2.574,0,0,1,24.286,20a.858.858,0,0,1-.857.857Z"/>
						</g>
					</svg>
					<span className="badge light text-white bg-primary rounded-circle"></span>
                </Dropdown.Toggle>
				<Dropdown.Menu align="right" className="mt-2 dropdown-menu dropdown-menu-end">
                  <PerfectScrollbar className="widget-media dlab-scroll p-3 height380">
                    <ul className="timeline">
                      
                    </ul>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                      <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                      />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                      <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                      />
                    </div>
                  </PerfectScrollbar>
                  <Link className="all-notification" to="#">
                    See all notifications <i className="ti-arrow-right" />
                  </Link>
                </Dropdown.Menu>
              </Dropdown> */}
			 
				
				{/* <Link to={"#"} className="btn btn-primary d-sm-inline-block d-none">Generate Report<i className="las la-signal ms-3 scale5"></i></Link> */}
        {/* <li className="nav-item header-profile"><Link to={"#"} className="nav-link" role="button" data-bs-toggle="dropdown">
						<img src={profile} width="20" alt=""/>
					</Link>
				</li> */}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
