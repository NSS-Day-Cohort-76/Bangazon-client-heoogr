import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { StoreCard } from "../../components/store/card";
import { getStores } from "../../data/stores";

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getStores()
      .then((data) => {
        const safeData = Array.isArray(data) ? data : data ? [data] : [];
        setStores(safeData);
      })
      .catch((err) => {
        console.error("Failed to load stores:", err);
      });
  }, []);

  // useEffect(() => {
  //   getStores().then(data => {
  //     if (data) {
  //       setStores(data)
  //     }
  //   })
  // }, [])

  return (
  <div className="container is-max-desktop">
    <div className="section">
      <h1 className="title is-2 mb-5">Stores</h1>
      
      <div className="columns is-multiline is-variable is-4">
        {stores.map((store) => (
          <div key={store.id} className="column is-one-third-desktop is-half-tablet">
            <StoreCard store={store} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
Stores.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};