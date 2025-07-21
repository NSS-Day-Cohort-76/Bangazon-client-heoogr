import { useEffect, useState } from "react";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { ProductCard } from "../../components/product/card";
import { getProducts } from "../../data/products";
// import './styles/product.css'

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading products...");
  const [locations, setLocations] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
    const seen = new Set();
    const unique = products.filter((product) => {
      const id = product.category?.id;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    return unique.map((product) => (
      <div key={product.category.id}>{product.category.name}</div>
    ));
  };

  const lastFivePerCat = Object.values(
    products.reduce((acc, product) => {
      const catId = product.category?.id;
      if (!catId) return acc;

      if (!acc[catId])
        acc[catId] = { category: product.category, products: [] };

      acc[catId].products.push(product);

      if (acc[catId].products.length > 5) acc[catId].products.pop();

      return acc;
    }, {})
  );

  if (isLoading) return <p>{loadingMessage}</p>;

  return (
    <>
      <div className="container">
        <div className="table-container">
          {selectedCategoryId ? (
            <h1 className="title is-2 table-title">
              Selected Category Products
            </h1>
          ) : (
            <h1 className="title is-2 table-title">Products</h1>
          )}

          {!selectedCategoryId
            ? lastFivePerCat.map(({ category, products }) => (
                <div key={category.id} className="category-table">
                  <div className="category-header">
                    <span className="category-count"></span>
                  </div>
                  <table className="table is-fullwidth is-hoverable">
                    <thead>
                      <tr>
                        <th>{category.name}</th>
                        <th>Created Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="product-row">
                          <td className="product-name">{product.name}</td>
                          <td className="product-date">
                            {product.created_date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            : ""}
        </div>
      </div>
      {console.log(selectedCategoryId)}
      <Filter
        productCount={products.length}
        onSearch={searchProducts}
        locations={locations}
        onCategorySelect={(id) => setSelectedCategoryId(id)}
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
