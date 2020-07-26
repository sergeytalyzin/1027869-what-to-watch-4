export default class StoreLocal {
  constructor(props) {
    this.storeName = props;
  }
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.storeName));
    } catch (err) {
      return {};
    }
  }

  setItem(data) {
    localStorage.setItem(this.storeName, JSON.stringify(data));
  }
  clear() {
    localStorage.removeItem(this.storeName);
  }
}

