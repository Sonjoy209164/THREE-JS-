// document.getElementById("loginBtn").addEventListener("click", function () {
//   const user = document.getElementById("username").value.trim();
//   const pass = document.getElementById("password").value.trim();
//   const msg = document.getElementById("loginMessage");
// document.getElementById("loginBox").style.display = "none";
// document.getElementById("threeContainer").style.display = "block";
//   if (user === "" || pass === "") {
//     msg.style.color = "red";
//     msg.textContent = "Please fill out both fields.";
//     return;
//   }

//   if (user === "admin" && pass === "1234") {
//     msg.style.color = "green";
//     msg.textContent = "Login successful!";

//     // Hide login box, show container
//     document.getElementById("loginBox").style.display = "none";
//     document.getElementById("threeContainer").style.display = "block";
//     document.getElementById("burnBtn").style.display = "block";

    
//     // Dynamically load the 3D script
//     const script = document.createElement("script");
//     script.type = "module";
//     script.src = "script.js";
//     document.body.appendChild(script);
//   } else {
//     msg.style.color = "red";
//     msg.textContent = "Invalid username or password.";
//   }
// });
// Skip login page: directly show 3D scene
window.addEventListener("DOMContentLoaded", () => {
  // Hide the login box (if visible)
  const loginBox = document.getElementById("loginBox");
  const threeContainer = document.getElementById("threeContainer");

  if (loginBox) loginBox.style.display = "none";
  if (threeContainer) threeContainer.style.display = "block";

  // Load the 3D scene script dynamically
  const script = document.createElement("script");
  script.type = "module";
  script.src = "script.js";
  document.body.appendChild(script);
});
