const sellFormHandler = async (event) => {
  event.preventDefault();


  const vehicleModel = document.querySelector("#vehicle-model").value.trim();
  const costPrice = document.querySelector("#costprice").value.trim();
  const sellPrice = document.querySelector("#sellingprice").value.trim();

  if (vehicleModel && costPrice && sellPrice) {
    const response = await fetch("/api/vehicle/sell", {
      method: "DELETE",
      body: JSON.stringify({ email, password }),
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
