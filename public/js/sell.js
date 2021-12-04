const getVehicleInfo = async () => {
  const rego_number = document.getElementById("search_id").value.trim();
  if (rego_number) {
    const response = await fetch(`/api/vehicles/${rego_number}`, {
      method: "GET",
    });
  }
};

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

document.getElementById("search-btn").addEventListener("click", getVehicleInfo);
document.getElementById("arrow").addEventListener("click", backArrow);
document.getElementById("sellform").addEventListener("click", sellFormHandler);
