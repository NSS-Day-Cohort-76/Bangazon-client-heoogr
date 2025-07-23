import Link from "next/link";

export function StoreCard({ store, width = "is-half" }) {
  if (!store.total_quantity || store.total_quantity === 0) {
    return null; // don't render anything if no items
  }

  return (
    <div className={`column ${width}`}>
      <div className="card has-shadow">
        <header className="card-header has-background-light">
          <p className="card-header-title is-size-5 has-text-weight-semibold">
            {store.name}
          </p>
        </header>
        <div className="card-content px-5 py-4">
          <div className="content">
            <div className="field mb-4">
              <label className="label is-small has-text-grey">
                Store Owner
              </label>
              <p className="has-text-weight-medium">
                {store.seller.first_name} {store.seller.last_name}
              </p>
            </div>

            <div className="field mb-4">
              <label className="label is-small has-text-grey">
                Description
              </label>
              <p
                className="has-text-grey-dark is-size-6 has-text-justified"
                style={{ lineHeight: "1.6" }}
              >
                {store.description}
              </p>
            </div>

            <div className="field mb-4">
              <label className="label is-small has-text-grey">
                Products Available
              </label>
              <p className="has-text-weight-medium has-text-primary">
                {store.total_quantity} item
                {store.total_quantity !== 1 ? "s" : ""} for sale across{" "}
                {store.total_products} product
                {store.total_products !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <Link
            href={`stores/${store.id}`}
            className="card-footer-item has-text-primary has-text-weight-medium"
          >
            View Store →
          </Link>
        </footer>
      </div>
    </div>
  );
}
