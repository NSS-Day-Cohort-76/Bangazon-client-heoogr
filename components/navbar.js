import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/state";

export default function Navbar() {
  const { token, profile } = useAppContext();
  const hamburger = useRef();
  const navbar = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleDropdown = () => setDropdownActive((prev) => !prev);
  const closeLoggedInDropdown = () => setDropdownActive(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };
  const closeMobileNavbar = () => {
    hamburger.current.classList.remove("is-active");
    navbar.current.classList.remove("is-active");
  };

  // Close the dropdown (cart, my-orders, profile, etc.) when a link is clicked

  const getLoggedInButtons = () => (
    <div className={`navbar-item has-dropdown ${dropdownActive ? "is-active" : ""}`}>
      <span className="navbar-link" onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        <span className="icon">
          <i className="fas fa-user-circle is-medium"></i>
        </span>
      </span>
      <div className="navbar-dropdown is-right">
        <Link href="/cart" className="navbar-item" onClick={closeLoggedInDropdown} passHref>
          Cart
        </Link>
        <Link href="/my-orders" className="navbar-item" onClick={closeLoggedInDropdown} passHref>
          My Orders
        </Link>
        <Link href="/payments" className="navbar-item" onClick={closeLoggedInDropdown} passHref>
          Payment Methods
        </Link>
        <Link href="/profile" className="navbar-item" onClick={closeLoggedInDropdown} passHref>
          Profile
        </Link>

        {profile.store ? (
          <>
            <Link
              href={`/stores/${profile.store.id}`}
              className="navbar-item"
              onClick={closeLoggedInDropdown}
              passHref>
              View Your Store
            </Link>
            <Link href="/products/new" className="navbar-item" onClick={closeLoggedInDropdown} passHref>
              Add a new Product
            </Link>
          </>
        ) : (
          <Link href="/stores/new" className="navbar-item" onClick={closeLoggedInDropdown} passHref>
            Interested in selling?
          </Link>
        )}

        <hr className="navbar-divider" />

        <span
          className="navbar-item"
          role="button"
          onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            closeLoggedInDropdown();
          }}>
          Log out
        </span>
      </div>
    </div>
  );

  const getLoggedOutButtons = () => (
    <div className="navbar-item">
      <div className="buttons">
        <Link href="/register" className="button is-primary" onClick={closeMobileNavbar} passHref>
          <strong>Sign up</strong>
        </Link>
        <Link href="/login" className="button is-light" onClick={closeMobileNavbar} passHref>
          Log in
        </Link>
      </div>
    </div>
  );

  return (
    <nav
      className="navbar mb-3 is-warning px-5 is-fixed-top is-top"
      role="navigation"
      aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/" passHref>
          <Image src="/images/logo.png" alt="Logo" width={64} height={64} className="relative" priority />
        </Link>

        <button
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref={hamburger}
          onClick={showMobileNavbar}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          <Link href="/products" className="navbar-item" onClick={closeMobileNavbar} passHref>
            Products
          </Link>
          <Link href="/stores" className="navbar-item" onClick={closeMobileNavbar} passHref>
            Stores
          </Link>
        </div>

        <div className="navbar-end">{isLoggedIn ? getLoggedInButtons() : getLoggedOutButtons()}</div>
      </div>
    </nav>
  );
}
