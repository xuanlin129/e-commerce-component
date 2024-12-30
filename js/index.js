const productRadios = document.querySelectorAll(".productRadio");
const numControls = document.querySelectorAll(".numControl");
const minus = document.querySelectorAll(".minus");
const plus = document.querySelectorAll(".plus");
const btnControls = [...minus, ...plus];
const priceText = document.querySelector(".price");

// 價格更新
let currentPrice = parseInt(priceText.innerText.replace(/,/g, ""));
const updataPrice = (quantity) => {
  const formattedPrice = (currentPrice * quantity).toLocaleString();
  priceText.innerText = formattedPrice;
};

productRadios.forEach((radio) => {
  radio.addEventListener("input", function () {
    currentPrice = this.dataset.price.toLocaleString();
    updataPrice(1);
    let numControl =
      this.closest(".productArea").nextElementSibling.querySelector(
        ".numControl"
      );
    let minus =
      this.closest(".productArea").nextElementSibling.querySelector(".minus");
    numControl.value = 1;
    minus.classList.add("disabled");
  });
});
productRadios[0].click();

// 數量輸入框
numControls.forEach((num) => {
  num.addEventListener("change", function () {
    let quantity = parseInt(this.value);
    let minus = this.previousElementSibling;
    if (this.value > 1) {
      minus.classList.remove("disabled");
    } else {
      quantity = 1;
      this.value = 1;
      minus.classList.add("disabled");
    }
    updataPrice(quantity);
  });

  // 限制輸入數字
  num.addEventListener("input", function () {
    let inputValue = this.value.replace(/\D/g, ""); // 只保留數字
    if (inputValue.startsWith("0") && inputValue.length > 0) {
      inputValue = inputValue.slice(1);
    }
    this.value = inputValue;
  });
});

// 加減按鈕
btnControls.forEach((btn) => {
  btn.addEventListener("click", function () {
    let numControl = this.closest(".quantity").querySelector(".numControl");
    let minus = this.closest(".quantity").querySelector(".minus");
    let quantity = parseInt(numControl.value);

    if (this.classList.contains("plus")) {
      quantity++;
      minus.classList.remove("disabled");
    } else {
      quantity--;
      if (quantity <= 1) {
        minus.classList.add("disabled");
      }
    }
    numControl.value = quantity;
    updataPrice(quantity);
  });
});
