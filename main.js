function loadItems() {
  // json의 데이터에 item을 불러옴  다시 공부!
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  //item을 출력
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  //json의 아이템을 출력하는 틀을 만듬
  return `
  <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
    `;
}

function onButtonClick(event, items) {
  //  종류와 색상을 찾아 버튼을 눌럿을시 원하는 item들만 출력
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  if (key == null || value == null) {
    return;
  }
  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

function setEventListeners(items) {
  // 각각 이벤트를 추가
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", () => onButtonClick(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
