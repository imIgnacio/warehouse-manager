const inventoryFormHandler = async () => {
  const id = document.getElementById("v_id").value.trim();

  if (id) {
    const response = await fetch(`/api/vehicles/${id}`, {
      method: "GET",

      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  }
};

const backArrow = () => {
  console.log("arrow function");
  document.location.replace("/homepage");
};

document
  .getElementById("inventory-form")
  .addEventListener("click", inventoryFormHandler);

document.getElementById("arrow").addEventListener("click", backArrow);
