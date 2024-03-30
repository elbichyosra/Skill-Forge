import React from 'react';
import CountUp from 'react-countup';

//import 
import ProfileStrength from '../Jobick/Statistics/ProfileStrength';
import NetworkSection from '../Jobick/Statistics/NetworkSection';
import VacanciesStatsTab from '../Jobick/Statistics/VacanciesStatsTab';
import CanvasChartTab from '../Jobick/Home/CanvasChartTab';
import FeaturedCompanies from '../Jobick/Home/FeaturedCompanies';

const Statistics = ()=> {
	return(
		<>
			<div className="row">
				<div className="col-xl-12 mt-4">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-body">
									<div className="row shapreter-row">
										<div className="col-xl-2 col-lg-2 col-sm-4 col-6">
											<div className="static-icon">
												<span>
													<i className="fas fa-eye"></i>
												</span>
												<h3 className="count">
													<CountUp end={94} duration={2}/>
												</h3>
												<span className="fs-14">Profile Viewed</span>
											</div>
										</div>
										<div className="col-xl-2 col-lg-2 col-sm-4 col-6">
											<div className="static-icon">
												<span>
													<i className="far fa-comments"></i>
												</span>
												<h3 className="count">
													<CountUp end={261} duration={3}/>
												</h3>
												<span className="fs-14">Unread Messages</span>
											</div>
										</div>
										<div className="col-xl-2 col-lg-2 col-sm-4 col-6">
											<div className="static-icon">
												<span>
													<i className="fas fa-suitcase"></i>
												</span>
												<h3 className="count">
													<CountUp end={874} duration={5}/>
												</h3>
												<span className="fs-14">Application Sent</span>
											</div>
										</div>
										<div className="col-xl-2 col-lg-2 col-sm-4 col-6">
											<div className="static-icon">
												<span>
													<i className="fas fa-suitcase"></i>
												</span>
												<h3 className="count">
													<CountUp end={25} duration={2}/>
												</h3>
												<span className="fs-14">App. Answered</span>
											</div>
										</div>
										<div className="col-xl-2 col-lg-2 col-sm-4 col-6">
											<div className="static-icon">
												<span>
													<i className="fas fa-calendar"></i>
												</span>
												<h3 className="count">
													<CountUp end={221} duration={3}/>
												</h3>
												<span className="fs-14">Interviewed</span>
											</div>
										</div>
										<div className="col-xl-2 col-lg-2 col-sm-4 col-6">
											<div className="static-icon">
												<span>
													<i className="fas fa-phone-alt"></i>
												</span>
												<h3 className="count">
													<CountUp end={4} duration={2}/>
												</h3>
												<span className="fs-14">Hired</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-6">
							<ProfileStrength />
						</div>
						<div className="col-xl-6">
							<NetworkSection />
						</div>
						<div className="col-xl-12">
							<VacanciesStatsTab />
						</div>	
						<div className="col-xl-6">
							<div className="row">
								<div className="col-xl-12">		
									<CanvasChartTab />
								</div>
							</div>
						</div>	
						<div className="col-xl-6">
							<div className="row">	
								<div className="col-xl-12">
									<FeaturedCompanies />
								</div>
							</div>
						</div>		
					</div>
				</div>
			</div>		
		</>
	)
}
export default Statistics;