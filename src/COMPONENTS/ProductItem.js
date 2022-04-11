import propTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <Link to={`/${product.name}`} state={product}>
      <div className="product__card  pro mr3">
        <div
          className="db center w-100 black link dim pointer"
          title={product.name}
        >
          <img
            className="db ba b--black-10 product-image"
            alt={product.name}
            src={product.image?.url}
          />

          <dl className="mt2 f6 lh-copy flex mv3 justify-between items-center">
            <dd className="ml0 f4 code fw9">{product.name}</dd>
            <dd className="ml0 f5 code gray mr3">
              {product.price.formatted_with_symbol}
            </dd>
          </dl>
        </div>
      </div>
    </Link>
  );
};

ProductItem.propTypes = {
  product: propTypes.object,
};

export default ProductItem;
