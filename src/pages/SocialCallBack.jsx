
// on /social/callback route
const email = new URLSearchParams(window.location.search).get("email");

fetch("https://api-hotel-production-ee3e.up.railway.app/api/auth/get-user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email })
})
  .then(res => res.json())
  .then(data => {
    if (data.result) {
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      // redirect to dashboard
      window.location.href = "/";
    } else {
      alert("User not found");
    }
  });

