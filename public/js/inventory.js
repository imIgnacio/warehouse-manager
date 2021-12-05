// Search Bar function
const searchButton = document.getElementById('search-button');
let searchRego;

searchButton.addEventListener('click', async () => {
  let tBody = document.getElementById('tBody');
  let trChild = document.createElement("tr");
  searchRego = document.getElementById('search-rego').value;

  if(!searchRego){
    document.location.replace("/inventory");
    return;
  }

  // Clear all rows to have room for the one to be found
  while (tBody.hasChildNodes()) {
   tBody.removeChild(tBody.firstChild);
  }

  const vehiclefound = await getVehicleByRego(searchRego);
  const data = vehiclefound.json();

  data
  .then((vehicle) => {

    //Create html elements
    const thID = document.createElement("th");
    const tdMake = document.createElement("td");
    const tdRego = document.createElement("td");
    const tdColor = document.createElement("td");
    const tdYear = document.createElement("td");
    const tdKms = document.createElement("td");
    const tdLocation = document.createElement("td");
    const tdCostPrice = document.createElement("td");
    const tdSellPrice = document.createElement("td");

    //Feed Td's with vehicle info
    thID.innerHTML = vehicle.id;
    tdMake.innerHTML = vehicle.make + " " + vehicle.model;
    tdRego.innerHTML = vehicle.rego_number;
    tdColor.innerHTML = vehicle.color;
    tdYear.innerHTML = vehicle.year;
    tdKms.innerHTML = vehicle.kms;
    tdCostPrice.innerHTML = vehicle.cost_price;
    tdSellPrice.innerHTML = vehicle.sell_price;
    
    //Get id of the location
    if(vehicle.location == 1){
      tdLocation.innerHTML = "Showroom";
    }else{
      tdLocation.innerHTML = "Warehouse";
    }

    // Append children to fill Table
    trChild.appendChild(thID);
    trChild.appendChild(tdMake);
    trChild.appendChild(tdRego);
    trChild.appendChild(tdColor);
    trChild.appendChild(tdYear);
    trChild.appendChild(tdKms);
    trChild.appendChild(tdLocation);
    trChild.appendChild(tdCostPrice);
    trChild.appendChild(tdSellPrice);

    tBody.appendChild(trChild);
  });
});

// Fetch GET to get a vehicle by rego
async function getVehicleByRego(rego) {
  const response = await fetch(`/api/vehicles/${rego}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },    
  });
  return response;
}

//Back arrow
const backArrow = () => {
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

//Drop down menu on mobile version
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

//Listeners
logoutElement.addEventListener("click", finishSession);

document.getElementById("arrow").addEventListener("click", backArrow);
