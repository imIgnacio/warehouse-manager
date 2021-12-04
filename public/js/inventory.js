const inventoryFormHandler = async () => {
  // event.preventDefault();
  const id = document.getElementById("v_id").value.trim();
  console.log(id);

  if (id) {

    const response = await fetch(`/api/vehicles/${id}`, {
      // console.log(id);
      method: "GET",

      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    // if (response.ok) {

    //   document.location.reload();
    // } else {
    //   alert(response.statusText);
    // }
  }
};

document
  .getElementById("inventory-form")
  .addEventListener("click", inventoryFormHandler);
