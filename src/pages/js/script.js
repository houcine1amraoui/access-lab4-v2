async function handleLogin(event) {
  event.preventDefault(); // Prevent any default form behavior

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessageElement = document.getElementById("error-message");

  errorMessageElement.innerText = ""; // Clear previous error messages

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessageElement.innerText = data.message; // Display error message
      console.log(data.message);
    } else {
      localStorage.setItem("loggedIn", "true"); // Store login status
      window.location.href = "/account"; // Redirect to Account Page
    }
  } catch (error) {
    errorMessageElement.innerText = "An error occurred. Please try again.";
  }
}
