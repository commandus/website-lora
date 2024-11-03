const SUBSCRIPTION = 'subscription';

export class Keys {
  p256dh = '';
  auth = '';
}

export class WebPushSubscription {
  id = 0;
  iid = 0;
  role = 0;
  endpoint = '';
  expirationTime = 0;
  keys = new Keys();

  constructor(
  ) {
    this.load();
  }

  public assign(value: any) {
    if (typeof value !== 'undefined') {
      Object.assign(this, value);
    }
    this.save();
  }

  public reset() {
    this.id = 0;
    this.iid = 0;
    this.role = 0;
    this.endpoint = '';
    this.expirationTime = 0;
    if (typeof this.keys !== 'undefined') {
      if (typeof this.keys.p256dh !== 'undefined') {
        this.keys.p256dh = '';
      }
      if (typeof this.keys.auth !== 'undefined') {
        this.keys.auth = '';
      }
    }
  }

  public rm() {
    localStorage.removeItem(SUBSCRIPTION);
  }

  private load(): boolean {
    this.reset();
    const j = localStorage.getItem(SUBSCRIPTION);
    if (j)
      Object.assign(this, JSON.parse(j));
    return this.id > 0;
  }

  public save() {
    localStorage.setItem(SUBSCRIPTION, JSON.stringify(this));
  }

}
