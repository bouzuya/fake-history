import * as assert from 'power-assert';
import beater from 'beater';

import { FakeHistory } from '../src';

const { test } = beater();

const category = 'fake-history > ';

test(category + 'initial state', () => {
  const history = new FakeHistory();
  assert(history.length === 0);
  assert(history.state === null);
  assert(history.current === null); // extended
  assert(history.currentState === null); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});

test(category + 'push', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  assert(history.length === 1);
  assert(history.state === 1);
  assert(history.current === '/1'); // extended
  assert(history.currentState === 1); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});

test(category + 'push * 3', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  assert(history.length === 3);
  assert(history.state === 3);
  assert(history.current === '/3'); // extended
  assert(history.currentState === 3); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === '/2'); // extended
  assert(history.previousState === 2); // extended
});

test(category + 'push * 3 & back', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.back();
  assert(history.length === 3);
  assert(history.state === 2);
  assert(history.current === '/2'); // extended
  assert(history.currentState === 2); // extended
  assert(history.next === '/3'); // extended
  assert(history.nextState === 3); // extended
  assert(history.previous === '/1'); // extended
  assert(history.previousState === 1); // extended
});

test(category + 'push * 3 & back * 2', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.back();
  history.back();
  assert(history.length === 3);
  assert(history.state === 1);
  assert(history.current === '/1'); // extended
  assert(history.currentState === 1); // extended
  assert(history.next === '/2'); // extended
  assert(history.nextState === 2); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});

test(category + 'push * 3 & back * 3 // ignore', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.back();
  history.back();
  history.back(); // ignore
  assert(history.length === 3);
  assert(history.state === 1);
  assert(history.current === '/1'); // extended
  assert(history.currentState === 1); // extended
  assert(history.next === '/2'); // extended
  assert(history.nextState === 2); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});

test(category + 'push * 3 & back * 2 & forward', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.back();
  history.back();
  history.forward();
  assert(history.length === 3);
  assert(history.state === 2);
  assert(history.current === '/2'); // extended
  assert(history.currentState === 2); // extended
  assert(history.next === '/3'); // extended
  assert(history.nextState === 3); // extended
  assert(history.previous === '/1'); // extended
  assert(history.previousState === 1); // extended
});

test(category + 'push * 3 & back * 2 & forward * 2', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.back();
  history.back();
  history.forward();
  history.forward();
  assert(history.length === 3);
  assert(history.state === 3);
  assert(history.current === '/3'); // extended
  assert(history.currentState === 3); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === '/2'); // extended
  assert(history.previousState === 2); // extended
});

test(category + 'push * 3 & back * 2 & forward * 3 // ignore', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.back();
  history.back();
  history.forward();
  history.forward();
  history.forward(); // ignore
  assert(history.length === 3);
  assert(history.state === 3);
  assert(history.current === '/3'); // extended
  assert(history.currentState === 3); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === '/2'); // extended
  assert(history.previousState === 2); // extended
});

test(category + 'push * 3 & go(-1)', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.go(-1);
  assert(history.length === 3);
  assert(history.state === 2);
  assert(history.current === '/2'); // extended
  assert(history.currentState === 2); // extended
  assert(history.next === '/3'); // extended
  assert(history.nextState === 3); // extended
  assert(history.previous === '/1'); // extended
  assert(history.previousState === 1); // extended
});

test(category + 'push * 3 & go(-2)', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.go(-2);
  assert(history.length === 3);
  assert(history.state === 1);
  assert(history.current === '/1'); // extended
  assert(history.currentState === 1); // extended
  assert(history.next === '/2'); // extended
  assert(history.nextState === 2); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});

test(category + 'push * 3 & go(-3) // ignore', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.go(-3); // ignore
  assert(history.length === 3);
  assert(history.state === 3);
  assert(history.current === '/3'); // extended
  assert(history.currentState === 3); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === '/2'); // extended
  assert(history.previousState === 2); // extended
});

test(category + 'push * 3 & go(-2) & go(1)', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.go(-2);
  history.go(1);
  assert(history.length === 3);
  assert(history.state === 2);
  assert(history.current === '/2'); // extended
  assert(history.currentState === 2); // extended
  assert(history.next === '/3'); // extended
  assert(history.nextState === 3); // extended
  assert(history.previous === '/1'); // extended
  assert(history.previousState === 1); // extended
});

test(category + 'push * 3 & go(-2) & go(2)', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.go(-2);
  history.go(2);
  assert(history.length === 3);
  assert(history.state === 3);
  assert(history.current === '/3'); // extended
  assert(history.currentState === 3); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === '/2'); // extended
  assert(history.previousState === 2); // extended
});

test(category + 'push * 3 & go(-2) & go(3) // ignore', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.go(-2);
  history.go(3); // ignore
  assert(history.length === 3);
  assert(history.state === 1);
  assert(history.current === '/1'); // extended
  assert(history.currentState === 1); // extended
  assert(history.next === '/2'); // extended
  assert(history.nextState === 2); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});

test(category + 'push * 3 & go(-2) & push', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.go(-2);
  history.pushState(4, '4', '/4');
  assert(history.length === 2);
  assert(history.state === 4);
  assert(history.current === '/4'); // extended
  assert(history.currentState === 4); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === '/1'); // extended
  assert(history.previousState === 1); // extended
});

test(category + 'push * 3 & go(-2) & replace', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.go(-2);
  history.replaceState(4, '4', '/4');
  assert(history.length === 1);
  assert(history.state === 4);
  assert(history.current === '/4'); // extended
  assert(history.currentState === 4); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});

test(category + 'push * 3 & go(-2) & replace * 2', () => {
  const history = new FakeHistory();
  history.pushState(1, '1', '/1');
  history.pushState(2, '2', '/2');
  history.pushState(3, '3', '/3');
  history.go(-2);
  history.replaceState(4, '4', '/4');
  history.replaceState(5, '5', '/5');
  assert(history.length === 1);
  assert(history.state === 5);
  assert(history.current === '/5'); // extended
  assert(history.currentState === 5); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});

test(category + 'replace', () => {
  const history = new FakeHistory();
  history.replaceState(1, '1', '/1');
  assert(history.length === 1);
  assert(history.state === 1);
  assert(history.current === '/1'); // extended
  assert(history.currentState === 1); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});

test(category + 'replace * 3', () => {
  const history = new FakeHistory();
  history.replaceState(1, '1', '/1');
  history.replaceState(2, '2', '/2');
  history.replaceState(3, '3', '/3');
  assert(history.length === 1);
  assert(history.state === 3);
  assert(history.current === '/3'); // extended
  assert(history.currentState === 3); // extended
  assert(history.next === null); // extended
  assert(history.nextState === null); // extended
  assert(history.previous === null); // extended
  assert(history.previousState === null); // extended
});
