export const showBrowserNotification = ({
  title,
  body,
  icon,
}) => {
  if (!("Notification" in window)) return;

  if (Notification.permission !== "granted") return;

  const notification = new Notification(title, {
    body,
    icon,
    badge: icon,
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
};