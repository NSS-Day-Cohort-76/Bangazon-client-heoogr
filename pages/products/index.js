import { useEffect, useState } from "react";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { ProductCard } from "../../components/product/card";
import { getProducts } from "../../data/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading products...");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data) {
          const locationData = [
            ...new Set(data.map((product) => product.location)),
          ];
          const locationObjects = locationData.map((location) => ({
            id: location,
            name: location,
          }));

          setProducts(data);
          setIsLoading(false);
          setLocations(locationObjects);
        }
      })
      .catch((err) => {
        setLoadingMessage(
          `Unable to retrieve products. Status code ${err.message} on response.`
        );
      });
  }, []);

  const searchProducts = (event) => {
    getProducts(event).then((productsData) => {
      if (productsData) {
        setProducts(productsData);
      }
    });
  };

  const displayCategories = () => {
    return products.map((product) => {
      <>
        <div>{product.category_id?.name}</div>
      </>;
    });
  };

  if (isLoading) return <p>{loadingMessage}</p>;

  return (
    <>
      <div>{() => displayCategories()}</div>
      <Filter
        productCount={products.length}
        onSearch={searchProducts}
        locations={locations}
      />

      <div className="columns is-multiline">
        <div>{products.category_id}</div>
        {products.map((product) => (
          <>
            <ProductCard product={product} key={product.id} />
          </>
        ))}
      </div>
    </>
  );
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
