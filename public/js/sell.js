//const { response } = require("express");

const searchBar = document.getElementById("search-btn");
const vehicleInfo = document.getElementById("vehicleInfo");
let vehicle = [];

const getVehicleInfo = async () => {
  const id = document.getElementById("search_id").value.trim();

  if (id) {
    const response = await fetch(`/api/vehicles/${id}`, {
      method: "GET",

      headers: { "Content-Type": "application/json" },
    });
    vehicle = await response.json();
    console.log(vehicle);
    displayVehicles(vehicle);
  }
};
searchBar.addEventListener("click", getVehicleInfo);

const displayVehicles = () => {
  const htmlString = `
   <p
      class="is-size-5 pb-4"
      id="vehicle-make"
     >${vehicle.make}
    </p>
    <p
    class="is-size-5 pb-4"
    id="vehicle-model"
  >${vehicle.model}
  </p>

  </div>


  <div class="field">
    <p class="is-size-5 has-text-weight-bold">Cost price</p>
    <p class="is-size-5 pb-4" id="costprice">${vehicle.cost_price}</p>
  </div>

  <div class="field">
  <p class="is-size-5 has-text-weight-bold">Selling price</p>
  <p class="is-size-5 pb-4" id="costprice">${vehicle.sell_price}</p>
</div> 
    `;

  vehicleInfo.innerHTML += htmlString;
};

const sellFormHandler = async (event) => {
  event.preventDefault();
  const rego_number = document.getElementById("search_id").value.trim();
  if (rego_number) {
    const response = await fetch(`/api/vehicles/sell/${rego_number}`, {
      method: "DELETE",
      body: JSON.stringify({
        rego_number,
      }),
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
