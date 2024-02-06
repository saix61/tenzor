export const validateLocaleDate = (date: number): string => {
  const optionsFull: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const newDate = new Date(date);
  const currentDate = new Date().toLocaleDateString("en-EN", optionsFull);
  const localeDate = newDate.toLocaleDateString("en-EN", optionsFull);

  return currentDate === localeDate
    ? newDate.toLocaleTimeString("en-EN", optionsTime)
    : new Date().getFullYear() === newDate.getFullYear()
    ? newDate.toLocaleDateString("en-EN", {
        month: "long",
        day: "numeric",
      })
    : localeDate;
};
