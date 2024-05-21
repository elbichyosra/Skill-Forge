import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import {  useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
const AssignTrainingContent = () => {
  const token = useSelector((state) => state.auth.token);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [users, setUsers] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    useEffect(() => {
        // Fetch users
        if(token){
        axios.get('http://localhost:9000/admin/realms/skillForge/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const usersData = response.data;
            const formattedUsers = usersData.map(user => ({
                value: user.id,
                label: user.username,
                firstName:user.firstName
            }));
            setUsers(formattedUsers);
        })
        .catch(error => console.error('Error fetching users:', error));
      
        // Fetch training content
        axios.get('http://localhost:5000/trainingContent/', {
          headers: {
              Authorization: `Bearer ${token}`
          }})
        .then(response => {
            const trainingsData = response.data;
            const formattedTrainings = trainingsData.map(training => ({
                value: training._id,
                label: training.title
            }));
            setTrainings(formattedTrainings);
        })
        .catch(error => console.error('Error fetching training content:', error));}
    }, [token]);
//assign
    const handleAssign = () => {
      if (!selectedUser || !selectedTraining) {

        setAlertMessage({ type: 'danger', message: 'Please select both user and training content'});
       setTimeout(() => {
          setAlertMessage(null);
      }, 2000);
        return;
    }
      
            const assignData = {
                trainingId: selectedTraining.value,
                userId: selectedUser.value,
                userName: selectedUser.firstName,
                email: selectedUser.label 
            };
          console.log(assignData)
            axios.post('http://localhost:5000/trainingContent/assigned/', assignData, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            })
            .then(response => {
                console.log('Training content assigned successfully:', response.data);
              
                setAlertMessage({ type: 'success', message: 'Training content assigned successfully!'});
                // Reset selections after successful assignment
                setSelectedUser(null);
                setSelectedTraining(null);
            })
            .catch(error => {console.error('Error assigning training content:', error);
         
                setAlertMessage({ type: 'danger', message: error.response.data.message || 'Error assigning training content. Please try again later.' })
     } )

            // setAlertMessage({ type: 'danger', message: 'Error assigning training content. Please try again later.'});})
            .finally(()=> setTimeout(() => {
              setAlertMessage(null);
          }, 2000));
         
        
    };

    return (
      <>
      {alertMessage && (
        <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible={false} show={true}>
            {alertMessage.message}
        </Alert>
    )}
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h2 className="fs-24 mb-0">Assign Training Content</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <Select
                                    value={selectedUser}
                                    onChange={setSelectedUser}
                                    options={users}
                                    placeholder="Select User..."
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <Select
                                    value={selectedTraining}
                                    onChange={setSelectedTraining}
                                    options={trainings}
                                    placeholder="Select Training Content..."
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary me-2" onClick={handleAssign}>
                                    Assign
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-end"></div>
                </div>
            </div>
        </div></>
    );
};

export default AssignTrainingContent;
