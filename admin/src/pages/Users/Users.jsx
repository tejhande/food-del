import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css'; // (Create styling file if needed)

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://windspeed-backend.onrender.com/api/user')  // adjust URL if needed
      .then(res => {
        if (res.data.success) {
          setUsers(res.data.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  

  return (
    <div className='users-page'>
      <h2>All Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Registered On</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt ? formatDate(user.createdAt) : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
