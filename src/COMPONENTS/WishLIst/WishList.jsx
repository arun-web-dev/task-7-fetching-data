import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./Wishlist.scss";
import { Link } from "react-router-dom";

export default function WishList({ wishListItems, removeFromWishList }) {
  const wishlists = wishListItems.map((item) => {
    return (
      <div className="flex  justify-between shadow-1 mt1 pa3" key={item.id}>
        <div className="flex">
          <div className="pa2">
            <img
              src={item.image.url}
              alt={item.name}
              className="wishlist-image"
            />
          </div>

          <div>
            <Link
              to={`/${item.name}`}
              state={item}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="flex flex-column justify-between pa2 pointer ">
                <div>
                  <h3 className="f3">{item.name}</h3>
                  <p className="mt1 f5">Rating 4.3</p>
                </div>
                <div className="mt2">
                  <p className="f3">
                    Rs.{item.price.raw}{" "}
                    <span className="strike f4">Rs.{item.price.raw + 10}</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div
          className="pa3 pointer wishlist-trash-icon"
          onClick={() => {
            removeFromWishList(item.id);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} className="f3" />
        </div>
      </div>
    );
  });
  return (
    <div className="flex flex-column wishlist-container">
      <div className="pv2 shadow-1 ph3  pv2 mv2 f3 ">
        My Wishlist({wishlists.length})
      </div>

      {wishlists}

      <Link to={"/"}>
        <button className="back-to-home top">
          <span className="mr2">
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          Back to Main Page
        </button>
      </Link>
    </div>
  );
}
