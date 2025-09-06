// REGISTER MODAL
const registerBtn = document.getElementById("registerBtn");
const registerModal = document.getElementById("registerModal");
const closeRegister = document.getElementById("closeRegister");

registerBtn.addEventListener("click", () => {
  registerModal.style.display = "flex";
});

closeRegister.addEventListener("click", () => {
  registerModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === registerModal) {
    registerModal.style.display = "none";
  }
});

// LOGIN MODAL
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");

loginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

closeLogin.addEventListener("click", () => {
  loginModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});

// LOADING OVERLAY
function showLoading() {
  document.getElementById("loadingOverlay").style.display = "flex";
}

function hideLoading() {
  document.getElementById("loadingOverlay").style.display = "none";
}

const API_URL = "http://localhost:3000/api/users";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const registerMsg = document.getElementById("registerMsg");
const loginMsg = document.getElementById("loginMsg");

//----------------------------- register user
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  showLoading();

  const userData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("registerEmail").value,
    password: document.getElementById("registerPassword").value,
    role: document.getElementById("role").value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (res.status === 201) {
      registerMsg.textContent = data.message || "User registered";
      registerForm.reset();
    } else {
      registerMsg.textContent = data.message || "Registration failed";
      registerMsg.style.color = "red";
    }
  } catch (err) {
    registerMsg.textContent = "Network error, try again";
    console.error(err);
  } finally {
    hideLoading();
  }
});

//----------------------------- Login User
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const credentials = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        loginMsg.textContent = data.message || "Login successful";
        loginMsg.style.color = "green";
        loginForm.reset();
      } else {
        loginMsg.textContent = data.message || "Invalid credentials";
        loginMsg.style.color = "red";
      }
    } catch (err) {
      loginMsg.textContent = "Network error, try again";
      loginMsg.style.color = "red";
      console.error(err);
    }
  });
}
