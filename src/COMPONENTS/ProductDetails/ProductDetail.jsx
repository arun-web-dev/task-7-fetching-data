import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetail(props) {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messageisActive, setMessageisActive] = useState(false);
  const [isAddToCartActive, setIsAddToCartActive] = useState(true);
  const { state } = location;
  const { addToCart, removeFromCart } = props;

  const messageEL = () => {
    return <div className="place-order-message-detail code">{message}</div>;
  };
  const addToCartHandler = () => {
    setMessage("Added To Cart Successfully");
    setMessageisActive(true);
    setTimeout(() => {
      setMessageisActive(false);
    }, 1000);
    addToCart(state);
    setIsAddToCartActive(!isAddToCartActive);
  };
  const removeFromCartHandler = () => {
    setMessage("Removed From Cart Successfully");
    setMessageisActive(true);
    setTimeout(() => {
      setMessageisActive(false);
    }, 1000);
    removeFromCart(state.id);
    setIsAddToCartActive(!isAddToCartActive);
  };

  return (
    <div className="product-detail shadow-1">
      <div className="product-detail-image">
        <img src={state.image.url} alt={state.name} />
      </div>
      <div className="product-detail-right pa3">
        <h2 className="f1 mv3">{state.name}</h2>
        <div className="flex mv2 items-center">
          <p className="f3">Special Price: </p>
          <p className="ml2 f2 b"> {`Rs.${state.price.formatted}`}</p>
        </div>
        <p className="f4 mt2">Product Description :</p>
        <li className="f3 mt2">{state.description.slice(3).slice(0, -4)}</li>
        <li className="mt2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti
          dolores, ipsa corporis ab hic asperiores quam officia !
        </li>
        <li className="mt2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti
          dolores, ipsa corporis ab hic asperiores quam officia !
        </li>
        <li className="mt2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti
          dolores, ipsa corporis ab hic asperiores quam officia !
        </li>

        {isAddToCartActive ? (
          <button
            className="product-detail-right-btn mt3 pv2 ph4"
            onClick={addToCartHandler}
          >
            Add To Cart
          </button>
        ) : (
          <button
            className="product-detail-right-btn product-detail-right-btn-remove bg-red mt3 pv2 ph4"
            onClick={removeFromCartHandler}
          >
            Remove From Cart
          </button>
        )}
      </div>
      <div>{messageisActive && messageEL()}</div>

      <Link to={"/"}>
        <button className="back-to-home">
          <span className="mr2">
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          Back to Main Page
        </button>
      </Link>
    </div>
  );
}
