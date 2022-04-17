import React, { useState } from "react";
import "./PlaceOrder.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function PlaceOrder(props) {
  const { cartItems, removeFromCart, updateCart, addToWishList } = props;
  const [message, setMessage] = useState("");
  const [messageisActive, setMessageisActive] = useState(false);
  const navigate = useNavigate();
  const totalValue = cartItems.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price.raw * currentValue.quantity;
  }, 0);

  const percentageCalculteHandler = (amount, percentage = 0.02) => {
    return Math.ceil(amount * percentage);
  };
  const discount = percentageCalculteHandler(totalValue, 0.05);
  const coupoun = percentageCalculteHandler(totalValue, 0.03);
  const total = totalValue - discount - coupoun;

  const showMessageHandler = (msg) => {
    return (
      setMessage(msg),
      setMessageisActive(true),
      setTimeout(() => {
        setMessageisActive(false);
      }, 1000)
    );
  };

  const quantityHandler = (e, targetId, quantity) => {
    if (e.target.name === "increase") {
      quantity = quantity + 1;
      updateCart(targetId, quantity);
      showMessageHandler("Quantity Increased");
    }
    if (e.target.name === "decrease") {
      if (quantity === 1) {
        showMessageHandler("Quantity cannot be less than 1");
        return;
      }
      quantity = quantity - 1;
      updateCart(targetId, quantity);
      showMessageHandler("Quantity Decreased");
    }
  };

  const removeFromCartHandler = (itemId) => {
    showMessageHandler("Product Removed");
    removeFromCart(itemId);
  };

  const addToWishListHandler = (item) => {
    showMessageHandler("Added To Wishlist");
    addToWishList(item);
    setTimeout(() => {
      removeFromCartHandler(item.id);
    }, 300);
  };

  const cartLists = cartItems.map((item) => {
    return (
      <div
        className="place-order-container-content-container container-parent"
        key={item?.id}
      >
        <div className="place-order-container-content-container-left">
          <div className="place-order-image-container">
            <div className="place-order-image-container-left">
              <div>
                <img src={item.image.url} alt={item?.name} />
              </div>
              <div className="mt3">
                <button
                  className="quantity-decrease adjust-button pointer"
                  name="decrease"
                  onClick={(e) => quantityHandler(e, item.id, item.quantity)}
                >
                  -
                </button>
                <span className="quantity-display mh2">{item.quantity}</span>
                <button
                  className="quantity-increase  adjust-button pointer"
                  name="increase"
                  onClick={(e) => quantityHandler(e, item.id, item.quantity)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="place-order-image-container-right flex justify-between ml3">
              <div className="pointer cart-item-container">
                <Link to={`/${item.name}`} state={item}>
                  <h2 className="f3 ma0">{item?.name}</h2>
                  <p className="mt1">Made in India</p>
                  <p className="f4">
                    Rs.{item?.price?.raw * item.quantity}
                    <span className="strike-price dib ml2 f5">
                      Rs.{(item?.price?.raw + 20) * item.quantity}
                    </span>
                  </p>
                </Link>
              </div>
              <div>
                <button
                  className="remove-btn f5 mr2"
                  onClick={() => addToWishListHandler(item)}
                >
                  SAVE FOR LATER
                </button>
                <button
                  className="remove-btn f5"
                  onClick={() => removeFromCartHandler(item.id)}
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="place-order-container-content-container-right">
          <div>
            <h2 className="f4">
              Delivery By Today 12pm | Free:{" "}
              <span className="strike">Rs.40</span>
            </h2>
            <p className="mt2">7 Days ReplaceMent Policy</p>
          </div>
        </div>
      </div>
    );
  });

  const messageEL = () => {
    return <div className="place-order-message code">{message}</div>;
  };

  const orderHandler = () => {
    navigate("/delivery", { state: { total } });
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="cart-is-empty">
          <h3> Cart is Empty.Please Add some products</h3>
          <button
            className="navigate-to-home mt3"
            onClick={() => navigate("/")}
          >
            Back to Home Page
          </button>
        </div>
      ) : (
        <div className="place-order-container mw9">
          <div className="left-content">
            <div className="place-order-container-content-left pa3 shadow-4">
              <div className="flex justify-between items-center pv3">
                <div>
                  <h2>Mycart ({cartItems.length})</h2>
                </div>
                <div className="flex">
                  <p>
                    <span className="dib mr2">
                      <FontAwesomeIcon icon={faMapLocationDot} />
                    </span>
                    Deliver to: Cumbum
                  </p>
                </div>
              </div>
              <div className="cart-lists-view">{cartLists}</div>
            </div>
          </div>
          <div className="place-order-container-content-right pa3 shadow-4 ml2">
            <div className="flex flex-column justify-between">
              <label className="f3 b">PRICE DETAILS</label>
              <div className="flex justify-between mt3">
                <p>Price ({cartItems.length}) items </p>
                <p>Rs.{totalValue}</p>
              </div>
              <div className="flex justify-between mt3">
                <p>Discount</p>
                <p className="price-details">Rs.-{discount}</p>
              </div>
              <div className="flex justify-between mt3">
                <p>Coupouns For you</p>
                <p className="price-details">Rs.-{coupoun}</p>
              </div>
              <div className="flex justify-between mt3">
                <p>Delivery Charges</p>
                <p className="price-details">FREE</p>
              </div>
              <div className="flex justify-between mt3">
                <h2>Total amount</h2>
                <h2>Rs.{total}</h2>
              </div>
              <div className="mt2 price-details">
                You will save Rs.{coupoun + discount}
              </div>
            </div>
            <div>
              <button className="place-order-btn" onClick={orderHandler}>
                PLACE ORDER
              </button>
            </div>
          </div>

          <div>{messageisActive && messageEL()}</div>
        </div>
      )}
    </>
  );
}
