import BigNumber from 'bignumber.js';

const fmt = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
};

BigNumber.config({ FORMAT: fmt });

const int = (n: number) => new BigNumber(n).toFormat(0);

const bigInt = (n: number) => int(n / 1000000000000000000);

// Abbreviates long numbers into a more readable format
export default { int, bigInt };
