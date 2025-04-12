import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token, currency } = useContext(StoreContext);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Function to determine status class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'food processing':
        return 'processing';
      case 'out for delivery':
        return 'out-for-delivery';
      case 'delivered':
        return 'delivered';
      default:
        return 'processing'; // Default fallback
    }
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {loading ? (
          // Display skeleton loaders while fetching data
          Array(3).fill().map((_, index) => (
            <div key={`skeleton-${index}`} className="my-orders-order skeleton">
              <div className="order-item-images skeleton-images">
                {Array(3).fill().map((_, idx) => (
                  <div key={idx} className="skeleton-image"></div>
                ))}
              </div>
              <div className="skeleton-text"></div>
              <div className="skeleton-price"></div>
              <div className="skeleton-items"></div>
              <div className="skeleton-status"></div>
              <div className="skeleton-button"></div>
            </div>
          ))
        ) : data.length === 0 ? (
          <div className="no-orders">
            <img src={assets.emptyCart} alt="No Orders" />
            <h3>No orders yet</h3>
            <p>Looks like you haven't placed any orders yet!</p>
          </div>
        ) : (
          [...data].reverse().map((order, index) => (
            <div key={index} className="my-orders-order">
              <div className="order-item-images">
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    <img
                      src={url + "/images/" + item.image}
                      alt={item.name}
                    />
                  </div>
                ))}
              </div>

              <p>
                {order.items.map((item, index) => (
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                ))}
              </p>

              <p>
                {currency} {order.amount}.00
              </p>

              <p>Items: {order.items.length}</p>

              <div className={`status-indicator ${getStatusClass(order.status)}`}>
                <span></span>
                <b>{order.status}</b>
              </div>

              {/* Only show Track Order button if not delivered */}
              {order.status.toLowerCase() !== 'delivered' && (
                <button onClick={() => window.open(`/track/${order._id}`, '_blank')}>
                  Track Order
                </button>
              )}
              
              {/* Show different button if delivered */}
              {order.status.toLowerCase() === 'delivered' && (
                <button onClick={() => window.open(`/review/${order._id}`, '_blank')}>
                  Write Review
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;