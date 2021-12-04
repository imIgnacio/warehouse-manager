const signupFormHandler = async event => {
  event.preventDefault();
  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
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
  .getElementById("signup-form")
  .addEventListener("click", signupFormHandler);
