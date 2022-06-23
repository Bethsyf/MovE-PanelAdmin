import React, { useEffect, useState } from "react";

const Users = () => {
  const [usersMove, setUsersMove] = useState([]);

  // Traer usuarios
  const getUsers = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const data = await fetch("https://api.demodaymove.tech/auth/users/", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const users = await data.json();
    return setUsersMove(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // console.log(usersMove);

  return (
    <div className="container-fluid">
      <h2>Usuarios</h2>
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
          </tr>
        </thead>
        <tbody>
          {usersMove?.map((user) => (
            <tr key={user.uid}>
              <td>{user.cc_user}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.city}</td>
              <td>{user.address}</td>
              <td>{user.age}</td>
              <td>{user.active_user === true ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
