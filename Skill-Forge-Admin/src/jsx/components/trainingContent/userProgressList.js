import React, { useEffect, useState } from 'react';
import { Alert } from "react-bootstrap";
import axios from 'axios';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


const UserProgressList = () => {
    const [alertMessage, setAlertMessage] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const [trainingContents, setTrainingContents] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    // Récupérer tous les training contents
                    const response = await axios.get('http://localhost:5000/trainingContent/', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const allTrainingContents = response.data;
        
                    // Filtrer les training contents dont la date de fin est dans les deux prochains jours ou a déjà été dépassée
                    const currentDate = new Date();
                    const endDateFilter = new Date();
                    endDateFilter.setDate(endDateFilter.getDate() + 3);
                    const filteredTrainingContents = allTrainingContents.filter(training => new Date(training.endDate) <= endDateFilter);
        
                    // Récupérer les détails des utilisateurs pour les assignedUsers avec un progrès inférieur à 100
                   
                  // Récupérer les détails des utilisateurs pour les assignedUsers avec un progrès inférieur à 100
                   const filteredUsers = [];
                     for (const trainingContent of filteredTrainingContents) {
                          const processedUsers = new Set(); // Créer un ensemble pour stocker les utilisateurs déjà traités
                    for (const userId of trainingContent.assignedUsers) {
                       if (!processedUsers.has(userId)) { // Vérifier si l'utilisateur a déjà été traité
                              const userResponse = await axios.get(`http://localhost:9000/admin/realms/skillForge/users/${userId}`, {
                               headers: {
                               Authorization: `Bearer ${token}`
                            }
            });
            console.log("training content,", trainingContent)
            console.log("user", userId)
            const progress = trainingContent.userProgress[userId];
            console.log("progress", progress)
            // Afficher zéro si le progrès est indéfini
            const displayProgress = progress !== undefined ? progress : 0;
            if(displayProgress < 100){
            filteredUsers.push({
                userId:userId,
                trainingId:trainingContent._id,
                email: userResponse.data.email,
                firstName: userResponse.data.firstName,
                lastName: userResponse.data.lastName,
                progress: displayProgress,
                trainingTitle: trainingContent.title,
                trainingEndDate: trainingContent.endDate
            });
        }
            processedUsers.add(userId); // Ajouter l'utilisateur au set des utilisateurs traités
        }
    }
}

         setFilteredUsers(filteredUsers);


                } catch (error) {
                    console.error('Error fetching data:', error);
                    setAlertMessage({ type: 'danger', message: 'The data retrieval process encountered an error!' });
                }
            }
        };
        
        fetchData();
    }, [token]);
    const formatDate = (dateString) => {
        if (!dateString) {
            return "Not specific";
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


    const sendReminderEmail = async (userId, trainingId, email, userName) => {
        try {
            const response = await axios.post('http://localhost:5000/trainingContent/reminder', {
                userId,
                trainingId,
                userName,
                email
            }, {
                headers: {
                Authorization: `Bearer ${token}`
             }
});
           setAlertMessage({ type: 'success', message: 'email sent successfully!' });
            console.log(response.data.message);
            // Mettre à jour l'état ou afficher une alerte si nécessaire
        } catch (error) {
            console.error('Error sending email:', error);
            setAlertMessage({ type: 'danger', message: 'Error sending email!' });
            // Gérer l'erreur, afficher une alerte, etc.
        }finally {
            setTimeout(() => {
                setAlertMessage(null);
            }, 2000);
        }
    };

     /////////////////////////Pagination/////////////////////////////

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = Math.min(indexOfLastItem - itemsPerPage + 1, filteredUsers.length);
     const itemsToDisplay = searchInput.length > 1 ? filteredResults : filteredUsers;
     const currentItems = itemsToDisplay.slice(indexOfFirstItem - 1, indexOfLastItem);
     const totalPages = Math.ceil(itemsToDisplay.length / itemsPerPage);
 
     const handlePrevClick = () => {
         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
     };
 
     const handleNextClick = () => {
         setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
     };
 ///////////////////////Filter////////////////////////////
     const searchItems = (searchValue) => {
         setSearchInput(searchValue);
         if (searchValue !== '') {
             const filteredData = filteredUsers.filter((item) => {
                 return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
             });
             setFilteredResults(filteredData);
         } else {
             setFilteredResults([]);
         }
         setCurrentPage(1);
     };
    return (
        <>
            {alertMessage && (
                <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible={false} show={true}>
                    {alertMessage.message}
                </Alert>
            )}
<div className="d-flex align-items-center mb-4 flex-wrap justify-content-between">
        <h4 className="fs-20 font-w600">User Progress List</h4>

        <div className="d-flex justify-content-center w-70"> 
          <div className="nav-item d-flex align-items-center ml-3">
            <div className="col-md-4 input-group search-area">
              <input type="text" 
                className="form-control" 
                placeholder="Search..."
                style={{width: '250px'}} 
                onChange={(e) => searchItems(e.target.value)}
              />
              <span className="input-group-text" >
               <i className="flaticon-381-search-2"></i>
              </span>
            </div>
          </div>
        </div>  

      
      </div>
      <div className="row">
                <div className="col-xl-12">
                    <div className="table-responsive dataTables_wrapper" id="application-data">
                        <table className="table display mb-4 dataTablesCard job-table table-responsive-xl card-table dataTable no-footer" id="example5">
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                               
                                <th>Training Title</th>
                                <th>Progress</th>
                                <th>End Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item,index) => (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName} {item.lastName}</td>
                                  
                                    <td>{item.trainingTitle}</td>
                                    <td>{item.progress}</td>
                                    <td>{formatDate(item.trainingEndDate)}</td>
                                    <td   >
                                    <Link to={"#"} className="btn btn-success light btn-xs "  onClick={() => sendReminderEmail(item.userId, item.trainingId, item.email, item.firstName)}  > <i className="fas fa-envelope" style={{fontSize:14}} ></i></Link>
                                  </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="sm-mb-0 mb-3">
                        <h5 className="mb-0">Showing {indexOfFirstItem} to {Math.min(indexOfLastItem, filteredResults.length>0?filteredResults.length:filteredUsers.length)} of {filteredUsers.length} entries</h5>
                    </div>
                    <nav>
                        <ul className="pagination pagination-circle">
                            <li className="page-item page-indicator">
                                <Link to={"#"} className="page-link" onClick={handlePrevClick} disabled={currentPage === 1}>Prev</Link>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <Link to={"#"} className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</Link>
                                </li>
                            ))}
                            <li className="page-item page-indicator">
                                <Link to={"#"} className="page-link" onClick={handleNextClick} disabled={currentPage === totalPages}>Next</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default UserProgressList;
