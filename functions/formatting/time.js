export function getFormattedTimedelta(startTimeTimestamp) {
  const steps = [
    { step: 1000, name: 'seconds' },
    { step: 60, name: 'minutes' },
    { step: 60, name: 'hours' },
    { step: 24, name: 'days' },
    { step: 31, name: 'months' },
    { step: 12, name: 'years' }
  ];
  const now = Date.parse(Date());
  let diff = 1;
  let maxStep = 0;
  const delta = now - startTimeTimestamp;
  while (diff * steps[maxStep].step < delta) {
    diff *= steps[maxStep].step;
    maxStep++;
  }
  return `${Math.floor(delta / diff)} ${steps[maxStep - 1].name} ago`;
}

export const getTimeThresholds = (currentDate = new Date()) => {
  const oneDayAgo = new Date(currentDate);
  oneDayAgo.setDate(currentDate.getDate() - 1);

  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);

  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  // Assuming "start of timestamp count" means the Unix timestamp of January 1, 1970, 00:00:00 UTC
  const startOfTimestampCount = new Date(0); // Unix timestamp

  return [
    oneDayAgo.getTime(),
    oneWeekAgo.getTime(),
    oneMonthAgo.getTime(),
    oneYearAgo.getTime(),
    startOfTimestampCount.getTime()
  ];
};

export const getTimeThresholdsDict = currentTime => {
  const thresholdTimes = getTimeThresholds(currentTime);
  const thresholdsNames = [
    'past 24 hours',
    'past week',
    'past month',
    'past year',
    'all time'
  ];
  return thresholdsNames.map((name, index) => ({
    name,
    time: thresholdTimes[index]
  }));
};
