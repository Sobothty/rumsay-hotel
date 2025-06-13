import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    avatar: Yup.mixed()
      .test(
        "fileSize",
        "File too large",
        (value) => !value || (value && value.size <= 2 * 1024 * 1024)
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
      ),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Select gender")
      .required("Required"),
  });

  const handleSignUp = async (values, { setSubmitting, setStatus }) => {
    setLoading(true);
    setStatus("");

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("gender", values.gender.toLowerCase());

      if (values.avatar) {
        formData.append("avatar", values.avatar);
      } else {
        formData.append(
          "avatar",
          "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        );
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.data?.token) {
        localStorage.setItem("authToken", res.data.data.token);
        navigate("/");
      } else {
        setStatus("Registration succeeded but no token received.");
      }

      setLoading(false);
      setSubmitting(false);
    } catch (err) {
      setStatus(
        err.response?.data?.message || "Sign up failed. Please try again."
      );
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="flex items-center justify-center p-8 animate-fade-in">
        <div className="w-full max-w-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 backdrop-blur-lg transition-all duration-500">
          <h2 className="text-3xl font-extrabold mb-6 text-primary dark:text-white text-center tracking-wide animate-slide-down">
            Welcome to Romsay
          </h2>
          <Formik
            initialValues={{
              name: "",
              avatar: null,
              email: "",
              password: "",
              password_confirmation: "",
              gender: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ setFieldValue, isSubmitting, status }) => (
              <Form className="space-y-5">
                <div className="animate-fade-in">
                  <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary/40 transition"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "0.05s" }}
                >
                  <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary/40 transition"
                    onChange={(e) =>
                      setFieldValue("avatar", e.currentTarget.files[0] || null)
                    }
                  />
                  <ErrorMessage
                    name="avatar"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary/40 transition"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "0.15s" }}
                >
                  <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary/40 transition"
                    placeholder="******"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="password_confirmation"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary/40 transition"
                    placeholder="******"
                  />
                  <ErrorMessage
                    name="password_confirmation"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "0.25s" }}
                >
                  <label className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-200">
                    Gender
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none bg-white/70 dark:bg-gray-800/70 focus:ring-2 focus:ring-primary/40 transition"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                {/* Terms */}
                <div
                  className="flex items-center space-x-2 animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <Field type="checkbox" name="terms" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    I agree to the <a className="underline">terms & policy</a>
                  </span>
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
                  {loading && (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  )}
                  Signup
                </button>
                <div
                  className="relative text-center my-4 animate-fade-in"
                  style={{ animationDelay: "0.35s" }}
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
            Have an account?{" "}
            <Link to="/sign-in" className="text-primary font-medium underline">
              Sign In
            </Link>
          </p>
        </div>
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

export default SignUp;
