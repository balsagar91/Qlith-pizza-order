document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const itemCountEl = document.getElementById("item-count");
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const grandTotalEl = document.getElementById("grandtotal");

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      itemCountEl.innerText = "0";
      subtotalEl.innerText = "0.00";
      taxEl.innerText = "0.00";
      grandTotalEl.innerText = "0.00";
      return;
    }

    let totalQty = 0;
    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      totalQty += item.quantity;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>${item.name}</strong><br>
            ₹${item.price} × ${item.quantity} = ₹${itemTotal.toFixed(2)}
          </div>
          <div>
            <button onclick="updateQty(${index}, -1)">−</button>
            <button onclick="updateQty(${index}, 1)">+</button>
          </div>
        </div>
      `;
      cartContainer.appendChild(itemDiv);
    });

    const tax = subtotal * 0.05;
    const grandTotal = subtotal + tax;

    itemCountEl.innerText = totalQty;
    subtotalEl.innerText = subtotal.toFixed(2);
    taxEl.innerText = tax.toFixed(2);
    grandTotalEl.innerText = grandTotal.toFixed(2);
  }

  window.updateQty = (index, change) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };


  renderCart();
});

  document.getElementById("back-arrow").addEventListener("click", () => {
    window.history.back();
  });

