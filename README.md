# fake-history

fake-history is a fake [`History`](https://developer.mozilla.org/en/docs/Web/API/History) object.

## Installation

```
$ npm install fake-history
```

## Usage

```ts
import assert from 'assert';
import { FakeHistory } from 'fake-history';

const history = new FakeHistory();
history.pushState(1, '1', '/1');
history.pushState(2, '2', '/2');
history.pushState(3, '3', '/3');
history.back();

assert(history.length === 3);
assert(history.state === 2);

// extended
assert(history.current === '/2');
assert(history.currentState === 2);
assert(history.next === '/3');
assert(history.nextState === 3);
assert(history.previous === '/1');
assert(history.previousState === 1);
```

## API

See: [History - Web APIs | MDN](https://developer.mozilla.org/en/docs/Web/API/History)

```ts
export interface History {
  readonly length: number;
  readonly state: any;
  scrollRestoration: 'auto' | 'manual';
  back(): void;
  forward(): void;
  go(delta?: number): void;
  pushState(data: any, title: string, url?: string | null): void;
  replaceState(data: any, title: string, url?: string | null): void;
}

export interface ExtendedHistory {
  readonly current: string | null;
  readonly currentState: any | null;
  readonly next: string | null;
  readonly nextState: any | null;
  readonly previous: string | null;
  readonly previousState: any | null;
}

export class FakeHistory implements ExtendedHistory { /* ... */ }
```

## Related Project

- [bouzuya/fake-history-fns][] ... fake-history functions

[bouzuya/fake-history-fns]: https://github.com/bouzuya/fake-history-fns

## Badges

[![npm version][npm-badge-url]][npm-url]
[![Travis CI][travisci-badge-url]][travisci-url]

[npm-badge-url]: https://img.shields.io/npm/v/fake-history.svg
[npm-url]: https://www.npmjs.com/package/fake-history
[travisci-badge-url]: https://travis-ci.org/bouzuya/fake-history.svg
[travisci-url]: https://travis-ci.org/bouzuya/fake-history

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
