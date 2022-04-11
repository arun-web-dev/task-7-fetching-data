import React from "react";
import "./ProductDetails.scss";
import spinner from "../../assests/spinner.png";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="product-detail shadow-1">
      <div className="product-detail-image">
        <img src={state.image.url} alt={state.name} />
      </div>
      <div className="product-detail-right pa3">
        <h2 className="f1 mv3">{state.name}</h2>
        <div className="flex mv2 items-center">
          <p className="f3">Special Price: </p>
          <p className="ml2 f2 b"> {state.price.formatted_with_symbol}</p>
        </div>
        <p className="underline f4 mt2">Product Description</p>
        <li className="f3 mt2">{state.description.slice(3).slice(0, -4)}</li>
        <button className="product-detail-right-btn mt3 pv2 ph4">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
