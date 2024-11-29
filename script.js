// Inventory Data (Loaded from localStorage if available)
let inventory = JSON.parse(localStorage.getItem("inventory")) || [
  { name: "iPhone 16 Pro", quantity: 5 },
  { name: "MacBook Pro M2", quantity: 10 },
  { name: "AirPods", quantity: 50 },
];

// Update Inventory in localStorage
function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Dynamically Render Inventory List
function renderInventory() {
  const list = document.getElementById("inventory-list");
  list.innerHTML = "";
  inventory.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = `stock-card ${getStockLevel(item.quantity)}`;
    card.innerHTML = `
      <p><strong>${item.name}:</strong> ${item.quantity} units</p>
      <div>
        <button class="card-action" onclick="updateStock(${index}, -1)">-</button>
        <button class="card-action" onclick="updateStock(${index}, 1)">+</button>
        <button class="card-action" onclick="deleteItem(${index})">🗑️</button>
      </div>
    `;
    list.appendChild(card);
  });
  saveInventory();
}

// Get Stock Level for Coloring
function getStockLevel(quantity) {
  if (quantity < 5) return "low-stock";
  if (quantity <= 15) return "medium-stock";
  return "good-stock";
}

// Add New Item
function addItem() {
  const name = document.getElementById("new-item-name").value.trim();
  const quantity = parseInt(document.getElementById("new-item-quantity").value, 10);

  if (name && !isNaN(quantity)) {
    inventory.push({ name, quantity });
    renderInventory();
  } else {
    alert("Please provide valid item name and quantity.");
  }
}

// Update Stock Quantity
function updateStock(index, change) {
  inventory[index].quantity = Math.max(0, inventory[index].quantity + change);
  renderInventory();
}

// Delete Item
function deleteItem(index) {
  inventory.splice(index, 1);
  renderInventory();
}

// Search Inventory
function searchInventory() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const resultsDiv = document.getElementById("search-results");
  resultsDiv.innerHTML = "";

  if (query) {
    const matches = inventory.filter(item =>
      item.name.toLowerCase().includes(query)
    );
    matches.forEach(match => {
      const result = document.createElement("div");
      result.textContent = `${match.name} - ${match.quantity} units`;
      resultsDiv.appendChild(result);
    });
  }
}

// Sort Inventory
function sortInventory() {
  const sortOption = document.getElementById("sort-options").value;
  if (sortOption === "name") {
    inventory.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "low-to-high") {
    inventory.sort((a, b) => a.quantity - b.quantity);
  } else if (sortOption === "high-to-low") {
    inventory.sort((a, b) => b.quantity - a.quantity);
  }
  renderInventory();
}

// Initialize
renderInventory();
