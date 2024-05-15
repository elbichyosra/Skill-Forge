import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ReactComponent as BellIcon } from 'feather-icons/dist/icons/bell.svg';
import { formatDistanceToNow } from 'date-fns';

const NotificationIcon = styled.div`
  ${tw`relative cursor-pointer hocus:text-primary-500`}
  width: 25px;  // Increase width
  height: 25px; // Increase height
`;

const BellIconStyled = styled(BellIcon)`
  width: 100%;  // Make the BellIcon take the full size of NotificationIcon
  height: 100%; // Make the BellIcon take the full size of NotificationIcon
`;

const NotificationDropdown = styled.div`
  ${tw`absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg`}
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 50;
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

const NotificationTime = styled.p`
  ${tw`text-gray-500 text-sm`}
`;

const SeeAllLink = styled.div`
  ${tw`text-center text-blue-500 cursor-pointer py-2`}
`;

const UnreadBadge = styled.span`
  ${tw`absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center`}
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.25rem;
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // Initialize unread count to 0
  const userId = useSelector((state) => state.auth.userId);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/notification/${userId}`);
      setNotifications(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId,notifications]);

  useEffect(() => {
    // Update unread count when notifications change
    if (notifications.length > 0) {
      const unreadCount = notifications.filter(notification => !notification.read).length;
      setUnreadCount(unreadCount);
    }
  }, [notifications]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset unread count and mark all notifications as read
      try {
        await axios.put(`http://localhost:5000/notification/${userId}/markAsRead`);
        setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
      setUnreadCount(0);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  return (
    <NotificationIcon ref={dropdownRef}>
      <BellIconStyled onClick={toggleDropdown} />
      {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
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
                <NotificationTime>
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </NotificationTime>
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
