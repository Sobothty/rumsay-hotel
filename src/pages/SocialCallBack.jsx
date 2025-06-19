import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SocialCallBack = () => {
  const navigate = useNavigate();

  const email = new URLSearchParams(window.location.search).get("email");
  fetch(`${import.meta.env.VITE_BASE_URL}/auth/social/callback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
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

  return <div>SocialCallBack</div>;
};
