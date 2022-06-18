import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { app } from "../../firebase/firebase.config";

const NavBar = () => {
  const handleLogout = () => {
    const auth = getAuth(app);
    localStorage.clear();
    signOut(auth)
      .then(() => {
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <img
          className="navbar-brand"
          src="https://res.cloudinary.com/dmaviub4l/image/upload/v1653989340/ihrda8sczta1nboafcdq.png"
          alt="Cloudinary"
          width="180"
        />

        <button
          className="navbar-toggler"
          type="button"
          databstoggle="collapse"
          databsparent="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" to="/users" replace={true}>
              Usuarios
            </Link>
            <Link className="nav-link active" to="/vehicles" replace={true}>
              Vehículos
            </Link>
            <Link className="nav-link active" to="/takers" replace={true}>
              Tomadores
            </Link>
            <Link className="nav-link active" to="/lenders" replace={true}>
              Prestadores
            </Link>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleLogout()}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
