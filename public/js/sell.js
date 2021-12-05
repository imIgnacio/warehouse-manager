const searchBar = document.getElementById("searchbtn");
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

const displayVehicles = () => {
  if (vehicle.location == 1) {
    vehicleLocation = "Showroom";
  } else {
    vehicleLocation = "Warehouse";
  }

  const htmlString = `
  <div class="field">
  <p
    class="is-size-4 has-text-weight-bold pt-4 pb-2  is-underlined"
    id="vehicleInfo"
  >Vehicle information</p>
  </p>
</div>

<div class="field">
  <p class="is-size-5 has-text-weight-bold">Vehicle</p>
  <p class="is-size-5 pb-1" id="costprice">${vehicle.make} ${vehicle.model}</p>
</div>

<div class="field">
  <p class="is-size-5 has-text-weight-bold">Registration</p>
  <p class="is-size-5 pb-1" id="costprice">${vehicle.rego_number}</p>
</div>

<div class="field">
  <p class="is-size-5 has-text-weight-bold">Cost price</p>
  <p class="is-size-5 pb-1" id="costprice">$ ${vehicle.cost_price}</p>
</div>

<div class="field">
  <p class="is-size-5 has-text-weight-bold">Location</p>
  <p class="is-size-5 pb-1" id="costprice">${vehicleLocation}</p>
</div>

<div class="field ">
  <label class="label is-medium">Selling price</label>
  <div class="control">

    <input
      class="input"
      type="text"
      placeholder="e.g. 12500 "
      id="sellingprice"
    />
  </div>
</div>

    `;

  vehicleInfo.innerHTML = htmlString;
};

const sellFormHandler = async event => {
  event.preventDefault();
  const sell_price = document.getElementById("sellingprice").value.trim();
  const rego_number = document.getElementById("search_id").value.trim();
  console.log(sell_price, rego_number);
  if (rego_number && sell_price) {
    const response = await fetch(`/api/vehicles/sell/${rego_number}`, {
      method: "DELETE",
      body: JSON.stringify({
        rego_number,
        sell_price,
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
const logoutElement = document.getElementById("logout");

const finishSession = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
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
    $navbarBurgers.forEach(el => {
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
logoutElement.addEventListener("click", finishSession);
searchBar.addEventListener("click", getVehicleInfo);
