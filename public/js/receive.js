const receiveFormHandler = async (event) => {
  event.preventDefault();
  const make = document.getElementById("make").value.trim();
  console.log(make);
  const model = document.getElementById("model").value.trim();
  const kms = document.getElementById("km").value.trim();
  const color = document.getElementById("color").value.trim();
  const year = document.getElementById("year").value.trim();
  const rego = document.getElementById("rego").value.trim();
  const location = document.getElementById("location").value.trim();
  const cost_price = document.getElementById("costprice").value.trim();
  const sell_price = document.getElementById("sellprice").value.trim();
  if (
    make &&
    model &&
    kms &&
    color &&
    year &&
    rego &&
    location &&
    cost_price &&
    sell_price
  ) {
    const response = await fetch(`/api/vehicles/receive`, {
      method: "POST",
      body: JSON.stringify({
        make,
        model,
        kms,
        color,
        year,
        rego,
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

document
  .getElementById("receive")
  .addEventListener("click", receiveFormHandler);
