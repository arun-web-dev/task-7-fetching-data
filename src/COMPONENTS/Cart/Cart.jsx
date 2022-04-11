import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  return (
    <div className="cart ">
      <FontAwesomeIcon icon={faCartShopping} />
      <p className="dib ml1">Cart</p>
      <span>1</span>
    </div>
  );
}
