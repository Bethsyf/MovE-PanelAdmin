import React, { useEffect, useState } from "react";
import ReactHTMLDatalist from "react-html-datalist";
import Swal from "sweetalert2";

const Lenders = () => {
  const [lendersMove, setLendersMove] = useState([]);

  const getLenders = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const data = await fetch("http://35.211.155.160:5000/admin/lender/", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const lenders = await data.json();
    return setLendersMove(lenders);
  };

  useEffect(() => {
    getLenders();
  }, []);

  const [formValues, setFormValues] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLenderSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    const user = JSON.parse(localStorage.getItem("user")) || "";
    fetch("http://35.211.155.160:5000/admin/active/lender", {
      body: JSON.stringify({
        cc_user: formValues.cc_user,
        role: formValues.role,
      }),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          Swal.fire("Bien Hecho!", "Registro exitoso", "success");
          getLenders();
        } else {
          Swal.fire("Oops...", "Ha ocurrido un error", "error");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Oops...", "Ha ocurrido un error", "error" + error);
      });
  };

  return (
    <div className="container-fluid">
      <h2>Prestadores</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>CC</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>Edad</th>
            <th>Estado</th>
            <th>Conductor</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {lendersMove?.map((lender) => (
            <tr key={lender.id_lender}>
              <td>{lender.cc_user}</td>
              <td>{lender.first_name}</td>
              <td>{lender.last_name}</td>
              <td>{lender.email}</td>
              <td>{lender.city}</td>
              <td>{lender.address}</td>
              <td>{lender.age}</td>
              <td>{lender.active_user === true ? "Activo" : "Inactivo"}</td>
              <td>{lender.conductor}</td>
              <td>{lender.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form
                className="card-body cardbody-color p-lg-5"
                onSubmit={handleLenderSubmit}
              >
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="cc_user"
                    aria-describedby="emailHelp"
                    placeholder="CC Usuario"
                    name="cc_user"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <small>Activar como prestador: </small>
                  <br />
                  <ReactHTMLDatalist
                    className="form-control"
                    name="role"
                    onChange={handleChange}
                    options={[
                      { text: "Activar como prestador", value: "prestador" },
                    ]}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success px-5 mb-2 w-100"
                  >
                    Prestador
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lenders;
