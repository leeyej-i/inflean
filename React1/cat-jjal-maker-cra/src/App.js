import logo from './logo.svg';
import React from 'react';
import './App.css';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};


const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(
    `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
  );
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

console.log("야옹");

// {} 괄호 없이 ()로 화살표 함수 표현 시 return 생략 가능
// props는 받아오는 것이고 props.children은 리액트 태그 사이의 값
const Tilte = props => (
  <h1>{props.children}</h1>
);

const Form = ({ updataMainCat }) => {
  // 한글인지 검사
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleInputChange(e) {
    const userValue = e.target.value;
    setErrorMessage("");
    if (includesHangul(userValue)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    }

    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(e) {
    // 폼이 전송될 때 새로 고침되는 기본설정을 막기 위한 것
    e.preventDefault();
    setErrorMessage("");
    if (value === "") {
      setErrorMessage("빈 값으로 만들 수 없습니다.");
      return;
    }
    updataMainCat(value);

  }
  return (
    < form onSubmit={handleFormSubmit} >
      <input
        type="text" name="name"
        placeholder="영어 대사를 입력해주세요"
        value={value}
        onChange={handleInputChange} />
      <button type="submit">생성</button>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form >
  );
}

function CatItem(props) {
  return (
    <li>
      <img src={props.img} width="150" />
    </li>
  );
}

function Favorites({ favorites }) {
  const cats = favorites
  if (cats.length === 0) {
    return <div>사진위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
  }

  return (
    <ul className="favorites">
      {cats.map(cat => <CatItem img={cat} key={cat} />)}
    </ul>
  );
}


// props.img은 {img}로 표현할 수 있음
const MainCard = ({ img, onHeartClick, alreadyFavorite }) => {
  const heartIcon = alreadyFavorite ? "💖" : "🤍";
  return (
    <div className="main-card">
      <img src={img} alt="고양이" width="400" />
      <button onClick={onHeartClick}>{heartIcon}</button>
    </div>
  );
}

/* useState를 통해 상태를 바꿔줄 수 있음
  countertState는 2개로 나뉨/ useState("초기값")
  1. counter -> couterState[0] / 카운터 그 자체
  2. counterState -> counterState[1] / 카운터를 조절하는 것
*/
// Tilte 리액트 컴포넌트는 props.children을 통해 사이의 값을 받을 수 있음
// MainCard 리액트 컴포넌트는 props.img를 통해 사이의 값을 받을 수 있음
const App = () => {
  const CAT1 = "img/cat1.jpg";
  const CAT2 = "img/cat2.jpg";
  const CAT3 = "img/cat3.jpg";
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || []
  });

  async function setInitialCat() {
    const newCat = await fetchCat('First cat');
    setMainCat(newCat);
  }

  // 업데이트 될 때마다 실행되는 것이지만, 뒤에 {} 중괄호를 통해 무엇이 바뀔 때마다 실행되는지 결정가능
  // 빈배열의 경우는 맨 처음에만 실행됨
  /* React.useEffect(() => {
    setInitialCat();
  }, {}) */

  async function updataMainCat(value) {
    // const newCat = await fetchCat(value);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter
    });
    //setMainCat(newCat);
    setMainCat(CAT1)

  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites);
  }

  const alreadyFavorite = favorites.includes(mainCat)

  const counterTitle = counter === null ? "" : counter + "번째 ";

  return (
    <div>
      <Tilte>{counterTitle}고양이 가라사대</Tilte>
      <Form updataMainCat={updataMainCat} />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
