import Commerce from "./lib/commerce";
import { useEffect, useState } from "react";
import ProductsList from "./COMPONENTS/ProductsList";
import Spinner from "./COMPONENTS/Spinner";
import "tachyons";

function App() {
  const [products, setProducts] = useState([]);
  const [pageIsloading, setPageIsloading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    Commerce.products
      .list()
      .then((product) => {
        setProducts(product.data);
        setPageIsloading(false);
      })
      .catch((error) => {
        console.log("There was and error fetching the products", error.message);
      });
  };

  return (
    <div className="App ">
      <h2 className="logo w--100 tc f1 pv1 tracked  pointer dim center">
        Easy Shopping
      </h2>
      {pageIsloading ? <Spinner /> : <ProductsList products={products} />}
    </div>
  );
}

export default App;
