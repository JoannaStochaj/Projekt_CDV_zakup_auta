let carPrice = 0;
let totalPrice = 0;

// Dodajemy definicję zmiennych nameError i collectionError
let nameError = document.getElementById("name-error");
let collectionError = document.getElementById("collection-error");

function showConfigForm(carModel, carName, price) {
  carPrice = parseFloat(price);
  totalPrice = carPrice;

  document.getElementById("carList").style.display = "none";
  document.getElementById("configForm").style.display = "block";
  document.getElementById("selectedCarModel").textContent = `Model: ${carName}`;
  document.getElementById("selectedCarPrice").textContent = `Cena: ${price}`;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
  console.log("Wybrane auto:", carModel);
}

function saveFormData() {
  const color = document.getElementById("color").value;
  const financing = document.querySelector('input[name="financing"]:checked')
    ? document.querySelector('input[name="financing"]:checked').value
    : "";
  const nameAndSurname = document.getElementById("name-and-surname").value;
  const collection = document.getElementById("collection").value;
  const delivery = document.getElementById("delivery").value;

  localStorage.setItem("color", color);
  localStorage.setItem("financing", financing);
  localStorage.setItem("nameAndSurname", nameAndSurname);
  localStorage.setItem("collection", collection);
  localStorage.setItem("delivery", delivery);
}

function loadFormData() {
  const color = localStorage.getItem("color");
  const financing = localStorage.getItem("financing");
  const nameAndSurname = localStorage.getItem("nameAndSurname");
  const collection = localStorage.getItem("collection");
  const delivery = localStorage.getItem("delivery");

  document.getElementById("color").value = color || "";
  if (financing) {
    document.getElementById(financing).checked = true;
  }
  document.getElementById("name-and-surname").value = nameAndSurname || "";
  document.getElementById("collection").value = collection || "";
  document.getElementById("delivery").value = delivery || "";
}

document.addEventListener("DOMContentLoaded", function () {
  loadFormData();
});

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
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
  }
}

function removeAccessory() {
  var accessoryList = document.getElementById("accessory-list");
  if (accessoryList.children.length > 0) {
    var lastAccessoryPrice = parseFloat(
      accessoryList.lastChild.textContent.split(" - ")[1]
    );
    totalPrice -= lastAccessoryPrice;
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    accessoryList.removeChild(accessoryList.lastChild);
  }
}

function showLastForm() {
  // Sprawdź, czy pola wymagane są wypełnione
  const nameInput = document.getElementById("name-and-surname");
  const collectionInput = document.getElementById("collection");
  const nameError = document.getElementById("name-error");
  const collectionError = document.getElementById("collection-error");

  if (nameInput.value.trim() !== "" && collectionInput.value.trim() !== "") {
    // Jeśli pola wymagane są wypełnione, zapisz dane do localStorage
    saveFormData();

    // Przygotuj dane do przekazania jako parametry adresu URL
    const carModel = document.getElementById("selectedCarModel").textContent;
    const carPrice = document.getElementById("selectedCarPrice").textContent;
    const paymentMethod = document.querySelector(
      'input[name="financing"]:checked'
    ).value;
    const carImage = document.querySelector(".carItem img").src;
    const selectedAccessories = [];
    document.querySelectorAll("#accessory-list li").forEach((item) => {
      selectedAccessories.push(item.textContent);
    });

    // Przygotuj adres URL z parametrami
    let url = `lastPage.html?carModel=${carModel}&carPrice=${carPrice}&paymentMethod=${paymentMethod}&carImage=${carImage}`;
    selectedAccessories.forEach((accessory, index) => {
      url += `&accessory${index + 1}=${accessory}`;
    });

    // Przenieś użytkownika do strony lastPage.html
    window.location.href = url;
  } else {
    nameError.textContent = "Pole wymagane"; // Wyświetl komunikat obok pola
    collectionError.textContent = "Pole wymagane"; // Wyświetl komunikat obok pola
  }
}
