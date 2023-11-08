const body = document.querySelector("body");
const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");

let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  { id: 1, name: "Produto 1", image: "1.jpg", price: 120.0 },
  { id: 2, name: "Produto 2", image: "2.jpg", price: 130.0 },
  { id: 3, name: "Produto 3", image: "3.jpg", price: 220.0 },
  { id: 4, name: "Produto 4", image: "4.jpg", price: 120.0 },
  { id: 5, name: "Produto 5", image: "5.jpg", price: 125.0 },
  { id: 6, name: "Produto 6", image: "6.jpg", price: 160.0 },
];

let listCards = [];

function initApp() {
  list.innerHTML = "";
  products.forEach((product, index) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
      <img src="images/${product.image}" />
      <div class="title">${product.name}</div>
      <div class="price">${product.price.toFixed(2)}</div>
      <button onclick="addToCard(${index})">Adiconar ao carrinho</button>
    `;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCard(index) {
  if (listCards[index] == null) {
    listCards[index] = products[index];
    listCards[index].quantity = 1;
  }
  realodcard();
}

function realodcard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((item, index) => {
    totalPrice += item.price;
    count += item.quantity;

    if (item != null) {
      let li = document.createElement("li");
      li.innerHTML = `
        <div><img src="images/${item.image}" /></div>
        <div>${item.name}</div>
        <div>${item.price.toFixed(2)}</div>
        <div>
         <button onclick="changeQuantity(${index}, ${
        item.quantity - 1
      })">-</button>
         <span class="count">${item.quantity}</span>
         <button onclick="changeQuantity(${index}, ${
        item.quantity + 1
      })">+</button>
        </div>
      `;

      listCard.appendChild(li);
    }
  });

  total.innerHTML = totalPrice.toFixed(2);
  quantity.innerHTML = count;
}

function changeQuantity(index, quantity) {
  if (quantity == 0) {
    delete listCards[index];
  } else {
    listCards[index].quantity = quantity;
    listCards[index].price = quantity * products[index].price;
  }

  realodcard();
}
