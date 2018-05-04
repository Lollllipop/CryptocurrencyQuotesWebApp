export function epoch2String(epoch) {
  const epochDateObject = new Date(0);
  epochDateObject.setUTCSeconds(epoch);

  let hours = epochDateObject.getHours();
  let minutes = epochDateObject.getMinutes();

  if (hours.toString().length === 1) {
    hours = '0' + hours;
  }

  if (minutes.toString().length === 1) {
    minutes = '0' + minutes;
  }

  return hours + ':' + minutes;
}