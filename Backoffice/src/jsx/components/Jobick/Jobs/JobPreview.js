import React from 'react';
import {Link} from 'react-router-dom';

const JobPreview = () =>{
	return(
		<>
			<div className="card">
				<div className="card-header bg-blue">
					<div className="researcher">
					</div>
				</div>
				<div className="card-body">
					<span className="text-center d-block block">
						<svg xmlns="http://www.w3.org/2000/svg" width="141" height="141" viewBox="0 0 141 141">
						  <g  transform="translate(8.243 8)">
							<g  transform="translate(-0.243)" fill="#c5c5c5" stroke="#fff" strokeWidth="8">
							  <rect width="125" height="125" rx="12" stroke="none"/>
							  <rect x="-4" y="-4" width="133" height="133" rx="16" fill="none"/>
							</g>
							<g  transform="translate(-0.243)">
							  <rect  data-name="placeholder" width="125" height="125" rx="12" fill="#2769ee"/>
							  <ellipse  data-name="Ellipse 12" cx="31.25" cy="31.69" rx="31.25" ry="31.69" transform="translate(26.316 35.211)" fill="#fff"/>
							  <ellipse  data-name="Ellipse 11" cx="18.914" cy="19.366" rx="18.914" ry="19.366" transform="translate(64.145 26.408)" fill="#ffe70c" />
							</g>
						  </g>
						</svg>
					</span>
					<h4 className="fs-20 mb-0 text-center">UX Researcher</h4>
					<span className="text-primary mb-3 d-block text-center">Kleon Studios</span>
					
					<p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
					<div>
						<span className="fs-16 mb-3 d-flex"><i className="fas fa-star orange me-3 mt-1"></i>Tempor incididunt ut labore </span>	
						<span className="fs-16 mb-3 d-flex"><i className="fas fa-star orange me-3 mt-1"></i>Lorem ipsum dolor </span>	
						<span className="fs-16 mb-3 d-flex"><i className="fas fa-star orange me-3 mt-1"></i>Sit amet consectetur  </span>	
						<span className="fs-16 mb-3 d-flex"><i className="fas fa-star orange me-3 mt-1"></i>Labore adipsicans elit do uasde </span>	
					</div>
					<div className="location">
						<span className="fs-14 font-w500 d-flex align-items-center mb-3"><i className="fas fa-map-marker-alt"></i>Manchester, England</span>
						<span className="fs-14 font-w500 d-flex align-items-center"><i className="fas fa-comment-dollar"></i>$2,000 - $2,500</span>
					</div>
				</div>
				<div className="card-footer border-0 pt-0">
					<div className="d-flex justify-content-between align-items-center">
						<Link to={"#"} className="btn btn-primary btn-rounded">APPLY JOB</Link>
						<Link to={"#"} className="btn btn-secondary light btn-rounded"><i className="far fa-bookmark fs-20"></i></Link>
					</div>
				</div>
			</div>
		</>
	)
}
export default JobPreview;