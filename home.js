document.addEventListener("DOMContentLoaded", () => {
 
  const detectBtn = document.querySelector(".detect-btn");
  const locationText = document.querySelector(".no-location");
  const locationWarning = document.querySelector(".location-warning");


  const apiKey = "ce658ddd36f440f88f7b854b8a156a8c";


detectBtn?.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
          const data = await response.json();
          const address = data.results[0].formatted;

          locationText.textContent = address;
          locationWarning.style.display = "none";

        } catch (error) {
          locationText.textContent = "Error fetching location.";
          locationWarning.style.display = "block";
        }
      },
      error => {
        locationText.textContent = "Location blocked!";
        locationWarning.style.display = "block";
      }
    );
  } else {
    locationText.textContent = "Geolocation not supported!";
    locationWarning.style.display = "block";
  }
});


  ed
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
