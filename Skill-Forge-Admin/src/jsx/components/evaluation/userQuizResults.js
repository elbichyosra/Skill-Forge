import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const UserProgressGraph = () => {
  const token = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [results, setResults] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  // Fetch users from Keycloak
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:9000/admin/realms/skillForge/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const formattedUsers = response.data.map(user => ({
          value: user.id,
          label: user.email  // Display email instead of first and last name
        }));
        setUsers(formattedUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
    }
  }, [token]);

  // Fetch results when a user is selected
  useEffect(() => {
    if (selectedUser) {
      axios.get(`http://localhost:5000/results/${selectedUser.value}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setResults(response.data);
      })
      .catch(error => console.error('Error fetching results:', error));
    }
  }, [selectedUser, token]);

  // Prepare data for the chart (using training titles as labels)
  // const chartData = {
  //   labels: results.map(result => {
  //     // Safely check if trainingContent and its title exist
  //     return result.quizId.trainingContent ? result.quizId.trainingContent.title : 'Unknown Title';
  //   }),
  //   datasets: [{
  //     label: 'Score',
  //     data: results.map(result => result.score),
  //     fill: false,
  //     borderColor: 'rgb(75, 192, 192)',
  //     tension: 0.1
  //   }]
  // };
  const chartData = {
    labels: results.map(result => {
        // Check if quizId and trainingContent exist
        return result.quizId?.trainingContent?.title || 'Unknown Title';
    }),
    datasets: [{
      label: 'Score',
      data: results.map(result => Math.round(result.score)),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
};


  const options = {
    scales: {
      x: { title: { display: true, text: 'Training Content' }},
      y: { title: { display: true, text: 'Score' }, min: 0, max: 100 }
    }
  };

  return (
    <div>
      {alertMessage && (
        <Alert variant={alertMessage.type}>
          {alertMessage.message}
        </Alert>
      )}
      <div>
      <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h2 className="fs-24 mb-0">User Progress Graph</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={users}
          placeholder="Select User by Email..."
        />
      </div>
      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Line data={chartData} options={options} />
        </div>
      )}
    </div></div></div></div></div></div>
  );
};

export default UserProgressGraph;
