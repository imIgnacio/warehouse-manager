// const getVehicleInfo = async () => {
//   const id = document.getElementById("search_id").value.trim();
//   console.log(id);
//   if (id) {
//     const response = await fetch(`/sell/${id}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await response.json();
//     console.log(data);
//   }
// };

const sellFormHandler = async (event) => {
  event.preventDefault();
  const rego_number = document.getElementById("search_id").value.trim();
  const model = document.getElementById("#vehicle-model").value.trim();
  const cost_price = document.getElementById("#costprice").value.trim();
  const sell_price = document.getElementById("#sellingprice").value.trim();
  if (rego_number && model && cost_price && sell_price) {
    const response = await fetch(`/api/vehicles/sell/${rego_number}`, {
      method: "DELETE",
      body: JSON.stringify({ rego_number, model, cost_price, sell_price }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/homepage");
    } else {
      alert(response.statusText);
    }
  }
};

const backArrow = () => {
  console.log("arrow function");
  document.location.replace("/homepage");
};

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

document.getElementById("arrow").addEventListener("click", backArrow);
document.getElementById("sellform").addEventListener("click", sellFormHandler);
// document.getElementById("search-btn").addEventListener("click", getVehicleInfo);
