import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
	const settings = {
		dots: false,
		infinite: true,
		arrows: false,
		variableWidth: true,
		speed: 500,
		slidesToScroll: 1,
		responsive: [
			{
			  breakpoint: 575,
				settings: {
					slidesToScroll: 1,
					variableWidth: false,
				}
			},
		]	
	};
	return (
		<Slider  className="card-slide owl-right-nav " {...settings}>
			<div className="items p-2">
				<div className="jobs text-center">
					<div className="">
						<span>
							<svg className="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
								<g  transform="translate(-457 -443)">
									<rect  width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5"/>
									<g  transform="translate(457 443)">
									  <rect  data-name="placeholder" width="71" height="71" rx="12" fill="#2769ee"/>
									  <circle  data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff"/>
									  <circle  data-name="Ellipse 11" cx="11" cy="11" r="11" transform="translate(36 15)" fill="#ffe70c" />
									</g>
								</g>
							</svg>
						</span>
						<h4 className="mb-0">UI Designer</h4>
						<span className="text-primary mb-3 d-block">Bubbles Studios</span>
					</div>
					<div>
					<span className="d-block mb-1"><i className="fas fa-map-marker-alt me-2"></i>Manchester, England</span>
						<span><i className="fas fa-comments-dollar me-2"></i>$ 2,000 - $ 2,500</span>
					</div>
				</div>	
			</div>
			<div className="items p-2">
				<div className="jobs text-center">
					<div className="">
						<span>
							<svg className="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
								<g  transform="translate(-457 -443)">
									<rect  width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5"/>
									<g  transform="translate(457 443)">
									  <rect  data-name="placeholder" width="71" height="71" rx="12" fill="#ee27c0"/>
									  <circle  data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff"/>
									  <circle  data-name="Ellipse 11" cx="11" cy="11" r="11" transform="translate(36 15)" fill="#ffe70c" />
									</g>
								</g>
							</svg>
						</span>
						<h4 className="mb-0">Researcher</h4>
						<span className="text-primary mb-3 d-block">Kleon Studios</span>
					</div>
					<div>
					<span className="d-block mb-1"><i className="fas fa-map-marker-alt me-2"></i>Manchester, England</span>
						<span><i className="fas fa-comments-dollar me-2"></i>$ 2,000 - $ 2,500</span>
					</div>
				</div>	
			</div>
			<div className="items p-2">
				<div className="jobs text-center">
					<div className="">
						<span>
							<svg className="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
								<g  transform="translate(-457 -443)">
								<rect  width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5"/>
								<g  transform="translate(457 443)">
									<rect  data-name="placeholder" width="71" height="71" rx="12" fill="#2db532"/>
									<circle  data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff"/>
									<circle  data-name="Ellipse 11" cx="11" cy="11" r="11" transform="translate(36 15)" fill="#ffe70c" />
								</g>
							  </g>
							</svg>
						</span>
						<h4 className="mb-0">Frontend</h4>
						<span className="text-primary mb-3 d-block">Green Comp.</span>
					</div>
					<div>
					<span className="d-block mb-1"><i className="fas fa-map-marker-alt me-2"></i>Manchester, England</span>
						<span><i className="fas fa-comments-dollar me-2"></i>$ 2,000 - $ 2,500</span>
					</div>
				</div>	
			</div>
			<div className="items p-2">
				<div className="jobs text-center">
					<div className="">
						<span>
							<svg className="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
							  <g  transform="translate(-457 -443)">
								<rect  width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5"/>
								<g  transform="translate(457 443)">
									<rect  data-name="placeholder" width="71" height="71" rx="12" fill="#2769ee"/>
									<circle  data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff"/>
									<circle  data-name="Ellipse 11" cx="11" cy="11" r="11" transform="translate(36 15)" fill="#ffe70c" />
								</g>
							  </g>
							</svg>
						</span>
						<h4 className="mb-0">UI Designer</h4>
						<span className="text-primary mb-3 d-block">Bubbles Studios</span>
					</div>
					<div>
					<span className="d-block mb-1"><i className="fas fa-map-marker-alt me-2"></i>Manchester, England</span>
						<span><i className="fas fa-comments-dollar me-2"></i>$ 2,000 - $ 2,500</span>
					</div>
				</div>	
			</div>
			<div className="items p-2">
				<div className="jobs text-center">
					<div className="">
						<span>
							<svg className="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
								<g  transform="translate(-457 -443)">
									<rect  width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5"/>
									<g  transform="translate(457 443)">
										<rect  data-name="placeholder" width="71" height="71" rx="12" fill="#ee27c0"/>
										<circle  data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff"/>
										<circle  data-name="Ellipse 11" cx="11" cy="11" r="11" transform="translate(36 15)" fill="#ffe70c" />
									</g>
								</g>
							</svg>
						</span>
						<h4 className="mb-0">Researcher</h4>
						<span className="text-primary mb-3 d-block">Kleon Studios</span>
					</div>
					<div>
					<span className="d-block mb-1"><i className="fas fa-map-marker-alt me-2"></i>Manchester, England</span>
						<span><i className="fas fa-comments-dollar me-2"></i>$ 2,000 - $ 2,500</span>
					</div>
				</div>	
			</div>
			<div className="items p-2">
				<div className="jobs text-center">
					<div className="">
						<span>
							<svg className="mb-2" xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
								<g  transform="translate(-457 -443)">
									<rect  width="71" height="71" rx="12" transform="translate(457 443)" fill="#c5c5c5"/>
									<g  transform="translate(457 443)">
									  <rect  data-name="placeholder" width="71" height="71" rx="12" fill="#2db532"/>
									  <circle  data-name="Ellipse 12" cx="18" cy="18" r="18" transform="translate(15 20)" fill="#fff"/>
									  <circle  data-name="Ellipse 11" cx="11" cy="11" r="11" transform="translate(36 15)" fill="#ffe70c" />
									</g>
								</g>
							</svg>
						</span>
						<h4 className="mb-0">Frontend</h4>
						<span className="text-primary mb-3 d-block">Green Comp.</span>
					</div>
					<div>
					<span className="d-block mb-1"><i className="fas fa-map-marker-alt me-2"></i>Manchester, England</span>
						<span><i className="fas fa-comments-dollar me-2"></i>$ 2,000 - $ 2,500</span>
					</div>
				</div>	
			</div>			
		</Slider>
	);
};

export default HomeSlider;