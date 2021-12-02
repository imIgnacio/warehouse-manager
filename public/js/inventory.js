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

function getVehicles() {
  return;
}
