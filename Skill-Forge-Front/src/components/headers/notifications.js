import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ReactComponent as BellIcon } from 'feather-icons/dist/icons/bell.svg';

const NotificationIcon = styled.div`
  ${tw`relative cursor-pointer hocus:text-primary-500`}
`;

const NotificationDropdown = styled.div`
  ${tw`absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg`}
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 50; /* Ensure the dropdown is above other elements */
`;

const NotificationItem = styled.div`
  ${tw`border-b border-gray-200 py-2 px-4`}
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationText = styled.p`
  ${tw`text-gray-700`}
`;

const SeeAllLink = styled.div`
  ${tw`text-center text-blue-500 cursor-pointer py-2`}
`;

const ReminderButton = styled.button`
  ${tw`mt-2 w-full text-center text-white bg-primary-500 py-2 rounded hover:bg-primary-700`}
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const userId = useSelector((state) => state.auth.userId);



 
    console.log(userId)
//     sendReminders().then((response) => {
// if (response.data.length > 0 &&response.message!= "No reminders to send") {
// setNotifications((prevNotifications) => [...prevNotifications, ...response.data]);
// }
// setIsLoading(false);
// });

const sendReminders = async () => {
    try {
    const response = await axios.post(`http://localhost:5000/notification/${userId}`);
    if (response.data.length > 0 &&response.message!= "No reminders to send") {
      console.log(response)
        setNotifications((prevNotifications) => [...prevNotifications, ...response.data]);
      
        setIsLoading(false);}
        
        } catch (error) {
        console.error('Error sending reminders:', error);
        return { error: 'Failed to send reminders' };
    }
    };
const fetchNotifications = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/notification/${userId}`);
        setNotifications(response.data);
        setIsLoading(false);
    } catch (error) {
    console.error('Error fetching notifications:', error);
        return [];
        }
    };
    useEffect(() => {
      const fetchData = async () => {
          if (userId) {
              try {
                   sendReminders();
                   fetchNotifications();
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          }
      };
  
      fetchData();
  }, [userId]);
  
//     fetchNotifications().then((data) => {
//     setNotifications(data);
//     setIsLoading(false);
// });


    
//     const fetchNotifications = async () => {
// try {
//     const response = await axios.get(`http://localhost:5000/notification/${userId}`);
//     return response.data;
// } catch (error) {
// console.error('Error fetching notifications:', error);
//     return [];
//     }
// };
    
// const sendReminders = async (userId) => {
// try {
// const response = await axios.post(`http://localhost:5000/notification/${userId}`);
//     return response;
//     } catch (error) {
//     console.error('Error sending reminders:', error);
//     return { error: 'Failed to send reminders' };
// }
// };
    
const toggleDropdown = () => {
    setIsOpen(!isOpen);
};
    
const toggleShowAll = () => {
    setShowAll(!showAll);
    };
    
    
    
    const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);
    
  return (
    <NotificationIcon>
      <BellIcon onClick={toggleDropdown} />
      <NotificationDropdown isOpen={isOpen}>
        {isLoading ? (
          <NotificationItem>Loading notifications...</NotificationItem>
        ) : notifications.length === 0 ? (
          <NotificationItem>No notifications available</NotificationItem>
        ) : (
          <>
            {displayedNotifications.map((notification) => (
              <NotificationItem key={notification._id}>
                <NotificationText>{notification.message}</NotificationText>
              </NotificationItem>
            ))}
            {notifications.length > 3 && (
              <SeeAllLink onClick={toggleShowAll}>
                {showAll ? 'Show Less' : 'See All Notifications'}
              </SeeAllLink>
            )}
           
          </>
        )}
      </NotificationDropdown>
    </NotificationIcon>
  );
};

export default Notifications;
