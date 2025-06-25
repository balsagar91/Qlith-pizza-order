document.addEventListener("DOMContentLoaded", () => {
  const detectBtn = document.querySelector(".detect-btn");
  const locationText = document.querySelector(".no-location");
  const locationWarning = document.querySelector(".location-warning");

  const apiKey = "ce658ddd36f440f88f7b854b8a156a8c";

  if (detectBtn) {
    detectBtn.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
              );
              const data = await response.json();
              const address = data.results[0]?.formatted || "Unknown location";

              locationText.textContent = address;
              locationWarning.style.display = "none";
              localStorage.setItem("deliveryAddress", address); // optional
            } catch (error) {
              console.error("Fetch error:", error);
              locationText.textContent = "Error fetching location.";
              locationWarning.style.display = "block";
            }
          },
          (error) => {
            console.warn("Geolocation error:", error);
            locationText.textContent = "Location blocked!";
            locationWarning.style.display = "block";
          }
        );
      } else {
        locationText.textContent = "Geolocation not supported!";
        locationWarning.style.display = "block";
      }
    });
  }
});


  
  const caretIcon = document.querySelector(".caret");
  caretIcon?.addEventListener("click", () => {
    locationWarning.style.display = locationWarning.style.display === "block" ? "none" : "block";
  });


  const tabs = document.querySelectorAll(".service-tabs .tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  
  const newItems = document.querySelector(".new-items");
  if (newItems && newItems.scrollWidth > newItems.clientWidth) {
    let scrollAmount = 0;
    setInterval(() => {
      scrollAmount += 1;
      newItems.scrollLeft = scrollAmount;
      if (scrollAmount >= newItems.scrollWidth) scrollAmount = 0;
    }, 50); 
  }
});
window.onload = () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    const profileIcon = document.getElementById('profileIcon');
    profileIcon.classList.remove('fa-user');
    profileIcon.classList.add('fa-check-circle');
    profileIcon.style.color = 'green';
  }
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  // Check if item already exists
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
    `;
    cartContainer.appendChild(div);
  });
}

// Show cart on load
document.addEventListener("DOMContentLoaded", renderCart);
document.addEventListener("DOMContentLoaded", () => {
  const takeawayTab = document.getElementById("takeawayTab");
  const storeList = document.getElementById("storeList");

  takeawayTab.addEventListener("click", () => {
    storeList.style.display = storeList.style.display === "none" ? "block" : "none";
  });
});

function goToStore(storeName) {
  // Option 1: Store in localStorage and redirect
  localStorage.setItem("selectedStore", storeName);
  window.location.href = "takeaway.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const takeawayTab = document.getElementById("takeawayTab");
  const dineinTab = document.getElementById("dineinTab");
  const takeawayList = document.getElementById("storeList");
  const dineinList = document.getElementById("dineinList");

  takeawayTab.addEventListener("click", () => {
    takeawayList.style.display = "block";
    dineinList.style.display = "none";
  });

  dineinTab.addEventListener("click", () => {
    dineinList.style.display = "block";
    takeawayList.style.display = "none";
  });
});

function goToStore(storeName, redirectPage) {
  localStorage.setItem("selectedStore", storeName);
  window.location.href = redirectPage;
}
function redirectToTakeaway() {
  window.location.href = "takeaway.html";
}

  const savedAddress = localStorage.getItem("deliveryAddress");
  if (savedAddress) {
    document.getElementById("checkoutAddress").innerText = savedAddress;
  }

 function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.querySelector(".cart-count");
  if (cartCountEl) cartCountEl.innerText = count;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.querySelector(".cart-count");
    if (cartCountEl) cartCountEl.innerText = count;
  }

  

  // Auto-scroll for "What's New" section
  const newItemsContainer = document.querySelector('.new-items');

  let scrollAmount = 0;
  const scrollStep = 1; // pixels per interval
  const scrollDelay = 10; // interval time (ms)

  function autoScroll() {
    if (!newItemsContainer) return;
    scrollAmount += scrollStep;
    newItemsContainer.scrollLeft += scrollStep;

    // Reset scroll to start when fully scrolled
    if (
      newItemsContainer.scrollLeft + newItemsContainer.clientWidth >=
      newItemsContainer.scrollWidth
    ) {
      scrollAmount = 0;
      newItemsContainer.scrollLeft = 0;
    }
  }

  setInterval(autoScroll, scrollDelay);

  const addButtons = document.querySelectorAll('.add-btn');

  addButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Add to cart logic (optional if already implemented)

      // Add 'active' class and disable the button
      this.classList.add('active');
      this.textContent = "Added ✓";

      Revert after a few seconds (if needed)
      setTimeout(() => {
        this.classList.remove('active');
        this.textContent = "Add +";
      }, 3000);
    });
  });

 let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.querySelector(".cart-count");
    if (cartCountEl) cartCountEl.textContent = count;
  }

  function addToCart(item) {
    const existing = cart.find(i => i.name === item.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const productCard = btn.closest(".product-card");
      const name = productCard.querySelector("h3").textContent.trim();
      const priceText = productCard.querySelector(".price strong").textContent.trim();
      const price = parseInt(priceText.replace("₹", ""));
      const image = productCard.querySelector("img").src;

      addToCart({ name, price, image });

      // Feedback
      btn.classList.add("active");
      btn.textContent = "Added ✓";
      setTimeout(() => {
        btn.classList.remove("active");
        btn.textContent = "Add +";
      }, 1500);
    });
  });

  // Update cart count on page load
  updateCartCount();



  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) cartCount.textContent = total;
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  function createQtyButtons(btn, itemData) {
    const wrapper = document.createElement("div");
    wrapper.className = "qty-control";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.className = "qty-btn";

    const qty = document.createElement("span");
    qty.textContent = "1";
    qty.className = "qty-value";

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.className = "qty-btn";

    wrapper.appendChild(minus);
    wrapper.appendChild(qty);
    wrapper.appendChild(plus);
    btn.replaceWith(wrapper);

    minus.addEventListener("click", () => {
      const index = cart.findIndex(i => i.name === itemData.name);
      if (index !== -1) {
        cart[index].quantity--;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
          wrapper.replaceWith(btn);
        } else {
          qty.textContent = cart[index].quantity;
        }
        saveCart();
      }
    });

    plus.addEventListener("click", () => {
      const index = cart.findIndex(i => i.name === itemData.name);
      if (index !== -1) {
        cart[index].quantity++;
        qty.textContent = cart[index].quantity;
        saveCart();
      }
    });
  }

  function addItemToCart(itemData, btn) {
    const existing = cart.find(i => i.name === itemData.name);
    if (existing) return;

    cart.push({ ...itemData, quantity: 1 });
    saveCart();
    createQtyButtons(btn, itemData);
  }

  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const name = card.querySelector("h3")?.innerText?.trim();
      const priceText = card.querySelector(".price strong")?.innerText;
      const price = parseInt(priceText.replace("₹", "").trim());
      const image = card.querySelector("img")?.src;

      if (!name || isNaN(price) || !image) return;

      const item = { name, price, image };
      addItemToCart(item, btn);
    });
  });

  // On load: replace Add + with qty for existing items
  function initButtons() {
    document.querySelectorAll(".add-btn").forEach(btn => {
      const card = btn.closest(".product-card");
      const name = card.querySelector("h3")?.innerText?.trim();
      const match = cart.find(i => i.name === name);
      if (match) {
        createQtyButtons(btn, match);
      }
    });
  }

  updateCartCount();
  initButtons();


