import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
      {[...data].reverse().map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              {/* Display item images in a grid layout */}
              <div
                className="order-item-images"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {order.items.map((item, idx) => {
                  return (
                    <div key={idx} style={{ flex: 1 }}>
                      <img
                        src={url + "/images/" + item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "10px",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Display order item names and quantity */}
              <p>
                {order.items.map((item, index) => {
                  return index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `;
                })}
              </p>

              {/* Display order amount */}
              <p>
                {currency}
                {order.amount}.00
              </p>

              {/* Display number of items */}
              <p>Items: {order.items.length}</p>

              {/* Display order status */}
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>

              {/* Track order button */}
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
