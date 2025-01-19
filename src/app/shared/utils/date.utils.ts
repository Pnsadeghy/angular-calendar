export const addDaysToDate = (baseDate: Date, days: number): Date => {
  const newDate = new Date(baseDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export const isDateEqual = (date1: Date, date2: Date)=>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate()
