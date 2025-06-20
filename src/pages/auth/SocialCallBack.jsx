// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

export default function SocialCallBack() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const email = new URLSearchParams(window.location.search).get("email");

  //   if (!email) {
  //     alert("No email found.");
  //     navigate('/sign-in');
  //     return;
  //   }

  //   fetch("https://api-hotel-production-ee3e.up.railway.app/api/auth/get-user", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.result) {
  //         localStorage.setItem("authToken", data.data.token);
  //         localStorage.setItem("user", JSON.stringify(data.data.user));
  //         // Redirect to home page
  //         navigate('/');
  //       } else {
  //         alert("User not found");
  //         navigate('/sign-in');
  //       }
  //     })
  //     .catch(err => {
  //       console.error("Error fetching user:", err);
  //       alert("Something went wrong.");
  //       navigate('/sign-in');
  //     });

  // }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-xl font-bold">Call back</h1>
    </div>
  );
}
