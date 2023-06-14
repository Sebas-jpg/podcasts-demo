export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDuration = (durationInSeconds) => {
  if (!durationInSeconds) return "";
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  const formattedHours = hours > 0 ? `${hours}:` : "";
  const formattedMinutes = minutes.toString().padStart(hours > 0 ? 2 : 1, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
};
