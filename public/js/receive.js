const receiveFormHandler = async event => {
  event.preventDefault();
  const make = document.getElementById("make").value.trim();
  const model = document.getElementById("model").value.trim();
  const kms = document.getElementById("km").value.trim();
  const color = document.getElementById("color").value.trim();
  const year = document.getElementById("year").value.trim();
  const rego_number = document.getElementById("rego").value.trim();
  const locationElement = document.getElementById("location").value.trim();
  const cost_price = document.getElementById("costprice").value.trim();
  const sell_price = document.getElementById("sellprice").value.trim();

  if (
    make &&
    model &&
    kms &&
    color &&
    year &&
    rego_number &&
    locationElement &&
    cost_price &&
    sell_price
  ) {
    const location = selectLocation(locationElement);

    const response = await fetch(`/api/vehicles/receive`, {
      method: "POST",
      body: JSON.stringify({
        make,
        model,
        kms,
        color,
        year,
        rego_number,
        location,
        cost_price,
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

// Function to get location_id based on shat user chooses
function selectLocation(location) {
  if (location === "Showroom") {
    return 1;
  } else {
    return 2;
  }
}

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

document
  .getElementById("receive")
  .addEventListener("click", receiveFormHandler);

logoutElement.addEventListener("click", finishSession);
