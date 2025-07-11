let selectedMain = null;
let selectedAccomp1 = null;
let selectedAccomp2 = null;
let selectedDessert = null;
let currentMealType = "";
let currentMenu = [];

const breakfast = [
  { name: "Tostadas con mermelada y coffee", price: 3 },
  { name: "Cereales con leche y croissant", price: 2.5 },
  { name: "Fruta fresca y colacao", price: 2.8 },
];

const lunchDinnerBase = [
  { name: "Pollo a la parrilla", basePrice: 7 },
  { name: "Salmón a la parrilla", basePrice: 8 },
  { name: "Risotto de vegetales", basePrice: 5 },
];

const accompaniments = [
  { name: "Endivias a la plancha", price: 3 },
  { name: "Cebollitas glaseadas", price: 2.5 },
  { name: "Brochetas de verduras", price: 2.5 },
];

const desserts = [
  { name: "Tarta de queso", price: 3 },
  { name: "Yogurt", price: 2.5 },
  { name: "Arroz con leche", price: 2 },
];

const comments = [
  "¡Excelente elección!",
  "Esa opción es muy popular entre nuestros clientes.",
  "El chef recomienda este plato.",
  "Una combinación deliciosa, ¡disfrútalo!",
  "Buena elección, queda muy bien con los acompañamientos.",
];

function showComment() {
  const comment = comments[Math.floor(Math.random() * comments.length)];
  alert(`Comentario: ${comment}`);
}

function displayMenuOptions(menuArray, message, menuType) {
  let optionMessage = `${message} (escribe el número de tu elección):\n\n`;
  menuArray.forEach((item, index) => {
    let finalPrice = item.price;
    if (currentMealType === "Cena") {
      finalPrice = Number((item.price * 1.2).toFixed(2));
    }
    optionMessage += `${index + 1}. ${item.name} (€${finalPrice})\n`;
  });
  return optionMessage;
}

function getMenuByHour(hour) {
  if (hour >= 6 && hour < 12) {
    return { menu: breakfast, type: "Desayuno" };
  } else if (hour >= 12 && hour < 16) {
    const lunchMenu = lunchDinnerBase.map((item) => ({
      name: item.name,
      price: item.basePrice,
    }));
    return { menu: lunchMenu, type: "Almuerzo" };
  } else if (hour >= 16 && hour <= 23) {
    const dinnerMenu = lunchDinnerBase.map((item) => ({
      name: item.name,
      price: (item.basePrice * 1.2).toFixed(2),
    }));
    return { menu: dinnerMenu, type: "Cena" };
  } else {
    alert("Hora fuera del horario de atención (6:00 - 23:00).");
    return null;
  }
}

function chooseOption(menu, menuType) {
  let choice;
  let validChoice = false;
  do {
    const optionsMessage = displayMenuOptions(menu, `Elige tu ${menuType}:`, menuType);
    choice = prompt(optionsMessage);
    if (choice === null) {
      return null;
    }
    const index = parseInt(choice) - 1;
    if (index >= 0 && index < menu.length) {
      validChoice = true;
      return menu[index];
    } else {
      alert("Por favor, elige un número válido.");
    }
  } while (!validChoice);
}

function selectOption(menuType) {
  let selectedDish;

  if (menuType === "main") {
    selectedDish = chooseOption(currentMenu, "plato principal");
    if (selectedDish) {
      selectedMain = selectedDish;
      alert(`Has seleccionado: ${selectedDish.name} (€${selectedDish.price})`);
      showComment();
      if (currentMealType === "Desayuno") {
        showSummary();
      } else {
        selectOption("accomp1");
      }
    }
  } else if (menuType === "accomp1") {
    selectedDish = chooseOption(accompaniments, "primer acompañamiento");
    if (selectedDish) {
      selectedAccomp1 = selectedDish;
      alert(`Primer acompañamiento: ${selectedDish.name} (€${selectedDish.price})`);
      showComment();
      selectOption("accomp2");
    }
  } else if (menuType === "accomp2") {
    selectedDish = chooseOption(accompaniments, "segundo acompañamiento");
    if (selectedDish) {
      selectedAccomp2 = selectedDish;
      alert(`Segundo acompañamiento: ${selectedDish.name} (€${selectedDish.price})`);
      showComment();
      selectOption("dessert");
    }
  } else if (menuType === "dessert") {
    selectedDish = chooseOption(desserts, "postre");
    if (selectedDish) {
      selectedDessert = selectedDish;
      alert(`Postre: ${selectedDish.name} (€${selectedDish.price})`);
      showComment();
      showSummary();
    }
  }
}

function showSummary() {
  let total = parseFloat(selectedMain.price);

  let summaryMessage = `Resumen de tu pedido (${currentMealType}):\n`;
  summaryMessage += `Plato principal: ${selectedMain.name} - €${selectedMain.price}\n`;

  if (currentMealType !== "Desayuno") {
    total += selectedAccomp1.price + selectedAccomp2.price + selectedDessert.price;
    summaryMessage += `Acompañamientos: ${selectedAccomp1.name} y ${selectedAccomp2.name} - €${(selectedAccomp1.price + selectedAccomp2.price).toFixed(2)}\n`;
    summaryMessage += `Postre: ${selectedDessert.name} - €${selectedDessert.price}\n`;
  }

  summaryMessage += `Total: €${total.toFixed(2)}`;
  alert(summaryMessage);

  let continueChoosing = prompt("¿Quieres elegir otro menú? (Sí / No)").toLowerCase();
  if (continueChoosing === "sí" || continueChoosing === "si") {
    selectedMain = null;
    selectedAccomp1 = null;
    selectedAccomp2 = null;
    selectedDessert = null;
    currentMealType = "";
    currentMenu = [];
    alert("¡Nuevo menú seleccionado!");
    showMenu();
  } else {
    alert("¡Gracias por tu pedido!");
  }
}

function showMenu() {
  selectedMain = null;
  selectedAccomp1 = null;
  selectedAccomp2 = null;
  selectedDessert = null;

  let inputHour;
  let menuData;

  do {
    inputHour = prompt("¿Qué hora es? (Introduce la hora en formato 24h, ej: 9 para 9:00 am)");
    inputHour = parseInt(inputHour);
    if (isNaN(inputHour) || inputHour < 6 || inputHour > 23) {
      alert("Por favor, introduce una hora válida entre 6 y 23.");
    } else {
      menuData = getMenuByHour(inputHour);
    }
  } while (!menuData);

  currentMealType = menuData.type;
  currentMenu = menuData.menu;

  alert(`Menú de ${currentMealType}`);
  selectOption("main");
}

// ✅ Esto es lo único que se necesita para iniciar en CodePen
window.onload = function () {
  showMenu();
};
