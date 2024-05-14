const Notification = require('../models/notification');
const TrainingContent = require('../models/trainingContent');




//get notifications by user

exports.getNotificationsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Create notification
const createNotification = async (userId, message) => {
    try {
        const notification = new Notification({ userId, message });
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};

// Send reminders to a user
exports.sendReminders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const allTrainingContents = await TrainingContent.find();
        const currentDate = new Date();
        const notifications = [];

        for (const trainingContent of allTrainingContents) {
            if (trainingContent.endDate && trainingContent.assignedUsers.length > 0) {
                const endDate = new Date(trainingContent.endDate);
                const threeDaysBeforeEndDate = new Date(endDate);
                threeDaysBeforeEndDate.setDate(endDate.getDate() - 3);

                if (currentDate >= threeDaysBeforeEndDate) {
                    if (trainingContent.assignedUsers.includes(userId)) {
                        const progress = trainingContent.userProgress.get(userId) || 0;
                        if (progress < 100) {
                            const message = `Reminder: Incomplete training "${trainingContent.title}"`;
                            const existingNotification = await Notification.findOne({ userId, message });
console.log(existingNotification);
                            if (existingNotification==null) {
                                const notification = await createNotification(userId, message);
                                notifications.push(notification);
                            }
                        }
                    }
                }
            }
        }

       return res.status(200).json(notifications.length > 0 ? notifications : { message: 'No reminders to send' });
    } catch (error) {
        console.error('Error sending reminders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
