const logoutElement = document.getElementById("logout");

const finishSession = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
}

logoutElement.addEventListener("click", finishSession);