const formatLastSeen = (timestamp) => {
  if (!timestamp) return "Last seen recently";

  const now = new Date();
  const lastSeen = new Date(timestamp);

  const diff = now - lastSeen;

  const oneMinute = 60 * 1000;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;

  // Less than 1 minute
  if (diff < oneMinute) {
    return "Last seen just now";
  }

  // Today
  if (now.toDateString() === lastSeen.toDateString()) {
    return `Last seen today at ${lastSeen.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (yesterday.toDateString() === lastSeen.toDateString()) {
    return `Last seen yesterday at ${lastSeen.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Same year
  if (now.getFullYear() === lastSeen.getFullYear()) {
    return `Last seen ${lastSeen.toLocaleDateString([], {
      day: "numeric",
      month: "short",
    })} at ${lastSeen.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return `Last seen ${lastSeen.toLocaleDateString()} ${lastSeen.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export default formatLastSeen;