import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import RootLayout from "./components/layout/RootLayout";
import Homepage from "./pages/homePage";
import About from "./pages/aboutPage";
import Contact from "./pages/contactPage";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import AdminDashboard from "./pages/admin/Dashboard";
import DashboardHome from "./pages/admin/page/DashboardHome";
import AllRoom from "./pages/admin/page/AllRoom";
import RoomTypes from "./pages/admin/page/RoomTypes";
import AllUsers from "./pages/admin/page/AllUsers";
import { Reservation } from "./pages/admin/page/Reservation";
import ProfileDashboard from "./pages/profileDashboard";
import BookingRoom from "./pages/bookingRoomPage";
import RoomDetail from "./components/RoomDetail";
import CheckoutPage from "./pages/CheckoutPage";
import CheckinCheckout from "./pages/CheckInCheckOut";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages with RootLayout (navbar/footer) */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="dashboard" element={<ProfileDashboard />} />
          <Route path="booking" element={<BookingRoom />} />
          <Route path="room-detail/:id" element={<RoomDetail />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>
        <Route path="/check-in-out" element={<CheckinCheckout />} />
        {/* Admin pages without RootLayout (no navbar/footer) */}
        <Route path="admin" element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="rooms" element={<AllRoom />} />
          <Route path="room-types" element={<RoomTypes />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="bookings" element={<Reservation />} />
        </Route>

        {/* filter route */}

        {/* Catch-all route for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
