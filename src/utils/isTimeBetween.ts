export const isTimeBetween = (
  inputTime: string,
  startTime: string,
  endTime: string
) => {
  const inputDate = new Date(`2000-01-01T${inputTime}`);
  const startDate = new Date(`2000-01-01T${startTime}`);
  const endDate = new Date(`2000-01-01T${endTime}`);

  return inputDate >= startDate && inputDate <= endDate;
};
