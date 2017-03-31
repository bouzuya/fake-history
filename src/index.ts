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

interface Item {
  data: any;
  title: string;
  url: string | null;
}

export class FakeHistory implements ExtendedHistory {
  public scrollRestoration: 'auto' | 'manual';

  private items: Item[];
  private index: number;

  constructor() {
    this.items = [];
    this.index = -1;
  }

  // extended history

  get current(): string | null {
    const item = this.currentItem();
    return item === null ? null : item.url;
  }

  get currentState(): any | null {
    const item = this.currentItem();
    return item === null ? null : item.data;
  }

  get next(): string | null {
    const item = this.nextItem();
    return item === null ? null : item.url;
  }

  get nextState(): any | null {
    const item = this.nextItem();
    return item === null ? null : item.data;
  }

  get previous(): string | null {
    const item = this.previousItem();
    return item === null ? null : item.url;
  }

  get previousState(): any | null {
    const item = this.previousItem();
    return item === null ? null : item.data;
  }

  // history

  get length(): number {
    return this.items.length;
  }

  get state(): any {
    const item = this.currentItem();
    return item === null ? null : item.data;
  }

  public back(): void {
    if (this.items.length > 0 && this.index > 0) {
      this.index = this.index - 1;
    }
  }

  public forward(): void {
    if (this.items.length > 0 && this.index < this.items.length - 1) {
      this.index = this.index + 1;
    }
  }

  public go(delta?: number): void {
    if (typeof delta === 'undefined') { return; }
    if (this.items.length > 0) {
      const index = this.index + delta;
      if (index < 0 || this.items.length <= index) {
        return;
      }
      this.index = index;
    }
  }

  public pushState(data: any, title: string, url?: string | null): void {
    // window.location.href & relative url are not supported.
    const u = typeof url === 'undefined' || url === null ? null : url;
    this.index = this.index + 1;
    this.items =
      this.items.slice(0, this.index).concat([{ data, title, url: u }]);
  }

  public replaceState(data: any, title: string, url?: string | null): void {
    if (this.items.length === 0) return this.pushState(data, title, url);
    // window.location.href & relative url are not supported.
    const u = typeof url === 'undefined' || url === null ? null : url;
    this.items =
      this.items.slice(0, this.index).concat([{ data, title, url: u }]);
  }

  // private

  private currentItem(): Item | null {
    if (this.items.length === 0) return null;
    return this.items[this.index];
  }

  private nextItem(): Item | null {
    if (this.items.length === 0) return null;
    if (this.index + 1 >= this.items.length) return null;
    return this.items[this.index + 1];
  }

  private previousItem(): Item | null {
    if (this.items.length === 0) return null;
    if (this.index - 1 < 0) return null;
    return this.items[this.index - 1];
  }
}
