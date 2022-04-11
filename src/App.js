import Commerce from "./lib/commerce";
import { useEffect, useState } from "react";
import ProductsList from "./COMPONENTS/ProductsList";
import Spinner from "./COMPONENTS/Spinner";
import "tachyons";
import { Link, Route, Routes } from "react-router-dom";
import ProductDetail from "./COMPONENTS/ProductDetails/ProductDetail";
import SearchBar from "./COMPONENTS/SearchBar/SearchBar";
import Cart from "./COMPONENTS/Cart/Cart";
import Categories from "./COMPONENTS/Categories/Categories";
import Modal from "./COMPONENTS/LoginModal/Modal";
import { signInWithGoogle, auth } from "./Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [modalIsActive, setModalIsActive] = useState(true);
  const [userIsActive, setUserIsActive] = useState(false);
  const [pageIsloading, setPageIsloading] = useState(true);
  const [loading, user, error] = useAuthState(auth);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (user) {
      setUserIsActive(true);
      console.log(user);
    }
  }, [user, loading]);
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

  const categoryFilterHandler = (category) => {
    const filteredCategories = products.filter((product) => {
      return product.categories[0]?.name === category;
    });
    setSearchFilter([]);
    setCategoryFilter(filteredCategories);
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
    return products;
  };

  return (
    <div className="App ">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex header items-center">
                <Link to="/" className="logo-container ">
                  <h2 className="logo  tc f2 pv1 tracked  pointer dim center">
                    Easy Shopping
                  </h2>
                </Link>
                <div className="searchbar">
                  <SearchBar searchFilterHandler={searchFilterHandler} />
                </div>
                <div className="shopping-cart ml3 pointer">
                  <Cart />
                </div>
                {
                  userIsActive && (
                    <div>
                      Logged in as username <button>Sign out</button>
                    </div>
                  ) /* {  <div className="dib">
                  <button>Sign in with your google account</button>
                </div> } */
                }
                {/* <Modal modalIsActive={modalIsActive} /> */}
              </div>
              <Categories
                className="categories"
                products={products}
                categoryFilterHandler={categoryFilterHandler}
              />
              {pageIsloading ? (
                <Spinner />
              ) : (
                <ProductsList products={productsSelector()} />
              )}
            </>
          }
        />
        <Route
          path="/:id"
          element={
            <>
              <div className="flex header items-center">
                <Link to="/" className="logo-container ">
                  <h2 className="logo  tc f2 pv1 tracked  pointer dim center">
                    Easy Shopping
                  </h2>
                </Link>
                <div className="searchbar">
                  <SearchBar searchFilterHandler={searchFilterHandler} />
                </div>
                <div className="shopping-cart ml3 pointer">
                  <Cart />
                </div>
              </div>
              <ProductDetail />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
