import { Dropdown } from "react-bootstrap";

const DropdownBlog = () => {
	return(
		<>
			<Dropdown className="text-center">
				<Dropdown.Toggle variant="" as="div" className="btn-link i-false" >	
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z" stroke="#3E4954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
						<path d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z" stroke="#3E4954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
						<path d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z" stroke="#3E4954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
					</svg>
				</Dropdown.Toggle>	
				<Dropdown.Menu className="dropdown-menu-right" >
					<Dropdown.Item >Delete </Dropdown.Item>
					<Dropdown.Item >Edit </Dropdown.Item>		
				</Dropdown.Menu>			
			</Dropdown>
		</>
	)
}
export default DropdownBlog;