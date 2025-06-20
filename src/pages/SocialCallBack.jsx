import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SocialCallBack() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search).get("email");

    if (email) {
      console.log("User email:", params);
    }
    fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/get-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ params }),
    });
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result) {
        // Save token
        localStorage.setItem("authToken", data?.data?.token);
        localStorage.setItem("user", JSON.stringify(data?.data?.user));
        // Redirect to home page
        navigate("/");
      } else {
        // Handle error
        console.error("Login failed:", data.message);
        navigate("/login");
      }
    });

  // const email = new URLSearchParams(window.location.search).get("email");
  // fetch(`${import.meta.env.VITE_BASE_URL}/auth/social/callback`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data.result) {
  //       // Save token
  //       localStorage.setItem("authToken", data?.data?.token);
  //       localStorage.setItem("user", JSON.stringify(data?.data?.user));
  //       // Redirect to home page
  //       navigate("/");
  //     } else {
  //       // Handle error
  //       console.error("Login failed:", data.message);
  //       navigate("/login");
  //     }
  //   });

  return <div>SocialCallBack</div>;
}
