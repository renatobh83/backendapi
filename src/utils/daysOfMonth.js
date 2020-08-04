const {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
  addDays,
} = require("date-fns");

module.exports = (current) => {
  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd);
  const dateFormate = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formateDate = "";
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formateDate = format(day, dateFormate);
      if (!isSameMonth(day, monthStart)) {
      } else {
        days.push(formateDate);
      }
      day = addDays(day, 1);
    }
    rows.push(days);
    days = [];
  }
  return rows;
};
