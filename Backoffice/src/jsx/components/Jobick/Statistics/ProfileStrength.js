import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const ApexPieChart2 = loadable(() =>
	pMinDelay(import("./ApexPieChart2"), 1000)
);


const ProfileStrength = () =>{
	return(
		<>
			<div className="card">
				<div className="card-header border-0 pb-0">
					<h4 className="fs-20 font-w600">Profile Stregth</h4>
				</div>
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-xl-6 col-sm-6">
							<div className="progress default-progress">
								<div className="progress-bar bg-vigit progress-animated" style={{width: "90%", height:"13px"}} role="progressbar">
									<span className="sr-only">90% Complete</span>
								</div>
							</div>
							<div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
								<span className="fs-14 font-w500">Visitor</span>
								<span className="fs-16"><span className="text-black pe-2"></span>90%</span>
							</div>
							<div className="progress default-progress">
								<div className="progress-bar bg-contact progress-animated" style={{width: "68%", height:"13px"}} role="progressbar">
									<span className="sr-only">45% Complete</span>
								</div>
							</div>
							<div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
								<span className="fs-14 font-w500">Contact</span>
								<span className="fs-16"><span className="text-black pe-2"></span>68%</span>
							</div>
							<div className="progress default-progress">
								<div className="progress-bar bg-follow progress-animated" style={{width: "85%", height:"13px"}} role="progressbar">
									<span className="sr-only">85% Complete</span>
								</div>
							</div>
							<div className="d-flex align-items-end mt-2 pb-4 justify-content-between">
								<span className="fs-14 font-w500">Follow</span>
								<span className="fs-16"><span className="text-black pe-2"></span>85%</span>
							</div>
						</div>
						<div className="col-xl-6 col-sm-6">
							<div id="pieChart3">
								<ApexPieChart2   />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default ProfileStrength;