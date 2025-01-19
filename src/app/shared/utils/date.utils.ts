export const addDaysToDate = (baseDate: Date, days: number): Date => {
  const newDate = new Date(baseDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
