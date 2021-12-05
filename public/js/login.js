const loginFormHandler = async (event) => {

    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/homepage');
      } 
      else {
        alert(response.statusText);
      }
    }
  };
  
 
  const renderSignup = async(event) =>{
    event.preventDefault();

  }
  document
    .getElementById('login-form')
    .addEventListener('click', loginFormHandler);  
 