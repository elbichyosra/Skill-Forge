import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import {nanoid} from 'nanoid';
import swal from "sweetalert";

const TableContent = [
	{ id:1, position:'Network Engineer', type:'Full-Time',pdate:'12-01-2021', ldate:'24-01-2021', cdate:'25-01-2021',status:'Active'},
	{ id:2, position:'Entry Level Software Developer', type:'Full-Time',pdate:'12-01-2021', ldate:'24-01-2021',cdate:'25-01-2021',status:'InActive'},
	{ id:3, position:'Java Developer', type:'Full-Time',pdate:'12-01-2021', ldate:'24-01-2021', cdate:'25-01-2021',status:'Active'},
	{ id:4, position:'IOS Developer', 	type:'Full-Time',pdate:'12-01-2021', ldate:'24-01-2021', cdate:'25-01-2021',status:'InActive'},
	{ id:5, position:'Junior Web Developer', type:'Full-Time',pdate:'12-01-2021', ldate:'24-01-2021', cdate:'25-01-2021',status:'Active'},
	{ id:6, position:'SQL Developer', 	type:'Full-Time',pdate:'12-01-2021', ldate:'24-01-2021', cdate:'25-01-2021',status:'InActive'},
	{ id:7, position:'Junior Developer', type:'Full-Time',pdate:'12-01-2021', ldate:'24-01-2021', cdate:'25-01-2021',status:'Active'},
];



const JobLists = () => {
	
	//Modal box
	const [addCard, setAddCard] = useState(false);
	
	const [contacts, setContacts] = useState(TableContent);
	
	// delete data  
    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];    
        const index = contacts.findIndex((contact)=> contact.id === contactId);
        newContacts.splice(index, 1);
        setContacts(newContacts);
    }
	
	//Add data 
    const [addFormData, setAddFormData ] = useState({
        position:'',
        type:'',
		pdate:'',
		ldate:'',
		cdate:'',
		status:'',
    }); 
    
    // Add contact function
    const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
    
     //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        var error = false;
		var errorMsg = '';
        if(addFormData.position === ""){
            error = true;
			errorMsg = 'Please fill position';
        }else if(addFormData.type === ""){
            error = true;
			errorMsg = 'Please fill type';
        }
        else if(addFormData.pdate === ""){
            error = true;
			errorMsg = 'Please fill position date';
        } 
		else if(addFormData.ldate === ""){
            error = true;
			errorMsg = 'Please fill Last date';
        }
		else if(addFormData.status === ""){
            error = true;
			errorMsg = 'Please write status';
        }
        if(!error){
            const newContact = {
                id: nanoid(),
                position: addFormData.position,
                type:  addFormData.type,
				pdate: addFormData.pdate,
				ldate: addFormData.ldate,
				cdate: addFormData.cdate,
				status: addFormData.status,
			};
            const newContacts = [...contacts, newContact];
            setContacts(newContacts);
            setAddCard(false);
            swal('Good job!', 'Successfully Added', "success");
            addFormData.position  = addFormData.type = addFormData.pdate = addFormData.ldate = addFormData.cdate = addFormData.status = '';         
            
        }else{
			swal('Oops', errorMsg, "error");
		}
    };
	
	//Edit start 
	const [editModal, setEditModal] = useState(false);	
	// Edit function editable page loop
    const [editContactId, setEditContactId] = useState(null);
   
    // Edit function button click to edit
    const handleEditClick = ( event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);
        const formValues = {
            position: contact.position,
            type: contact.type,  
            pdate: contact.pdate,  
            ldate: contact.ldate,  
            cdate: contact.cdate,  
            status: contact.status,  
        }
        setEditFormData(formValues);
        setEditModal(true);
    };
    
    
    // edit  data  
    const [editFormData, setEditFormData] = useState({
        position:'',
        type:'',
		pdate:'',
		ldate:'',
		cdate:'',
		status:'',
    })
    
    //update data function
    const handleEditFormChange = (event) => {
        event.preventDefault();   
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };
    
    // edit form data submit
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContact = {
            id: editContactId,	
			position: editFormData.position,
            type: 	editFormData.type,  
            pdate: 	editFormData.pdate,  
            ldate: 	editFormData.ldate,  
            cdate: 	editFormData.cdate,  
            status: editFormData.status,
        }
        const newContacts = [...contacts];
        const index = contacts.findIndex((contact)=> contact.id === editContactId);
        newContacts[index] = editedContact;
        setContacts(newContacts);
        setEditContactId(null);
        setEditModal(false);
        
    }
	return(
		<>
			<div className="d-flex align-items-center mb-4 flex-wrap">
				<h4 className="fs-20 font-w600  me-auto">Job List</h4>
				<div>
					<Link to={"#"} className="btn btn-primary me-3 btn-sm" onClick={()=> setAddCard(true)}>
						<i className="fas fa-plus me-2"></i>Add New Job
					</Link>
					<Modal className="modal fade"  show={addCard} onHide={setAddCard} >
						<div role="document">
							<div className="">
								<form >
									<div className="modal-header">
										<h4 className="modal-title fs-20">Add Contact</h4>
										<button type="button" className="btn-close" onClick={()=> setAddCard(false)} data-dismiss="modal"><span></span></button>
									</div>
									<div className="modal-body">
										<i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
										<div className="add-contact-box">
											<div className="add-contact-content">
												<div className="form-group mb-3">
													<label className="text-black font-w500">Position</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="position" required="required"
															onChange={handleAddFormChange}
															placeholder="position"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												<div className="form-group mb-3">
													<label className="text-black font-w500">Type</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="type" required="required"
															onChange={handleAddFormChange}
															placeholder="type"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												<div className="form-group mb-3">
													<label className="text-black font-w500">Posted Date</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="pdate" required="required"
															onChange={handleAddFormChange}
															placeholder="pdate"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												<div className="form-group mb-3">
													<label className="text-black font-w500">Last Date</label>
													<div className="contact-name">
														<input type="text"  className="form-control" autocomplete="off"
															name="ldate" required="required"
															onChange={handleAddFormChange}
															placeholder="ldate"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												<div className="form-group mb-3">
													<label className="text-black font-w500">Close Date</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="cdate" required="required"
															onChange={handleAddFormChange}
															placeholder="cdate"
														/>
														<span className="validation-text"></span>
													</div>
												</div>											
												<div className="form-group mb-3">
													<label className="text-black font-w500">Status</label>
													<div className="contact-name">
														<input type="text"  className="form-control" autocomplete="off"
															name="status" required="required"
															onChange={handleAddFormChange}
															placeholder="status"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="submit" className="btn btn-success" onClick={handleAddFormSubmit}>Add</button>   
										<button type="button" onClick={()=> setAddCard(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
									</div>
								</form>
								
							</div>
						</div>
					</Modal>
					<Modal className="modal fade"  show={editModal} onHide={setEditModal} >
						<div  role="document">
							<div>
								<form >
									<div className="modal-header">
										<h4 className="modal-title fs-20">Add Contact</h4>
										<button type="button" className="btn-close" onClick={()=> setEditModal(false)} data-dismiss="modal"><span></span></button>
									</div>
									<div className="modal-body">
										<i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
										<div className="add-contact-box">
											<div className="add-contact-content">
											  <div className="form-group mb-3">
													<label className="text-black font-w500">Position</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="position" required="required"
															value={editFormData.position}
															onChange={handleEditFormChange}
															placeholder="position"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												<div className="form-group mb-3">
													<label className="text-black font-w500">Type</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="type" required="required"
															value={editFormData.type}
															onChange={handleEditFormChange}
															placeholder="type"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												<div className="form-group mb-3">
													<label className="text-black font-w500">Posted Date</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="pdate" required="required"
															value={editFormData.pdate}
															onChange={handleEditFormChange}
															placeholder="pdate"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												<div className="form-group mb-3">
													<label className="text-black font-w500">Last Date</label>
													<div className="contact-name">
														<input type="text"  className="form-control" autocomplete="off"
															name="ldate" required="required"
															value={editFormData.ldate}
															onChange={handleEditFormChange}
															placeholder="ldate"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												<div className="form-group mb-3">
													<label className="text-black font-w500">Close Date</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="cdate" required="required"
															value={editFormData.cdate}
															onChange={handleEditFormChange}
															placeholder="cdate"
														/>
														<span className="validation-text"></span>
													</div>
												</div>											
												<div className="form-group mb-3">
													<label className="text-black font-w500">Status</label>
													<div className="contact-name">
														<input type="text"  className="form-control" autocomplete="off"
															name="status" required="required"
															value={editFormData.status}
															onChange={handleEditFormChange}
															placeholder="status"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												
												
												
																							  
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="submit" className="btn btn-primary" onClick={handleEditFormSubmit}>Save</button>  
										<button type="button" onClick={()=> setEditModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
									</div>
								</form>
								
							</div>
						</div>
					</Modal>
					<Link to={"#"} className="btn btn-secondary btn-sm me-3"> <i className="fas fa-envelope"></i></Link>
					<Link to={"#"} className="btn btn-secondary btn-sm me-3"><i className="fas fa-phone-alt"></i></Link>
					<Link to={"#"} className="btn btn-secondary btn-sm"><i className="fas fa-info"></i></Link>
				</div>
			</div>	
			<div className="row">
				<div className="col-xl-12">
					<div className="table-responsive">
						<table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer" >
							<thead>
								<tr>
									<th>No</th>
									<th>Position</th>
									<th>Type</th>
									<th>Posted Date</th>
									<th>Last Date To Apply</th>
									<th>Close Date</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{contacts.map((contact,index)=>(
									<tr key={index}>
										<td>#12345</td>
										<td>{contact.position}</td>
										<td className="wspace-no">{contact.type}</td>
										<td>{contact.pdate}</td>
										<td>{contact.ldate}</td>
										<td>{contact.cdate}</td>
										<td><span className="badge badge-primary badge-lg light">{contact.status}</span></td>
										<td>
											<div className="action-buttons d-flex justify-content-end">
												<Link to={"#"} className="btn btn-success light mr-2">
													<svg xmlns="http://www.w3.org/2000/svg" className="svg-main-icon" width="24px" height="24px" viewBox="0 0 32 32" x="0px" y="0px"><g data-name="Layer 21"><path d="M29,14.47A15,15,0,0,0,3,14.47a3.07,3.07,0,0,0,0,3.06,15,15,0,0,0,26,0A3.07,3.07,0,0,0,29,14.47ZM16,21a5,5,0,1,1,5-5A5,5,0,0,1,16,21Z" fill="#000000" fillRule="nonzero"></path><circle cx="16" cy="16" r="3" fill="#000000" fillRule="nonzero"></circle></g></svg>
												</Link>
												<Link to={"#"} className="btn btn-secondary light mr-2"
													onClick={(event) => handleEditClick(event, contact)}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
														<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
															<rect x="0" y="0" width="24" height="24"></rect>
															<path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fillRule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "></path>
															<rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"></rect>
														</g>
													</svg>
												</Link>
												<Link to={"#"} className="btn btn-danger light"
													onClick={()=>handleDeleteClick(contact.id)}
												>
													<svg xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
														<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
															<rect x="0" y="0" width="24" height="24"></rect>
															<path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fillRule="nonzero"></path>
															<path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
														</g>
													</svg>
												</Link>
											</div>
										</td>
									</tr>
								))}
							</tbody>	
						</table>
					</div>		
				</div>	
				<div className="d-flex align-items-center justify-content-between flex-wrap">
					<div className="sm-mb-0 mb-3">
						<h5 className="mb-0">Showing 1 to 7 of 7 entries</h5>
					</div>
					<nav>
						<ul className="pagination pagination-circle">
							<li className="page-item page-indicator">
								<Link to={"#"} className="page-link">Prev</Link>
							</li>
							<li className="page-item active"><Link to={"#"} className="page-link">1</Link>
							</li>
							<li className="page-item page-indicator">
								<Link to={"#"} className="page-link">Next</Link>
							</li>
						</ul>
					</nav>
				</div>				
			</div>		
		</>
	)	
}
export default JobLists;