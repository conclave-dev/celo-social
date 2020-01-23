// Abbreviates long numbers into a more readable format
export const abbreviateNumber = (value: number) => {
  let newValue = value;
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixNum = 0;
  while (newValue >= 1000) {
    newValue /= 1000;
    suffixNum += 1;
  }

  let newValueString = newValue.toPrecision(3);

  newValueString += suffixes[suffixNum];
  return newValueString;
};
