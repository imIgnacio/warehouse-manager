const searchBar = document.getElementById("searchbtn");
const vehicleInfo = document.getElementById("vehicle-Info");
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
  <p
  class="is-size-5 pb-4"
  id="vehicle-model"
>${vehicle.color}
</p>
  <p
  class="is-size-5 pb-4"
  id="vehicle-model"
>${vehicle.kms}
</p>
<p
class="is-size-5 pb-4"
id="vehicle-model"
>${vehicle.year}
</p>
<p
class="is-size-5 pb-4"
id="vehicle-model"
>${vehicle.rego_number}
</p>
    `;

  vehicleInfo.innerHTML += htmlString;
};

const updateFormHandler = async (event) => {
  event.preventDefault();
  const cost_price = document.getElementById("cost-price").value.trim();
  const sell_price = document.getElementById("selling-price").value.trim();
  const location = document.getElementById("location").value.trim();
  const rego_number = document.getElementById("search_id").value.trim();

  if (rego_number && sell_price && location && cost_price) {
    const response = await fetch(`/api/vehicles/update/${rego_number}`, {
      method: "PUT",
      body: JSON.stringify({
        sell_price,
        cost_price,
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
document
  .getElementById("updateform")
  .addEventListener("click", updateFormHandler);

  logoutElement.addEventListener("click", finishSession);