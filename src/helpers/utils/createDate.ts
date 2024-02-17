export const createDate = (timeInMillis: number): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date(timeInMillis);
  const day = days[currentDate.getUTCDay()];
  const date = currentDate.getUTCDate();
  const month = months[currentDate.getUTCMonth()];
  const year = currentDate.getUTCFullYear();
  const hours = currentDate.getUTCHours();
  const minutes = currentDate.getUTCMinutes();
  const seconds = currentDate.getUTCSeconds();

  return `${day}, ${date} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
};
