const inventoryFormHandler = async (event) => {
  event.preventDefault();
  const regoId = document.getElementById("rego").value.trim();

  if (regoId) {
    const response = await fetch("/api/warehouse/inventory", {
      method: "POST",
      body: JSON.stringify({ regoId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const getInventory = (event) => {
  event.preventDefault();
  const vehicle = document.getElementById("rego").value.trim();

  fetch("/api/vehicles/inventory")
  .then(function(response){
      return response.json();
  })
  .then(function(data) {
    console.log(data);
  }
};

document
  .getElementById("inventory-form")
  .addEventListener("click", inventoryFormHandler);

getInventory();
