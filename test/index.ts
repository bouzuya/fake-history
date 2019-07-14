import { Test } from 'beater';
import { tests as historyTests } from './history';

const tests = ([] as Test[])
  .concat(historyTests);

export { tests };
