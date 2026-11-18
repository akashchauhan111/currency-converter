const BASE_URL =
  "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currCode;
    option.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let curr = element.value;
  let countryCode = countryList[curr];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);

  if (!response.ok) {
    msg.innerText = "API Error";
    return;
  }

  let data = await response.json();

  let rate =
    data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


