import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Cart(props) {
  const { cartItems } = props;

  const navigate = useNavigate();
  return (
    <div className="cart dim pointer" onClick={() => navigate("/placeOrder")}>
      <FontAwesomeIcon icon={faCartShopping} />
      <p className="dib ml1">Cart</p>
      <span>{cartItems?.length ? cartItems.length : ""}</span>
    </div>
  );
}
