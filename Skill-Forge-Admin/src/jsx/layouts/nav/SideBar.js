/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link,NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { logoutUser } from "../../../services/AuthManager";
import { useDispatch, useSelector } from "react-redux";

/// Image
import profile from "../../../images/profile/pic1.jpg";
import useAuth from "../../../hooks/useAuth";
class MM extends Component {
	componentDidMount() {
		this.$el = this.el;
		this.mm = new Metismenu(this.$el);
	}
  componentWillUnmount() {
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userName = useSelector((state) => state.auth.userName);

  const handleLogout = () => {
    logoutUser();
   };

  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
	
	//sidebar icon Heart blast
		var handleheartBlast = document.querySelector('.heart');
        function heartBlast() {
            return handleheartBlast.classList.toggle("heart-blast");
        }
        handleheartBlast.addEventListener('click', heartBlast);
	
  }, []);
  //let scrollPosition = useScrollPosition();
  // For scroll
	const [hideOnScroll, setHideOnScroll] = useState(true)
	useScrollPosition(
		({ prevPos, currPos }) => {
		  const isShow = currPos.y > prevPos.y
		  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
		},
		[hideOnScroll]
	)
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
      "",
      "dashboard-dark",
       "search-jobs",
       "applications",
       "my-profile",
       "statistics",
       "companies",
       "task",
    ],
	job = [
		"job-list",
		"job-view",
		"job-application",
		"apply-job",
		"new-job",
		"user-profile",
	],
	content= [
		"training-table",
    "assign-training",
    "users-progress",
	
	],
  evaluation= [
		"quizzes-table",
  
	
	];
   
    const profileUrl = `${process.env.REACT_APP_KEYCLOAK_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/account`;
    
  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    > 
      <PerfectScrollbar className="dlabnav-scroll">
      {isLogin ? (
      <>
			<Dropdown as="div" className=" header-profile2 dropdown">
				<Dropdown.Toggle
				  variant=""
				  as="a"
				  className="nav-link i-false c-pointer"
				  // href="#"
				  role="button"
				  data-toggle="dropdown"
				>
					<div className="header-info2 d-flex align-items-center">
						<img src={profile} width={20} alt="" />
						<div className="d-flex align-items-center sidebar-info">
							<div>
								<span className="font-w400 d-block">{userName}</span>
								<small className="text-end font-w400">Superadmin</small>
							</div>	
							<i className="fas fa-chevron-down"></i>
						</div>
					</div>
				</Dropdown.Toggle>

				<Dropdown.Menu align="right" className=" dropdown-menu dropdown-menu-end">
				  <a href={profileUrl} className="dropdown-item ai-icon">
					<svg
					  id="icon-user1"
					  xmlns="http://www.w3.org/2000/svg"
					  className="text-primary"
					  width={18}
					  height={18}
					  viewBox="0 0 24 24"
					  fill="none"
					  stroke="currentColor"
					  strokeWidth={2}
					  strokeLinecap="round"
					  strokeLinejoin="round"
					>
					  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
					  <circle cx={12} cy={7} r={4} />
					</svg>
					<span className="ms-2">Profile </span>
				  </a>
				 
					
          <a className="dropdown-item ai-icon" onClick={handleLogout}>
                <svg
                  id="icon-logout" xmlns="http://www.w3.org/2000/svg"
                  className="text-danger" width={18} height={18} viewBox="0 0 24 24" 
                  fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1={21} y1={12} x2={9} y2={12} />
                </svg>
                <span className="ms-2" >Logout </span>
            </a>
				</Dropdown.Menu>
			  </Dropdown>  </>) : (
       <></>
      )}
        <MM className="metismenu" id="menu">
		  {/* <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" >
              <i className="flaticon-025-dashboard"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
            <ul >
              <li><Link className={`${path === "dashboard" ? "mm-active" : ""}`} to="/dashboard"> Dashboard Light</Link></li>
              <li><Link className={`${path === "dashboard-dark" ? "mm-active" : ""}`} to="/dashboard-dark"> Dashboard Dark</Link></li>
              <li><Link className={`${path === "search-jobs" ? "mm-active" : ""}`} to="/search-jobs"> Jobs</Link></li>
              <li><Link className={`${path === "applications" ? "mm-active" : ""}`} to="/applications"> Applications</Link></li>
              <li><Link className={`${path === "my-profile" ? "mm-active" : ""}`} to="/my-profile"> My Profile</Link></li>
              <li><Link className={`${path === "statistics" ? "mm-active" : ""}`} to="/statistics">Statistics</Link></li>
              <li><Link className={`${path === "companies" ? "mm-active" : ""}`} to="/companies">Companies</Link></li>
              <li><Link className={`${path === "task" ? "mm-active" : ""}`} to="/task">Task</Link></li>
            </ul>
          </li>
			<li className={`${job.includes(path) ? "mm-active" : ""}`}>
				<Link className="has-arrow" to="#" >
				  <i className="flaticon-093-waving"></i>
				  <span className="nav-text">Jobs</span>
				</Link>
				<ul >
					<li><Link className={`${path === "job-list" ? "mm-active" : ""}`} to="/job-list">Job Lists</Link></li>
					<li><Link className={`${path === "job-view" ? "mm-active" : ""}`} to="/job-view">Job View</Link></li>
					<li><Link className={`${path === "job-application" ? "mm-active" : ""}`} to="/job-application">Job Application</Link></li>
					<li><Link className={`${path === "apply-job" ? "mm-active" : ""}`} to="/apply-job">Apply Job</Link></li>
					<li><Link className={`${path === "new-job" ? "mm-active" : ""}`} to="/new-job">New Job</Link></li>
					<li><Link className={`${path === "user-profile" ? "mm-active" : ""}`} to="/user-profile">User Profile</Link></li>
				</ul> 
			</li>	 */}
      <li className={`${content.includes(path) ? "mm-active" : ""}`}>
      <Link className="has-arrow" to="#"  >
      <i className="flaticon-086-star"></i>
              <span className="nav-text">Training Content</span>
            </Link>
            <ul >
					<li><Link className={`${path === "training-table" ? "mm-active" : ""}`} to="/training-table">Training List</Link></li>
          <li><Link className={`${path === "assign-training" ? "mm-active" : ""}`} to="/assign-training">Assign Training</Link></li>
          <li><Link className={`${path === "users-progress" ? "mm-active" : ""}`} to="/users-progress">Unfinished Training Participants</Link></li>
          </ul>
            </li>
            <li className={`${evaluation.includes(path) ? "mm-active" : ""}`}>
      <Link className="has-arrow" to="#"  >
      <i className="flaticon-093-waving"></i>
              <span className="nav-text">Evaluation</span>
            </Link>
            <ul >
					<li><Link className={`${path === "training-table" ? "mm-active" : ""}`} to="/quizzes-table">Quizzes</Link></li>

          </ul>
            </li>
          
         
			
			
         
          
         
        </MM>
		
		<div className="copyright">
			<p><strong>Skill Forge</strong> © 2024 All Rights Reserved</p>
			<p className="fs-12">Made with <span className="heart"></span></p>
		</div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
