import React, { useEffect, useState } from "react";

const Takers = () => {
  const [takersMove, setTakersMove] = useState([]);

  const getTakers = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const data = await fetch("http://35.211.155.160:5000/admin/taker/", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const takers = await data.json();
    return setTakersMove(takers.takers);
  };

  useEffect(() => {
    getTakers();
  }, []);


  return (
    <div className="container-fluid">
      <h2>Tomadores</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre Completo</td>
            <td>Email</td>
            <td>Ciudad</td>
            <td>CC</td>
            <td>Edad</td>
            <td>Dirección</td>
            <td>Estado</td>
          </tr>
        </thead>
        <tbody>
          {takersMove?.map((taker) => (
            <tr key={taker.id_taker}>
              <td>{taker.id_taker}</td>
              <td>{taker.full_name}</td>
              <td>{taker.email}</td>
              <td>{taker.city}</td>
              <td>{taker.cc_user}</td>
              <td>{taker.age}</td>
              <td>{taker.address}</td>
              <td>{taker.active_user === true ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Takers;
