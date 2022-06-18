import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebase.config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const info = {
          email: user.email,
          uid: user.uid,
          token: user.accessToken,
          refreshToken: user.refreshToken,
        };
        localStorage.setItem("user", JSON.stringify(info));
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Panel Admin</h2>
          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={handleSubmit}
            >
              <div className="text-center">
                <img
                  src="https://res.cloudinary.com/dmaviub4l/image/upload/v1653989340/ihrda8sczta1nboafcdq.png"
                  className="img-fluid profile-image-pic my-3"
                  width="200px"
                  alt="profile"
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="eail"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success px-5 mb-5 w-100"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
