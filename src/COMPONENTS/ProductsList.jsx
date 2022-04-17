import React from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProductsList = ({ products, addToWishList, removeFromWishList }) => {
  const menus = ["Home Furnishing", "Furniture", "Accessories"];

  const addToWishListHandler = (product) => {
    addToWishList(product);
  };
  const removeFromWishListHandler = (id) => {
    removeFromWishList(id);
  };

  return (
    <div className="mt3 product-list-view-container">
      {menus.map((menu, idx) => {
        return (
          <div key={idx}>
            <h2 className="mv3 code ">{`${menu}(${products.length})`}</h2>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container-with-dots "
              dotListClass="slide-button"
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 3,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  addToWishListHandler={addToWishListHandler}
                  removeFromWishListHandler={removeFromWishListHandler}
                />
              ))}
            </Carousel>
          </div>
        );
      })}
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.array,
};

export default ProductsList;
