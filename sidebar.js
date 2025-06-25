document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }
  const loginBtn = document.getElementById("loginBtn");
  const loginStatus = document.getElementById("loginStatus");
  const dealsLink = document.getElementById("dealsLink");
  const dealsSection = document.getElementById("dealsSection");

  function updateLoginStatus() {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      loginStatus.innerText = "Welcome Back!";
      loginBtn.innerText = "Logout";
    } else {
      loginStatus.innerText = "Login for";
      loginBtn.innerText = "Login";
    }
  }

  loginBtn.addEventListener("click", () => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("isLoggedIn");
    }
    updateLoginStatus();
  });

  dealsLink.addEventListener("click", () => {
    dealsSection.classList.toggle("hidden");
  });

  updateLoginStatus();
});