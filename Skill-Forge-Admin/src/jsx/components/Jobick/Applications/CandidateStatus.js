import React,{useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import DropdownBlog from './../DropdownBlog';

const CandidateStatus = () =>{
	const [data, setData] = useState(
		document.querySelectorAll('#candidate-data tbody tr')
	)
	const sort = 8
	const activePag = useRef(0)
	const [test, settest] = useState(0)

	  // Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove('d-none')
			} else {
				data[i].classList.add('d-none')
			}
		}
	}
	// use effect
	useEffect(() => {
		setData(document.querySelectorAll('#candidate-data tbody tr'))
		//chackboxFun()
	}, [test])
	// Active pagginarion
		activePag.current === 0 && chageData(0, sort)
	// paggination
		let paggination = Array(Math.ceil(data.length / sort))
			.fill()
			.map((_, i) => i + 1)
	 // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i
		chageData(activePag.current * sort, (activePag.current + 1) * sort)
		settest(i)
	}
	const chackbox = document.querySelectorAll('.candidate_sorting_1 input')
	const motherChackBox = document.querySelector('.sorting_asc4 input')
	const chackboxFun = (type) => {
		for (let i = 0; i < chackbox.length; i++) {
		const element = chackbox[i]
			if (type === 'all') {
				if (motherChackBox.checked) {
					element.checked = true
				} else {
					element.checked = false
				}
			} else {
				if (!element.checked) {
					motherChackBox.checked = false
					break
				} else {
					motherChackBox.checked = true
				}
			}
		}
	}
	return(
		<>
			<div className="table-responsive dataTables_wrapper" id="candidate-data">
				<table className="table dataTable display mb-4 dataTablesCard order-table  card-table text-black  application no-footer ms-0" id="example5">
					<thead>
						<tr role='row'>
							<th className="sorting_asc4">
								<div className='form-check custom-checkbox'>
									<input type='checkbox' className='form-check-input' id='checkAll' required onClick={() => chackboxFun('all')}/>
									<label className='form-check-label' htmlFor='checkAll'/>
								</div>
							</th>
							<th className="sorting_asc4">Order ID</th>
							<th className="sorting_asc4">Date Applied</th>
							<th className="sorting_asc4">Company</th>
							<th className="sorting_asc4">Type</th>
							<th className="sorting_asc4">Position</th>
							<th className="sorting_asc4">Contact</th>
							<th className="sorting_asc4">Status</th>
							<th className="sorting_asc4">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr role='row' className='odd'>
							<td className='candidate_sorting_1'>
								<div className='checkbox me-0 align-self-center'>
									<div className='form-check  custom-checkbox '>
										<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check2' required/>
										<label className='form-check -label' htmlFor='check2'/>
									</div>
								</div>
							</td>
							<td>#000123456</td>
							<td className="wspace-no">Nov 21th 2020 09:21 AM</td>
							<td className="wspace-no">
								<span className="fs-16">
									<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53">
									  <g  transform="translate(0.243)">
										<rect  width="53" height="53" rx="12" transform="translate(-0.243)" fill="#c5c5c5"/>
										<g  transform="translate(-0.243)">
										  <rect  data-name="placeholder" width="53" height="53" rx="12" fill="#ac30c4"/>
										  <ellipse  data-name="Ellipse 12" cx="13.243" cy="13.43" rx="13.243" ry="13.43" transform="translate(11.152 14.922)" fill="#fff"/>
										  <ellipse  data-name="Ellipse 11" cx="8.016" cy="8.207" rx="8.016" ry="8.207" transform="translate(27.183 11.191)" fill="#ffe70c" />
										</g>
									  </g>
									</svg>

									Kelon Team
								</span>
							</td>
							<td>PART TIME</td>
							<td>UI Reseracher</td>
							<td className="wspace-no">
								<span className="text-secoundry fs-14 font-w600">
									<i className="fas fa-phone-alt me-2"></i>
										012 3123412 441
								</span>
							</td>
							<td><span className="btn bgl-secondary light  text-secoundry btn-sm btn-rounded">Candidate</span></td>						
							<td><DropdownBlog /></td>
						</tr>
						<tr role='row' className='even'>
							<td className='candidate_sorting_1'>
								<div className='checkbox me-0 align-self-center'>
									<div className='form-check  custom-checkbox '>
										<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check5' required/>
										<label className='form-check -label' htmlFor='check5'/>
									</div>
								</div>
							</td>
							<td>#000123456</td>
							<td className="wspace-no">Nov 21th 2020 09:21 AM</td>
							<td className="wspace-no">
								<span className="fs-16">
									<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53">
									  <g  transform="translate(0.243)">
										<rect  width="53" height="53" rx="12" transform="translate(-0.243)" fill="#c5c5c5"/>
										<g  transform="translate(-0.243)">
										  <rect  data-name="placeholder" width="53" height="53" rx="12" fill="#e9b934"/>
										  <ellipse  data-name="Ellipse 12" cx="13.243" cy="13.43" rx="13.243" ry="13.43" transform="translate(11.152 14.922)" fill="#fff"/>
										  <ellipse  data-name="Ellipse 11" cx="8.016" cy="8.207" rx="8.016" ry="8.207" transform="translate(27.183 11.191)" fill="#ffe70c" />
										</g>
									  </g>
									</svg>

									Bubbles Studios
								</span>
							</td>
							<td>PART TIME</td>
							<td>UI Reseracher</td>
							<td className="wspace-no">
								<span className="text-secoundry fs-14 font-w600">
									<i className="fas fa-phone-alt me-2"></i>
										012 3123412 441
								</span>
							</td>
						
							<td><span className="btn bgl-secondary light   btn-rounded btn-sm">Candidate</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role='row' className='odd'>
							<td className='candidate_sorting_1'>
								<div className='checkbox me-0 align-self-center'>
									<div className='form-check  custom-checkbox '>
										<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check7' required/>
										<label className='form-check -label' htmlFor='check7'/>
									</div>
								</div>
							</td>
							<td>#000123456</td>
							<td className="wspace-no">Nov 21th 2020 09:21 AM</td>
							<td className="wspace-no">
								<span className="fs-16">
									<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53">
									  <g  transform="translate(0.243)">
										<rect  width="53" height="53" rx="12" transform="translate(-0.243)" fill="#c5c5c5"/>
										<g  transform="translate(-0.243)">
										  <rect  data-name="placeholder" width="53" height="53" rx="12" fill="#4cc82f"/>
										  <ellipse  data-name="Ellipse 12" cx="13.243" cy="13.43" rx="13.243" ry="13.43" transform="translate(11.152 14.922)" fill="#fff"/>
										  <ellipse  data-name="Ellipse 11" cx="8.016" cy="8.207" rx="8.016" ry="8.207" transform="translate(27.183 11.191)" fill="#ffe70c" />
										</g>
									  </g>
									</svg>

									Kripton Inc.
								</span>
							</td>
							<td>PART TIME</td>
							<td>UI Reseracher</td>
							<td className="wspace-no">
								<span className="text-secoundry fs-14 font-w600">
									<i className="fas fa-phone-alt me-2"></i>
										012 3123412 441
								</span>
							</td>
							<td><span className="btn bgl-secondary light   btn-rounded btn-sm">Candidate</span></td>
							<td><DropdownBlog /></td>
						</tr>
						<tr role='row' className='even'>
							<td className='candidate_sorting_1'>
								<div className='checkbox me-0 align-self-center'>
									<div className='form-check  custom-checkbox '>
										<input type='checkbox' onClick={() => chackboxFun()} className='form-check-input' id='check9' required/>
										<label className='form-check -label' htmlFor='check9'/>
									</div>
								</div>
							</td>
							<td>#000123456</td>
							<td className="wspace-no">Nov 21th 2020 09:21 AM</td>
							<td className="wspace-no">
								<span className="fs-16">
									<svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53">
									  <g  transform="translate(0.243)">
										<rect  width="53" height="53" rx="12" transform="translate(-0.243)" fill="#c5c5c5"/>
										<g  transform="translate(-0.243)">
										  <rect  data-name="placeholder" width="53" height="53" rx="12" fill="#dc134a"/>
										  <ellipse  data-name="Ellipse 12" cx="13.243" cy="13.43" rx="13.243" ry="13.43" transform="translate(11.152 14.922)" fill="#fff"/>
										  <ellipse  data-name="Ellipse 11" cx="8.016" cy="8.207" rx="8.016" ry="8.207" transform="translate(27.183 11.191)" fill="#ffe70c" />
										</g>
									  </g>
									</svg>
									Kripton Inc.
								</span>
							</td>
							<td>PART TIME</td>
							<td>UI Reseracher</td>
							<td className="wspace-no">
								<span className="text-secoundry fs-14 font-w600">
									<i className="fas fa-phone-alt me-2"></i>
										012 3123412 441
								</span>
							</td>
							<td><span className="btn bgl-secondary light   btn-rounded btn-sm">Candidate</span></td>
							<td><DropdownBlog /></td>
						</tr>
					</tbody>	
				</table>	
				<div className='d-sm-flex text-center justify-content-between align-items-center'>
					<div className='dataTables_info' id='example5_info'>
						  Showing {activePag.current * sort + 1} to{' '}
						  {data.length > (activePag.current + 1) * sort
							? (activePag.current + 1) * sort
							: data.length}{' '}
						  of {data.length} entries
					</div>

					<div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
						<Link to='/applications' className='paginate_button previous disabled' onClick={() => activePag.current > 0 && onClick(activePag.current - 1)}>
							<i className="fa fa-angle-double-left" aria-hidden="true"></i>
						</Link>
						<span>
							{paggination.map((number, i) => (
								<Link key={i} to='/applications' className={`paginate_button  ${ activePag.current === i ? 'current' : '' } `} onClick={() => onClick(i)}>
									{number}
								</Link>
							))}
						</span>
						<Link to='/applications' className='paginate_button next' onClick={() => activePag.current + 1 < paggination.length && onClick(activePag.current + 1)}>
							<i className="fa fa-angle-double-right" aria-hidden="true"></i>
						</Link>
					</div>
				</div>
			</div>	
		</>
	)
}
export default CandidateStatus;