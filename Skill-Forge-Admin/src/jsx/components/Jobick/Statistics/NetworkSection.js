import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const NetworkApexChart = loadable(() =>
	pMinDelay(import("./NetworkApexChart"), 1000)
);


const NetworkSection = () =>{
	return(
		<>
			<div className="card">
				<div className="card-header border-0 flex-wrap pb-0">
					<h4 className="fs-20 font-w600">Your Network Summary</h4>
					<div>
						<span>
							<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
							  <rect  width="13" height="13" fill="#f73a0b"/>
							</svg>
							Following
						</span>
						<span className="ms-4 fs-16 font-w600">239</span>
						<div className="mt-2">
							<span>
								<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
								  <rect  width="13" height="13" fill="#f73a0b"/>
								</svg>
								Followers
							</span>
							<span className="ms-4 fs-16 font-w600">824</span>
						</div>
					</div>
				</div>
				<div className="card-body pt-0 pb-3">
					<div id="chartBar" className="chartBar">
						<NetworkApexChart />
					</div>
				</div>
			</div>
		</>
	)
}
export default NetworkSection;