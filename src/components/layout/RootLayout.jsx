import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import NavbarPage from "../Navbar";
import { useLocation } from "react-router-dom";

const RootLayout = () => {
  const location = useLocation();

  const isHidden =
    location.pathname === "/sign-in" || location.pathname === "/sign-up" || location.pathname === "/admin";

  return (
    <>
      {!isHidden && <NavbarPage />}
      <div className="Container">
        <Outlet />
      </div>
      {!isHidden && <Footer />}
    </>
  );
};

export default RootLayout;
