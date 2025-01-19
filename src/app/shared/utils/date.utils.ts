export const addDaysToDate = (baseDate: Date, days: number): Date => {
  const newDate = new Date(baseDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export const isDateEqual = (date1: Date, date2: Date)=>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate()

export const changeDateHour = (date: Date, hour: number) => {
  const newDate = new Date(date.getTime());
  newDate.setHours(hour);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  return newDate
}
