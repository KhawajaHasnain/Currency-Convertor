let from_curr = document.querySelector(".from select");
let to_curr = document.querySelector(".to select");
const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/`;

let dropdowns = document.querySelectorAll(".select-box");
let btn = document.querySelector(".btn button");
let msg = document.querySelector(".msg");

const updateFLag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]
    let flagLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let imageElement = element.parentElement.querySelector("img");

    imageElement.src = flagLink;
}

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFLag(evt.target)
    })
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".input-field input");
    let amtVal = amount.value;
    
    if (amount = "" || amount < 1) {
        amount = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}${from_curr.value.toLowerCase()}.json`
    console.log(URL)
    let response = await fetch(URL);
    let conversionData = await response.json();
    let rate = conversionData[from_curr.value.toLowerCase()][to_curr.value.toLowerCase()]

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${from_curr.value} = ${finalAmount} ${to_curr.value}`
});