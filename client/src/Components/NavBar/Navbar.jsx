import "./Navbar.css";
import logo from "../../images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { isAuthenticated, signout } from "../Authentication/auth";

function toggleNavbar() {
  var navbar = document.getElementById("navbar");
  if (navbar.className === "nav") navbar.className += " collapse";
  else navbar.className = "nav";
}

const logout = () => {
  signout();
};

const Navbar = () => {
  const auth = isAuthenticated();
  return (
    <>
      <nav className="nav" id="navbar">
        <div className="nav-menu flex-row">
          <div className="nav-brand">
            <Link to="/" className="text-grey bold">
              <img className="logo" src={logo} width="50px" alt="" />
              FineArts <span className="red">NIT Kurukhetra</span>
            </Link>
          </div>
          <div className="toggle-collapse">
            <div className="toggle-icons">
              <i className="fas fa-bars" onClick={toggleNavbar}></i>
            </div>
          </div>

          <div>
            <ul className="nav-items">
              <li className="nav-link">
                <NavLink exact activeClassName="active" to="/">
                  home
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink activeClassName="active" to="/art">
                  Art Gallery
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink activeClassName="active" to="/join">
                  Join us
                </NavLink>
              </li>
              {auth?.admin && (
                <li className="nav-link">
                  <Link to="/admin">Admin panel</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="social text-grey">
            {!auth && (
              <NavLink activeClassName="active" to="/signin" className=" left">
                signin
              </NavLink>
            )}
            {!auth && (
              <NavLink to="/signup" activeClassName="active" className=" left">
                signup
              </NavLink>
            )}
            {auth && (
              <Link onClick={logout} to="/" className=" left">
                Signout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
