import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { requestNotificationPermission } from "../utils/notificationPermission";
import { showBrowserNotification } from "../services/notificationService";
import { removeNotification } from "../store/notificationSlice";

const NotificationListener = ({ children }) => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (notifications.length === 0) return;

    const notification = notifications[0];
    if (
      document.visibilityState === "visible"
    ) {
      return;
    }
    showBrowserNotification({
      title: notification.senderName,
      body: notification.text,
      icon: notification.senderPhoto || "/logo192.png",
    });

    dispatch(removeNotification(notification.id));

  }, [notifications, dispatch]);

  return children;
};

export default NotificationListener;