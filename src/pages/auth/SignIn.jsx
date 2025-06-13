import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  // Function to handle login
  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    setLoading(true);
    setStatus(""); // clear previous error
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      // Save token
      localStorage.setItem("authToken", res.data?.data?.token);

      // Fetch user profile to get role after login
      let roleName = "";
      try {
        const profileRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${res.data?.data?.token}`,
            },
          }
        );
        // Try to get role from profile response
        roleName =
          profileRes.data?.data?.role?.name ||
          profileRes.data?.data?.role ||
          "";
      } catch (profileErr) {
        // fallback: no role info
        roleName = "";
      }

      if (roleName && roleName.toLowerCase() === "admin") {
        navigate("/admin");
      } else if (roleName && roleName.toLowerCase() === "regular user") {
        navigate("/");
      } else {
        // fallback
        navigate("/");
      }
      setLoading(false);
      setSubmitting(false);
    } catch (err) {
      setStatus("Invalid email or password");
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 animate-fade-in">
        <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 backdrop-blur-lg transition-all duration-500">
          <h2 className="text-3xl font-extrabold mb-6 text-primary dark:text-white text-center tracking-wide animate-slide-down">
            Welcome Back
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-5">
                <div className="animate-fade-in">
                  <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary/40 transition"
                    placeholder="Enter your email"
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary/40 transition"
                    placeholder="******"
                    required
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div
                  className="flex items-center space-x-2 animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <input
                    type="checkbox"
                    id="terms"
                    className="accent-primary"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 dark:text-gray-300"
                  >
                    I agree to the{" "}
                    <a className="underline cursor-pointer">terms & policy</a>
                  </label>
                </div>
                {status && (
                  <div className="text-red-500 text-sm text-center">
                    {status}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-primary to-blue-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
                  disabled={loading || isSubmitting}
                >
                  {loading ? (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  ) : null}
                  Sign In
                </button>
                <div
                  className="relative text-center my-4 animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                  </div>
                  <div className="relative bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
                    or
                  </div>
                </div>
                <div
                  className="flex gap-2 animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-xl py-2 text-sm bg-white/70 dark:bg-gray-800/70 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <img
                      src="src/assets/signup/google.png"
                      alt="Google"
                      className="h-5 mr-2"
                    />
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-xl py-2 text-sm bg-white/70 dark:bg-gray-800/70 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <img
                      src="src/assets/signup/facebook.png"
                      alt="Facebook"
                      className="h-5 mr-2"
                    />
                    Facebook
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p
            className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-primary font-medium underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      {/* Right Side - Image */}
      <div
        className="hidden md:block animate-fade-in h-screen"
        style={{ animationDelay: "0.2s" }}
      >
        <img
          src="src/assets/signup/left-pic_signup.png"
          alt="Room"
          className="w-full h-full object-cover rounded-l-2xl shadow-2xl min-h-screen"
        />
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
          }
          .animate-slide-down {
            animation: slideDown 0.7s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </section>
  );
};

export default SignIn;
