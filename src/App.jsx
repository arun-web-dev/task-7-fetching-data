import Commerce from "./lib/commerce";
import { useEffect, useState } from "react";
import ProductsList from "./COMPONENTS/ProductsList";
import Spinner from "./COMPONENTS/Spinner";
import "tachyons";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./COMPONENTS/ProductDetails/ProductDetail";
import Categories from "./COMPONENTS/Categories/Categories";
import { auth } from "./Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./COMPONENTS/Header/Header";
import PlaceOrder from "./COMPONENTS/PlaceOrder/PlaceOrder";
import SimiliarProduct from "./COMPONENTS/SimiliarProduct/SimiliarProduct";
import DeliveryDetails from "./COMPONENTS/DeliveryDetails/DeliveryDetails";
import WishList from "./COMPONENTS/WishLIst/WishList";
import Footer from "./COMPONENTS/Footer/Footer";

function App() {
  const WISH_LIST_STORAGE_KEY = "wishlistProducts";
  const CART_STORAGE_KEY = "cartProducts";
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [rangeFilter, setRangeFilter] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  const [userIsActive, setUserIsActive] = useState(false);
  const [pageIsloading, setPageIsloading] = useState(true);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    fetchProducts();
    const productsFromStorage = JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY)
    );
    const wishListFromStorage = JSON.parse(
      localStorage.getItem(WISH_LIST_STORAGE_KEY)
    );
    if (productsFromStorage) setCartItems(productsFromStorage);
    if (wishListFromStorage) setWishListItems(wishListFromStorage);
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user) {
      setUserIsActive(true);
    }
    if (!user) {
      setUserIsActive(false);
    }
  }, [loading, user]);

  const fetchProducts = () => {
    Commerce.products
      .list()
      .then((product) => {
        setProducts(product.data);
        setPageIsloading(false);
        localStorage.setItem("products", JSON.stringify(product.data));
      })
      .catch((error) => {
        console.log("There was and error fetching the products", error.message);
      });
  };

  const addToCart = (product) => {
    const checkIsAlreadyInCart = cartItems.filter((item) => {
      return item.id === product.id;
    });
    if (checkIsAlreadyInCart.length > 0) {
      checkIsAlreadyInCart[0].quantity++;
      return;
    }
    const addToCartFilter = products.filter((item) => {
      return item.id === product.id;
    });
    addToCartFilter[0].quantity = 1;

    const totalItems = [...cartItems, ...addToCartFilter];

    const sortProducts = totalItems.sort();
    setCartItems(sortProducts);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(sortProducts));
  };

  const addToWishList = (product) => {
    const checkIsAlreadyInWishList = wishListItems.filter((item) => {
      return item.id === product.id;
    });
    if (checkIsAlreadyInWishList.length > 0) {
      checkIsAlreadyInWishList[0].quantity++;
      return;
    }
    const addToWishListFilter = products.filter((item) => {
      return item.id === product.id;
    });
    addToWishListFilter[0].quantity = 1;

    const totalItems = [...wishListItems, ...addToWishListFilter];

    const sortProducts = totalItems.sort();
    setWishListItems(sortProducts);
    localStorage.setItem(WISH_LIST_STORAGE_KEY, JSON.stringify(sortProducts));
  };

  const updateCart = (id, quantity) => {
    const updateQuantity = cartItems.filter((item) => {
      return item.id === id;
    });
    const updatedPrdouct = cartItems.filter((item) => {
      return item.id !== id;
    });
    updateQuantity[0].quantity = quantity;

    setCartItems([...updateQuantity, ...updatedPrdouct]);
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([...updateQuantity, ...updatedPrdouct])
    );
  };

  const getCartItems = () => {
    Commerce.cart.contents().then((items) => console.log(items));
  };

  const removeFromCart = (id) => {
    const removeCartItem = cartItems.filter((item) => {
      return item.id !== id;
    });
    setCartItems(removeCartItem);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(removeCartItem));
  };

  const removeFromWishList = (id) => {
    const removeWishList = wishListItems.filter((item) => {
      return item.id !== id;
    });
    setWishListItems(removeWishList);
    localStorage.setItem(WISH_LIST_STORAGE_KEY, JSON.stringify(removeWishList));
  };

  const emptyCart = () => {
    Commerce.cart.empty().then((response) => console.log(response));
  };

  const ReteriveCardId = () => {
    Commerce.cart.id().then((cartId) => console.log(cartId));
  };

  const deleteCart = () => {
    Commerce.cart.delete().then((response) => console.log(response));
  };

  const categoryFilterHandler = (category) => {
    const filteredCategories = products.filter((product) => {
      return product.categories[0]?.name === category;
    });
    setSearchFilter([]);
    setCategoryFilter(filteredCategories);
  };

  const rangeFilterHandler = (value) => {
    const filteredCategories = products.filter((product) => {
      return product.price.raw <= value;
    });
    setSearchFilter([]);
    setCategoryFilter([]);
    setRangeFilter(filteredCategories);
  };

  const searchFilterHandler = (category) => {
    const getProducts = JSON.parse(localStorage.getItem("products"));
    const filteredCategories = getProducts.filter((product) => {
      return product.name.toLowerCase().includes(category.toLowerCase());
    });
    setSearchFilter(filteredCategories);
  };
  const productsSelector = () => {
    if (searchFilter.length > 0) {
      return searchFilter;
    }
    if (categoryFilter.length > 0) {
      return categoryFilter;
    }
    if (rangeFilter.length > 0) {
      return rangeFilter;
    }

    return products;
  };

  const HeaderHandler = () => {
    return (
      <Header
        searchFilterHandler={searchFilterHandler}
        user={user}
        userIsActive={userIsActive}
        cartItems={cartItems}
        wishListItems={wishListItems}
      />
    );
  };

  return (
    <div className="App ">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {HeaderHandler()}
              <Categories
                className="categories"
                products={products}
                categoryFilterHandler={categoryFilterHandler}
                rangeFilterHandler={rangeFilterHandler}
              />
              {pageIsloading ? (
                <Spinner />
              ) : (
                <ProductsList
                  products={productsSelector()}
                  addToWishList={addToWishList}
                  removeFromWishList={removeFromWishList}
                />
              )}
            </>
          }
        />
        <Route
          path="/:id"
          element={
            <>
              {HeaderHandler()}
              <div className="flex">
                <Categories
                  className="categories"
                  products={products}
                  categoryFilterHandler={categoryFilterHandler}
                />
                <ProductDetail
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              </div>
              <SimiliarProduct products={products} />
              <Footer />
            </>
          }
        />

        <Route
          path="/placeOrder"
          element={
            <>
              {HeaderHandler()}
              <PlaceOrder
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateCart={updateCart}
                addToWishList={addToWishList}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/delivery"
          element={
            <>
              {HeaderHandler()}
              <DeliveryDetails />
              <Footer />
            </>
          }
        />

        <Route
          path="/wishlist"
          element={
            <>
              {HeaderHandler()}
              <WishList
                wishListItems={wishListItems}
                removeFromWishList={removeFromWishList}
              />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
