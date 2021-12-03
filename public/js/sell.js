const sellFormHandler = async (event) => {
  event.preventDefault();
  const id = document.getElementById("search_id").value.trim();
  console.log(id);
  // const model = document.getElementById("#vehicle-model").value.trim();
  // const cost_price = document.getElementById("#costprice").value.trim();
  // const sell_price = document.getElementById("#sellingprice").value.trim();
  if (id) {
    const response = await fetch(`/api/vehicles/sell/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/homepage");
    } else {
      alert(response.statusText);
    }
  }
};
document.getElementById("sellform").addEventListener("click", sellFormHandler);
