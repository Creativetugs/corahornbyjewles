const PRODUCTS = [
  { id: "jade-three-stone", name: "Guatemalan Jade Three-Stone Earrings", price: "$40", cat: "Earrings" },
  { id: "jade-pewter", name: "Guatemalan Jade Earrings in Hammered Pewter", price: "$28", cat: "Earrings" },
  { id: "tigers-eye", name: "Spiral Tiger's Eye Earrings", price: "$28", cat: "Earrings" },
  { id: "bird-nest", name: "Bird and Nest Earrings", price: "$30", cat: "Earrings" },
  { id: "brass-gear", name: "Handmade Brass Gear Earrings", price: "$24", cat: "Earrings" },
  { id: "egyptian", name: "Brass Egyptian Dangle Earrings", price: "$18", cat: "Earrings" },
  { id: "fossil", name: "Guatemalan Fossil Earrings", price: "$28", cat: "Earrings" },
  { id: "architectural-earrings", name: "Hammered Brass Architectural Earrings", price: "$24", cat: "Earrings" },
  { id: "birdcage", name: "Sterling Silver Birdcage Earrings", price: "$24", cat: "Earrings" },
  { id: "jade-shell", name: "Guatemalan Jade and Shell Earring", price: "$24", cat: "Earrings" },
  { id: "lava-jasper-earrings", name: "Lava Bead and African Jasper Earrings", price: "$26", cat: "Earrings" },
  { id: "pyrite", name: "Pyrite and Crystal Earrings", price: "$30", cat: "Earrings" },
  { id: "jade-drop", name: "Architectural Jade Drop Necklace", price: "$40", cat: "Necklaces" },
  { id: "citrine", name: "Raw Citrine Necklace and Earrings", price: "$75", cat: "Sets" },
  { id: "cleo", name: "The Cleo Brass Necklace", price: "$15", cat: "Necklaces" },
  { id: "dainty-crystal", name: "Dainty Crystal Necklace", price: "$28", cat: "Necklaces" },
  { id: "handshake", name: "Handshake Leather Necklace", price: "$40", cat: "Necklaces" },
  { id: "friendship", name: "Leather Friendship Necklace", price: "$28", cat: "Necklaces" },
  { id: "paracord", name: "Men's Paracord Bracelets", price: "$19", cat: "Bracelets" },
  { id: "lava-bracelet", name: "Lava Bead Bracelet", price: "$24", cat: "Bracelets" },
  { id: "zebra", name: "African Zebra Jasper Bracelet", price: "$22", cat: "Bracelets" },
  { id: "bangles", name: "Mixed Metal Hammered Bangles", price: "$15", cat: "Bracelets" },
  { id: "aquamarine", name: "Aquamarine Necklace and Earrings Set", price: "$40", cat: "Sets" },
  { id: "crystal-set", name: "Crystal Drop Necklace Set", price: "$28", cat: "Sets" },
  { id: "lapis", name: "Lapis Lazuli Necklace Set", price: "$60", cat: "Sets" },
  { id: "pearl-ring", name: "Crafted Coin Pearl Ring", price: "$30", cat: "Rings" },
  { id: "purse-charm", name: "Red, White & Chic Purse Charm", price: "$28", cat: "Purse Charms" }
];

const toggle = document.querySelector(".nav-toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
}

const searchBtn = document.querySelector(".search-btn");
const searchPanel = document.querySelector(".search-panel");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");

function renderSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    searchResults.innerHTML = "";
    return;
  }
  const matches = PRODUCTS.filter((item) =>
    (item.name + " " + item.cat).toLowerCase().includes(q)
  ).slice(0, 8);
  if (!matches.length) {
    searchResults.innerHTML = '<p class="search-empty">No pieces match that search. Try jade, pearl, brass, or bracelet.</p>';
    return;
  }
  searchResults.innerHTML = matches.map((item) =>
    `<a href="shop.html#${item.id}"><strong>${item.name}</strong><span>${item.price} · ${item.cat}</span></a>`
  ).join("");
}

if (searchBtn && searchPanel) {
  searchBtn.addEventListener("click", () => {
    const hidden = searchPanel.hasAttribute("hidden");
    if (hidden) searchPanel.removeAttribute("hidden");
    else searchPanel.setAttribute("hidden", "");
    searchBtn.setAttribute("aria-expanded", hidden ? "true" : "false");
    if (hidden) searchInput.focus();
  });
  searchInput.addEventListener("input", () => renderSearch(searchInput.value));
}

const filterButtons = document.querySelectorAll("[data-filter]");
function applyFilter(cat) {
  document.querySelectorAll(".product-card").forEach((card) => {
    const show = cat === "all" || card.dataset.cat === cat;
    card.hidden = !show;
  });
  document.querySelectorAll(".shop-group").forEach((group) => {
    const any = group.querySelectorAll(".product-card:not([hidden])").length > 0;
    group.hidden = !any;
  });
  filterButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.filter === cat ? "true" : "false");
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyFilter(btn.dataset.filter);
    const next = btn.dataset.filter === "all" ? "shop.html" : "shop.html#" + btn.dataset.filter;
    history.replaceState(null, "", next);
  });
});

const hash = location.hash.replace("#", "");
const categoryHashes = ["earrings", "necklaces", "bracelets", "rings", "sets", "charms"];
if (filterButtons.length && categoryHashes.includes(hash)) {
  applyFilter(hash);
}

document.querySelectorAll("form[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.hidden = true;
    const success = form.parentElement.querySelector(".form-success");
    if (success) success.hidden = false;
  });
});
