const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView, searchResultView }) {
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;

    this.subscribViewEvents();
  }

  subscribViewEvents() {
    this.searchFormView.on("@submit", (event) =>
      this.search(event.detail.value)
    ).on("@reset", () => this.reset());
  }

  search(searchKeyword) {
    this.store.search(searchKeyword)
    this.render()
  }

  reset() {
    console.log(tag, "reset");
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render()
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      this.searchResultView.show(this.store.searchResult);
      return
    }

    this.searchResultView.hide();
  }
}
