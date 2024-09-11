import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";


const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } = useContext(
    ThemeContext
  );
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        {background.value === "dark" || navigationHader !== "color_1" ? (
			<Fragment>
				{/* <svg className="logo-abbr" xmlns="http://www.w3.org/2000/svg" width="62.074" height="65.771" viewBox="0 0 62.074 65.771">
				  <g id="search_11_" data-name="search (11)" transform="translate(12.731 12.199)">
					<rect className="rect-primary-rect" id="Rectangle_1" data-name="Rectangle 1" width="60" height="60" rx="30" transform="translate(-10.657 -12.199)" fill="#f73a0b"/>
					<path id="Path_2001" data-name="Path 2001" d="M32.7,5.18a17.687,17.687,0,0,0-25.8,24.176l-19.8,21.76a1.145,1.145,0,0,0,0,1.62,1.142,1.142,0,0,0,.81.336,1.142,1.142,0,0,0,.81-.336l19.8-21.76a17.687,17.687,0,0,0,29.357-13.29A17.57,17.57,0,0,0,32.7,5.18Zm-1.62,23.392A15.395,15.395,0,0,1,9.312,6.8,15.395,15.395,0,1,1,31.083,28.572Zm0,0" transform="translate(1 0)" fill="#fff" stroke="#fff" strokeWidth="1"/>
					<path id="Path_2002" data-name="Path 2002" d="M192.859,115.547a4.523,4.523,0,0,0,.7-2.415v-2.284a4.55,4.55,0,0,0-9.1,0v2.284a4.523,4.523,0,0,0,.7,2.415,4.954,4.954,0,0,0-3.708,4.788v1.623a2.4,2.4,0,0,0,2.4,2.4h10.323a2.4,2.4,0,0,0,2.4-2.4v-1.623a4.954,4.954,0,0,0-3.708-4.788Zm-6.114-4.7a2.259,2.259,0,0,1,4.518,0v2.284a2.259,2.259,0,1,1-4.518,0Zm7.53,11.111a.11.11,0,0,1-.11.11H183.843a.11.11,0,0,1-.11-.11v-1.623a2.656,2.656,0,0,1,2.653-2.653h5.237a2.656,2.656,0,0,1,2.653,2.653Zm0,0" transform="translate(-168.591 -98.178)" fill="#fff" stroke="#fff" strokeWidth="1"/>
				  </g>
				</svg> */}
        <svg className="brand-title" xmlns="http://www.w3.org/2000/svg" width="134.01" height="48.365" viewBox="0 0 134.01 48.365">
  <g id="Group_38" data-name="Group 38" transform="translate(-133.99 -40.635)">
    <text id="Skill_Forge" transform="translate(134 70)" fill="#464646" fontSize="24" fontFamily="Arial">
      <tspan x="0" y="0">Skill Forge</tspan>
    </text>
    <text id="Job_Admin_Dashboard" transform="translate(134 85)" fill="#787878" fontSize="12" fontFamily="Poppins-Light, Poppins" fontWeight="300">
      <tspan x="0" y="0">Admin Dashboard</tspan>
    </text>
  </g>
</svg>

			</Fragment>
        ) : (
			<Fragment>
				{/* <svg className="logo-abbr" xmlns="http://www.w3.org/2000/svg" width="62.074" height="65.771" viewBox="0 0 62.074 65.771">
				  <g id="search_11_" data-name="search (11)" transform="translate(12.731 12.199)">
					<rect className="rect-primary-rect" id="Rectangle_1" data-name="Rectangle 1" width="60" height="60" rx="30" transform="translate(-10.657 -12.199)" fill="#f73a0b"/>
					<path id="Path_2001" data-name="Path 2001" d="M32.7,5.18a17.687,17.687,0,0,0-25.8,24.176l-19.8,21.76a1.145,1.145,0,0,0,0,1.62,1.142,1.142,0,0,0,.81.336,1.142,1.142,0,0,0,.81-.336l19.8-21.76a17.687,17.687,0,0,0,29.357-13.29A17.57,17.57,0,0,0,32.7,5.18Zm-1.62,23.392A15.395,15.395,0,0,1,9.312,6.8,15.395,15.395,0,1,1,31.083,28.572Zm0,0" transform="translate(1 0)" fill="#fff" stroke="#fff" strokeWidth="1"/>
					<path id="Path_2002" data-name="Path 2002" d="M192.859,115.547a4.523,4.523,0,0,0,.7-2.415v-2.284a4.55,4.55,0,0,0-9.1,0v2.284a4.523,4.523,0,0,0,.7,2.415,4.954,4.954,0,0,0-3.708,4.788v1.623a2.4,2.4,0,0,0,2.4,2.4h10.323a2.4,2.4,0,0,0,2.4-2.4v-1.623a4.954,4.954,0,0,0-3.708-4.788Zm-6.114-4.7a2.259,2.259,0,0,1,4.518,0v2.284a2.259,2.259,0,1,1-4.518,0Zm7.53,11.111a.11.11,0,0,1-.11.11H183.843a.11.11,0,0,1-.11-.11v-1.623a2.656,2.656,0,0,1,2.653-2.653h5.237a2.656,2.656,0,0,1,2.653,2.653Zm0,0" transform="translate(-168.591 -98.178)" fill="#fff" stroke="#fff" strokeWidth="1"/>
				  </g>
				</svg> */}
        <svg className="brand-title" xmlns="http://www.w3.org/2000/svg" width="134.01" height="48.365" viewBox="0 0 134.01 48.365">
  <g id="Group_38" data-name="Group 38" transform="translate(-133.99 -40.635)">
    <text id="Skill_Forge" transform="translate(134 70)" fill="#464646" fontSize="24" fontFamily="Arial">
      <tspan x="0" y="0">Skill Forge</tspan>
    </text>
    <text id="Job_Admin_Dashboard" transform="translate(134 85)" fill="#787878" fontSize="12" fontFamily="Poppins-Light, Poppins" fontWeight="300">
      <tspan x="0" y="0">Admin Dashboard</tspan>
    </text>
  </g>
</svg>


			</Fragment>
        )}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
