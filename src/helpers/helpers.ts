const padTo2Digits = (num: number | string | Date): string => {
  return num.toString().padStart(2, '0');
}

export const formatDate = (date: string | Date, withTime = false): string => {
  const d = new Date(date);
  let day = [
    padTo2Digits(d.getDate()),
    padTo2Digits(d.getMonth() + 1),
    d.getFullYear(),
  ].join('/');

  if (withTime) {
    day += ' ' + [
      padTo2Digits(d.getHours()),
      padTo2Digits(d.getMinutes()),
      padTo2Digits(d.getSeconds()),
    ].join(':');
  }

  return day;
}