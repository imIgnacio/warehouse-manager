const inventoryFormHandler = async (event) => {
  event.preventDefault();
  const regoId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (regoId) {
    const response = await fetch(`/api/vehicles/${regoId}`, {
      method: "GET",
      body: JSON.stringify({ regoId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/inventory/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .getElementById("inventory-form")
  .addEventListener("click", inventoryFormHandler);
