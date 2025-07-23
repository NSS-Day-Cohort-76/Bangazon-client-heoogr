function ProductGrid({
  title,
  products,
  emptyMessage,
  showQuantityLabel = "Quantity",
}) {
  return (
    <>
      <h2 className="title is-4 mt-6">{title}</h2>
      <div className="columns is-multiline">
        {products.length === 0 ? (
          <p>STORE SHOULD NOT BE DISPLAYED WITHOUT ITEMS</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="column is-one-quarter">
              <div className="box">
                <p className="title is-6">{product.name}</p>
                <p>
                  {showQuantityLabel}: {product.quantity}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default function StoreProductList({ selling, sold }) {
  return (
    <section className="section">
      <div className="container">
        <ProductGrid
          title="Selling"
          products={selling}
          emptyMessage="No products currently for sale."
          showQuantityLabel="Quantity"
        />
        <ProductGrid
          title="Sold"
          products={sold}
          emptyMessage="No sold products yet."
          showQuantityLabel="Sold Quantity"
        />
      </div>
    </section>
  );
}
