import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductItem = ({
  product,
  addToWishListHandler,
  removeFromWishListHandler,
}) => {
  const [message, setMessage] = useState("");
  const [messageisActive, setMessageisActive] = useState(false);
  const [productIsInWishList, setproductIsInWishList] = useState(true);
  const [isHeartActive, setIsHeartActive] = useState(false);
  const showMessageHandler = (msg) => {
    return (
      setMessage(msg),
      setMessageisActive(true),
      setTimeout(() => {
        setMessageisActive(false);
      }, 1000)
    );
  };
  const messageEL = () => {
    return <div className="place-order-message-wishlist code">{message}</div>;
  };
  return (
    <div className="product__card  pro mr3">
      <div className="db center w-100 black link " title={product.name}>
        <div className="product-item-image-container">
          <Link to={`/${product.name}`} state={product}>
            <div className="product-hover">
              <img
                className="db ba b--black-10 product-image pointer"
                alt={product.name}
                src={product.image?.url}
              />

              <div className="flex  quick-view justify-center items-center f3 ">
                Quick view
              </div>
            </div>
          </Link>

          <div
            className={`heart  ${isHeartActive ? "heart-active" : ""}  `}
            onClick={() => {
              if (productIsInWishList) {
                showMessageHandler("Product Added to WishList");
                addToWishListHandler(product);
                setproductIsInWishList(!productIsInWishList);
                setIsHeartActive(!isHeartActive);
              } else {
                showMessageHandler("Product Removed from WishList");
                removeFromWishListHandler(product.id);
                setproductIsInWishList(!productIsInWishList);
                setIsHeartActive(!isHeartActive);
              }
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>

        <dl className="mt2 f6 lh-copy flex mv3 justify-between items-center">
          <dd className="ml0 f4 code fw9">{product.name}</dd>
          <dd className="ml0 f5 code gray mr3">
            {`Rs.${product.price.formatted}`}
          </dd>
        </dl>
      </div>
      <div>{messageisActive && messageEL()}</div>
    </div>
  );
};

ProductItem.propTypes = {
  product: propTypes.object,
};

export default ProductItem;
