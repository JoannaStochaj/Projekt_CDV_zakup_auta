let carPrice = 0;
let totalPrice = 0;
let formDataObject = {};

document.getElementById("configForm").style.display = "none";

function showConfigForm(carModel, carName, price, imagePath) {
  carPrice = parseFloat(price);
  totalPrice = carPrice;

  document.getElementById("carList").style.display = "none";
  document.getElementById("configForm").style.display = "block";

  localStorage.setItem("selectedCarName", carName);
  localStorage.setItem("selectedCarImagePath", imagePath);

  const selectedCarModel = document.getElementById("selectedCarModel");
  selectedCarModel.innerHTML = `<div><strong>Model:</strong> ${carName}<br><img src="${imagePath}" alt="${carName}" style="max-width: 300px; max-height: 300px; margin: 50px;"></div>`;

  document.getElementById("selectedCarPrice").textContent = `Cena: ${price}`;
  document.getElementById("total-price").textContent = totalPrice;

  formDataObject["selectedCarModel"] = carName;
  formDataObject["selectedCarModel"] = carModel;
  formDataObject["selectedCarPrice"] = price;

  console.log("Wybrane auto:", carModel);
}

const deliverySelect = document.getElementById("delivery");
const today = new Date();
const deliveryDate = new Date();
deliveryDate.setDate(today.getDate() + 14);
const option = document.createElement("option");
option.value = deliveryDate.toISOString().slice(0, 10);
option.textContent = `${deliveryDate.getDate()}/${
  deliveryDate.getMonth() + 1
}/${deliveryDate.getFullYear()}`;

deliverySelect.appendChild(option);

function goBack() {
  document.getElementById("configForm").style.display = "none";
  document.getElementById("carList").style.display = "block";
}

function addAccessory() {
  let select = document.getElementById("accessories");
  let selectedIndex = select.selectedIndex;
  if (selectedIndex !== -1) {
    let selectedOption = select.options[selectedIndex];
    let accessoryName = selectedOption.getAttribute("data-name");
    let accessoryPrice = parseFloat(selectedOption.getAttribute("data-price"));

    let accessoryList = document.getElementById("accessory-list");
    let li = document.createElement("li");
    li.textContent = accessoryName + " - " + accessoryPrice + " zł";
    accessoryList.appendChild(li);

    totalPrice += accessoryPrice;
    document.getElementById("total-price").textContent = totalPrice;
  }
}

function removeAccessory() {
  let accessoryList = document.getElementById("accessory-list");
  if (accessoryList.children.length > 0) {
    let lastAccessoryPrice = parseFloat(
      accessoryList.lastChild.textContent.split(" - ")[1]
    );
    totalPrice -= lastAccessoryPrice;
    document.getElementById("total-price").textContent = totalPrice;
    accessoryList.removeChild(accessoryList.lastChild);
  }
}

function validateAndPlaceOrder() {
  const form = document.querySelector("form");
  let errorMessage = document.getElementById("error-message");

  if (!errorMessage) {
    errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Proszę wypełnić wszystkie wymagane pola formularza.";
    errorMessage.style.color = "red";
    errorMessage.style.textAlign = "center";
    errorMessage.style.padding = "0";
    errorMessage.id = "error-message";

    form.parentNode.appendChild(errorMessage);
  }

  if (form.checkValidity()) {
    placeOrder();
  }
}

function placeOrder() {
  const form = document.querySelector("form");
  if (form.checkValidity()) {
    saveFormDataToLocalStorage(form);
    window.location.href = "lastPage.html";
  }
}

function saveFormDataToLocalStorage(form) {
  const formData = new FormData(form);
  const formDataObject = {};
  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }
  formDataObject["deliveryDate"] = formDataObject["delivery"];
  formDataObject["total-price"] = totalPrice;
  console.log("Form Data Object:", formDataObject);
  localStorage.setItem("formData", JSON.stringify(formDataObject));
}

document.addEventListener("DOMContentLoaded", function () {
  displayOrderDetails();
});

function displayOrderDetails() {
  const savedData = localStorage.getItem("formData");
  if (savedData) {
    const formDataObject = JSON.parse(savedData);

    const paymentMethod = formDataObject["financing"];
    if (paymentMethod) {
      const paymentMethodElement = document.getElementById("payment-method");
      if (paymentMethodElement) {
        paymentMethodElement.textContent = `Metoda płatności: ${paymentMethod}`;
      }
    }

    const selectedCarName = localStorage.getItem("selectedCarName");
    const selectedCarImagePath = localStorage.getItem("selectedCarImagePath");

    if (selectedCarName && selectedCarImagePath) {
      const selectedCarModelElement =
        document.getElementById("selectedCarModel");
      if (selectedCarModelElement) {
        selectedCarModelElement.innerHTML = `<div><strong>Model:</strong> ${selectedCarName}<br><img src="${selectedCarImagePath}" alt="${selectedCarName}" style="max-width: 300px; max-height: 300px; margin: 50px;"></div>`;
      }
    }

    const totalPriceFromStorage = formDataObject["total-price"];
    if (totalPriceFromStorage) {
      const totalPriceElement = document.getElementById("total-price");
      if (totalPriceElement) {
        totalPriceElement.textContent = totalPriceFromStorage;
      }
    }
  }
}
