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
