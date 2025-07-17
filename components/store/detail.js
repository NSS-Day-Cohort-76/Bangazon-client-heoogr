import Link from "next/link";
import StoreProductList from "./productList.js";
import { useEffect, useState } from "react";
import { getStoreProducts } from "../../data/stores.js";

export default function Detail({ store, isOwner, favorite, unfavorite }) {
  const [selling, setSelling] = useState([]);
  const [sold, setSold] = useState([]);

useEffect(() => {
  if (!store?.id) return; // don't call API if store id is missing

  getStoreProducts(store.id).then(({ selling, sold }) => {
    setSelling(selling);
    setSold(sold);
  });
}, [store?.id]);

  const ownerButtons = () => {
    return (
      <div className="buttons">
        <Link
          href={`/stores/${store.id}/edit`}
          className="button is-primary is-inverted"
        >
          Edit Store
        </Link>
        <Link href="/products/new" className="button is-primary is-inverted">
          Add a Product
        </Link>
      </div>
    );
  };
  const userButtons = () => {
    return (
      <>
        {store.is_favorite ? (
          <button
            className="button is-primary is-inverted"
            onClick={unfavorite}
          >
            <span className="icon is-small">
              <i className="fas fa-heart-broken"></i>
            </span>
            <span>Unfavorite Store</span>
          </button>
        ) : (
          <button className="button is-primary is-inverted" onClick={favorite}>
            <span className="icon is-small">
              <i className="fas fa-heart"></i>
            </span>
            <span>Favorite Store</span>
          </button>
        )}
      </>
    );
  };

  return (
    <>
      <section className="hero is-primary mb-3">
        <div className="hero-head">
          <nav className="navbar">
            <div className="navbar-menu">
              <div className="navbar-end">
                <span className="navbar-item">
                  {isOwner ? ownerButtons() : userButtons()}
                </span>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <p className="title">{store.name}</p>
          <p className="subtitle">{store.description}</p>
        </div>
      </section>

      <section className="section">
        <StoreProductList selling={selling} sold={sold} />
      </section>
    </>
  );
}
