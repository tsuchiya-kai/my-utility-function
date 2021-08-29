import './style.css';
import { objectOmit } from './utilities/utilities';

type TestObj = {
  test1: string;
  test2: string;
  test3: string;
};

const testObj: TestObj = {
  test1: 'test',
  test2: 'test',
  test3: 'test',
};

const newObj = objectOmit<TestObj, 'test1'>(testObj, 'test1');

console.log({
  testObj,
  newObj,
});
