import {
  postWithFirebaseJwt,
  deleteWithFirebaseJwt,
} from "../firebase/requests-with-firebase";

interface MarkNotificationAsReadRequest {
  notificationId: string;
}

export const markNotificationAsRead = async (
  data: MarkNotificationAsReadRequest
) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/notification/read-notification",
      { notificationId: data.notificationId }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error marking notification as read: ${errorText}`);
    }

    const updatedNotification = await response.json();
    return updatedNotification;
  } catch (error) {
    console.error("Failed to mark notification as read", error);
    throw error;
  }
};

export const deleteAllNotifications = async (userId: string) => {
  try {
    const response = await deleteWithFirebaseJwt(
      "/web/notification/delete-all-notifications",
      { userId }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error deleting notifications: ${errorText}`);
    }

    const deletedNotifications = await response.json();
    return deletedNotifications;
  } catch (error) {
    console.error("Failed to delete all notifications", error);
    throw error;
  }
};
