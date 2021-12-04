const receiveFormHandler = async (event) => {
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

  if(make && model && kms && color && year && rego_number && locationElement && cost_price && sell_price) {

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
  if(location === "Showroom"){
    return 1;
  }else{
    return 2;
  }
}

document
  .getElementById("receive")
  .addEventListener("click", receiveFormHandler);

const logoutElement = document.getElementById("logout");

const finishSession = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
}

logoutElement.addEventListener("click", finishSession);