export const formatTime = (input: string) => {
  const date = new Date(input);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesString =
    minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  return hours + ":" + minutesString + " " + ampm;
};
