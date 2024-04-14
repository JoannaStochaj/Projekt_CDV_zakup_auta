function displayOrderDetails() {
  const savedData = localStorage.getItem("formData");
  if (savedData) {
    const formDataObject = JSON.parse(savedData);

    // Wyświetlenie nazwy modelu auta
    const selectedCarName = localStorage.getItem("selectedCarName");
    const selectedCarModelElement = document.getElementById("selectedCarModel");
    if (selectedCarName) {
      selectedCarModelElement.innerHTML = `<div><strong>Model:</strong> ${selectedCarName}</div>`;
    }

    // Wyświetlenie obrazka wybranego auta
    const selectedCarImagePath = localStorage.getItem("selectedCarImagePath");
    if (selectedCarImagePath) {
      const image = document.createElement("img");
      image.src = selectedCarImagePath;
      image.alt = selectedCarName;
      image.style.maxWidth = "300px";
      image.style.maxHeight = "300px";
      image.style.margin = "10px 0";
      selectedCarModelElement.appendChild(image);
    }

    // Wyświetlanie ceny wybranego auta z akcesoriami
    const totalPrice = formDataObject["total-price"];
    document.getElementById(
      "total-price"
    ).textContent = `Cena razem z akcesoriami: ${totalPrice} zł`;

    // Wyświetlanie metody płatności
    const paymentMethod = formDataObject["financing"];
    document.getElementById(
      "payment-method"
    ).textContent = `Metoda płatności: ${paymentMethod}`;
  }
}

window.onload = function () {
  displayOrderDetails();
};
