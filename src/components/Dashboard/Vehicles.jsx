import React, { useEffect, useState } from "react";

const Vehicles = () => {
  const [vehiclesMove, setVehiclesMove] = useState([]);

  const getVehicles = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const data = await fetch("http://35.211.155.160:5000/vehicles", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const vehicles = await data.json();
    return setVehiclesMove(vehicles);
  };

  useEffect(() => {
    getVehicles();
  }, []);


  return (
    <div className="container-fluid">
      <h2>Vehículos</h2>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <td>CC Propietario</td>
            <td>Placa</td>
            <td>Imagen</td>
            <td>Estado</td>
            <td>Marca</td>
            <td>Linea</td>
            <td>Color</td>
            <td>Modelo</td>
            <td>Póliza</td>
            <td>Precio</td>
          </tr>
        </thead>
        <tbody>
          {vehiclesMove?.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.cc_owner}</td>
              <td>{vehicle.placa}</td>
              <td>
                <img
                  src={vehicle.url_image[0].url}
                  alt="imagen"
                  height="80px"
                />
              </td>
              <td>{vehicle.activo === true ? "Activo" : "Inactivo"}</td>
              <td>{vehicle.marca}</td>
              <td>{vehicle.linea}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.modelo}</td>
              <td>{vehicle.poliza === true ? "Con poliza" : "Sin poliza"}</td>
              <td>${vehicle.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vehicles;
