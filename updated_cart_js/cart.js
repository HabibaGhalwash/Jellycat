
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  function updateTotal() {
    let total = 0;
    document.querySelectorAll(".cart-item").forEach(item => {
      const price = parseFloat(item.getAttribute("data-price"));
      const qty = parseInt(item.querySelector(".qty").textContent);
      total += price * qty;
    });
    totalDisplay.textContent = total.toFixed(2);
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.dataset.index = index;
      cartItem.dataset.price = item.price;

      cartItem.innerHTML = \`
        <img src="\${item.image}" alt="\${item.name}" />
        <div class="item-details">
          <h3>\${item.name}</h3>
          <p class="item-price">$<span class="unit-price">\${item.price}</span></p>
          <div class="quantity-control">
            <button class="qty-btn decrease">-</button>
            <span class="qty">\${item.qty}</span>
            <button class="qty-btn increase">+</button>
          </div>
        </div>
        <button class="remove-btn">Remove</button>
      \`;

      cartItemsContainer.appendChild(cartItem);
    });

    updateTotal();
  }

  cartItemsContainer.addEventListener("click", (e) => {
    const target = e.target;
    const item = target.closest(".cart-item");

    if (target.classList.contains("increase")) {
      const qtyElem = item.querySelector(".qty");
      qtyElem.textContent = parseInt(qtyElem.textContent) + 1;
    }

    if (target.classList.contains("decrease")) {
      const qtyElem = item.querySelector(".qty");
      const currentQty = parseInt(qtyElem.textContent);
      if (currentQty > 1) {
        qtyElem.textContent = currentQty - 1;
      }
    }

    if (target.classList.contains("remove-btn")) {
      const index = parseInt(item.dataset.index);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }

    updateTotal();
  });

  renderCart();
});
