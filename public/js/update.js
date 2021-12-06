const errorMessage = document.getElementById("error-message");
const searchBar = document.getElementById("searchbtn");
const vehicleInfo = document.getElementById("vehicle-Info");
let vehicle = [];

// Search for vehicle user wants to update
const getVehicleInfo = async () => {
  const id = document.getElementById("search_id").value.trim();

  if (id) {
    const response = await fetch(`/api/vehicles/${id}`, {
      method: "GET",

      headers: { "Content-Type": "application/json" },
    });

    if (response.status == 404) {
      errorMessage.innerHTML = "No vehicle found with this Rego";
    } else {
      errorMessage.innerHTML = "";
      vehicle = await response.json();
      displayVehicles(vehicle);
    }
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
  <p class="is-size-5 pb-1" id="costprice">$${vehicle.cost_price}</p>
</div>

<div class="field">
  <p class="is-size-5 has-text-weight-bold">Sell price</p>
  <p class="is-size-5 pb-1" id="costprice">$${vehicle.sell_price}</p>
</div>

<div class="field">
  <p class="is-size-5 has-text-weight-bold">Location</p>
  <p class="is-size-5 pb-3" id="costprice">${vehicleLocation}</p>
</div>



<div class="field">
  <label class="label is-medium">Selling price</label>
  <div class="control">

    <input
      class="input"
      type="text"
      placeholder="e.g. 14500 "
      id="selling-price"
    />
  </div>
</div>

<div class="field">
  <label class="label is-medium">Select Location</label>
  <div class="select">
    <select id="location">
      <option>Showroom</option>
      <option>Warehouse</option>
    </select>
  </div>
</div>
    `;

  vehicleInfo.innerHTML = htmlString;
};

const updateFormHandler = async (event) => {
  event.preventDefault();

  const sell_price = document.getElementById("selling-price").value.trim();
  let location = document.getElementById("location").value.trim();
  const rego_number = document.getElementById("search_id").value.trim();

  //Change location name for id
  if (location === "Showroom") {
    location = 1;
  } else {
    location = 2;
  }

  //Make sure we have all attributes to update
  if (rego_number && sell_price && location) {
    const response = await fetch(`/api/vehicles/update/${rego_number}`, {
      method: "PUT",
      body: JSON.stringify({
        sell_price,

        location,
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

//Arrow to go back
const backArrow = () => {
  console.log("arrow function");
  document.location.replace("/homepage");
};

//Log out button
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

//Menu for mobile version
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

//Event listeners
document.getElementById("arrow").addEventListener("click", backArrow);
document
  .getElementById("updateform")
  .addEventListener("click", updateFormHandler);

logoutElement.addEventListener("click", finishSession);

// Event listener to get vehicle information
searchBar.addEventListener("click", getVehicleInfo);
