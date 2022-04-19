import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";
import SearchResultView from "./views/SearchResultView.js";

document.addEventListener("DOMContentLoaded", main);

//모델 생성
function main() {
  const store = new Store(storage);

  //뷰 생성
  const views = {
    searchFormView: new SearchFormView(),
    searchResultView: new SearchResultView(),
  };


  //MVC 패턴 초기화
  new Controller(store, views);
}
